const express = require('express');
const path = require('path');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const connection = require('./database');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
let app = express();

const { getHomePage, addData, getData, getLastData, signin, reg, createToken, getOpenTest, getOpenCases, getUsers, getResults } = require('./routes/index');
const { setTest, addDataTest, getDataTest, setAnketaCoef, updateTests } = require('./routes/test');
const { setCase, addDataCase, getDataCase, updateCases } = require('./routes/case');

const port = 3000;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'pug');
app.use(bodyParser.json()); // parse form data client
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(express.static(path.join(__dirname, 'fontawesome')));

app.get('/', verifyTokenCookie, getHomePage);

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd')); // redirect popper js 
app.use('/js', express.static(__dirname + '/node_modules/holderjs')); // redirect Holder js
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap 

/* ROUTES */

app.route('/homepage')
    .get(verifyTokenCookie, (req, res) => {
        jwt.verify(req.token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.redirect('signin');
            } else {
                res.render('homepage', { email: authData.user.email });
            }
        })
    })
app.route('/reg')
    .get(function(req, res) {
        res.render('reg');
    })
    .post(reg)
app.route('/signin')
    .get((req, res) => {
        res.render('signin')
    })
    .post(signin)
app.get('/sign-out', function(req, res) {
    res.clearCookie("token");
    res.redirect('homepage');
})
app.get('/403', function(req, res) {
    res.render('403');
})
app.route('/opentests')
    .get(verifyTokenCookie, function(req, res) {
        const token = req.cookies.token;
        jwt.verify(token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.send(err);
            } else {
                res.render('opentests', { email: authData.user.email });
            }
        })
    })
app.route('/opencases')
    .get(verifyTokenCookie, function(req, res) {
        const token = req.cookies.token;
        jwt.verify(token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.send(err);
            } else {
                res.render('opencase', { email: authData.user.email });
            }
        })
    })
app.route('/questionnaire')
    .get(verifyTokenCookie, function(req, res) {
        const token = req.cookies.token;
        jwt.verify(token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.send(err);
            } else {
                res.render('questionnaire', { email: authData.user.email });
            }
        })
    })

app.get('/case/:id', verifyTokenCookie, setCase);
app.post('/case/addDataCase', addDataCase);
app.post('/case/updateCases', updateCases); //Проверка тестов в таблице user_tests(Коэф. пройденый тестов)

app.get('/test/:id', verifyTokenCookie, setTest);
app.post('/test/addDataTest', addDataTest);
app.post('/test/updateTests', updateTests); //Проверка тестов в таблице user_tests(Коэф. пройденый тестов)

app.post('/setAnketaCoef', setAnketaCoef); //Обновление столбца tests в таблице users(Коэф. анкеты)

app.route('/results')
    .get(verifyTokenCookie, function(req, res) {
        const token = req.cookies.token;
        jwt.verify(token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.send(err);
            } else {
                res.render('users_results_form', { email: authData.user.email });
            }
        })
    })
app.post('/getResultsPDF', getResults);

app.get('/phpmyadmin', function(req, res) {
    res.redirect('http://188.93.211.152:8000/phpmyadmin/');
})

/* API ROUTES */

//Create posts protected route
app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'SuperSecRetKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                msg: "A new post is created",
                authData
            })
        }
    })
})

//User signin route - create a token and return to user
app.post('/api/signin', (req, res) => {
    createToken(req.body.email, req.body.password, (success, token, user) => {
        if (success) {
            res.json({
                token: token,
                admin: user.admin
            })
        } else {
            res.sendStatus(403);
        }
    });
})

app.post('/api/getUserInfo', verifyToken, (req, res) => {
    jwt.verify(req.token, 'SuperSecRetKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const sql = "SELECT * FROM users WHERE email = '" + authData.user.email + "' LIMIT 1";
            connection.query(sql, function(error, results, fields) {
                if (error || results == "") {
                    res.sendStatus(403);
                } else {
                    res.json({
                        id: results[0].id,
                        admin: results[0].admin
                    });
                }
            });
        }
    })
});

app.post('/api/getDataCase', verifyToken, checkToken, getDataCase); //Получение тестов пользователя
app.post('/api/getDataTest', verifyToken, checkToken, getDataTest); //Получение кейсов пользователя
app.get('/api/getUsers', verifyToken, checkTokenOnlyAdmin, getUsers); //Получение списка пользователей и их анкет
app.get('/api/getData', verifyToken, checkTokenOnlyAdmin, getData); //Получение списка текстов, кейсов и анкет, которые еще не были проверены

app.get('/api/getOpenTests', getOpenTest); //Получение тестов, которые пользователь еще не проходил
app.get('/api/getOpenCases', getOpenCases); //Получение кейсов, которые пользователь еще не проходил

app.post('/addData', addData);
app.get('/getLastData', getLastData);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

module.exports = app;

//Проверяет принадлежит ли токен админу или пользователю чьи данные запрашивают и если нет выдает ошибку
function checkToken(req, res, next) {
    jwt.verify(req.token, 'SuperSecRetKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const sql = "SELECT * FROM users WHERE email = '" + authData.user.email + "' LIMIT 1";
            connection.query(sql, function(error, results, fields) {
                if (error || results == "" || (results[0].admin == 0 && results[0].id != req.body.id)) {
                    res.sendStatus(403);
                } else
                    next();
            });
        }
    })
}

//Проверяет принадлежит ли токен админу и если нет выдает ошибку
function checkTokenOnlyAdmin(req, res, next) {
    jwt.verify(req.token, 'SuperSecRetKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const sql = "SELECT * FROM users WHERE email = '" + authData.user.email + "' LIMIT 1";
            connection.query(sql, function(error, results, fields) {
                if (error || results == "" || results[0].admin == 0) {
                    res.sendStatus(403);
                } else
                    next();
            });
        }
    })
}

//verifyToken method - this method verifies token
function verifyToken(req, res, next) {
    //Request header with authorization key
    const bearerHeader = req.headers['authorization'];
    //Check if there is  a header
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        //Get Token arrray by spliting
        const bearerToken = bearer[1];
        req.token = bearerToken;
        //call next middleware
        next();
    } else {
        res.sendStatus(403);
    }
}

function verifyTokenCookie(req, res, next) {
    const cookie = req.cookies;
    if (cookie.token != '' && cookie.token != undefined) {
        req.token = cookie.token;
        console.log('печеньки существуют')
            //call next middleware
        next();
    } else {
        console.log('печеньки не существуют')
        res.redirect('signin');
    }
}