import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import connection from '../database.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import ClientAPI from '../routes/ClientElectron/ClientAPI';
let app = express();

import { getHomePage, addData, getData, getLastData, signin, reg, getOpenTest, getResults } from '../routes/index';
import { setTest, addDataTest, setAnketaCoef } from '../routes/test';

//import ClientApi from "./"

const port = 3000;



// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', path.join(__dirname, '../views')); // set express to look in this folder to render our view
app.set('view engine', 'pug');
app.use(bodyParser.json()); // parse form data client
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public'))); // configure express to use public folder
app.use(express.static(path.join(__dirname, '../fontawesome')));

app.get('/', verifyTokenCookie, getHomePage);

app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js'))); // redirect bootstrap JS
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist'))); // redirect JS jQuery
app.use('/js', express.static(path.join(__dirname, '../node_modules/popper.js/dist/umd'))); // redirect popper js 
app.use('/js', express.static(path.join(__dirname, '../node_modules/holderjs'))); // redirect Holder js
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css'))); // redirect CSS bootstrap 

//start ClientAPI
ClientAPI.Init(app);
//end ClientAPI

/** Create posts protected route */
app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req['token'], 'SuperSecRetKey', (err, authData) => {
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
    const passworFromForm = req.body.password;
    let user = {
        id: 0,
        email: ""
    }

    //SELECT * FROM users WHERE email = 'theremandram@gmail.com' LIMIT 1
    const sql = "SELECT * FROM users WHERE email = '" + req.body.email + "' LIMIT 1";
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        console.log(results[0].id)
        if (error) {
            return console.log(error);
        }
        const passworFromBD = results[0].password;//если чо то result[0]....
        console.log(passworFromForm + '\n' + passworFromBD)
        if (passworFromForm !== undefined && passworFromForm !== null && passworFromBD !== undefined && passworFromBD !== null) {
            if (bcrypt.compareSync(passworFromForm, passworFromBD)) {
                console.log("Passwords match")
                user.id = results[0].id
                user.email = results[0].email
                jwt.sign({ user }, 'SuperSecRetKey', { expiresIn: 60 * 60 * 24 }, (err, token) => {
                    res.cookie('token', token.toString());
                    res.redirect('/homepage');
                })
            } else {
                console.log("Passwords don't match")
            }
        }
    })
})

/** verifyToken method - this method verifies token */
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

app.route('/homepage')
    .get(verifyTokenCookie, (req, res) => {
        jwt.verify(req['token'], 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.redirect('signin');
            } else {
                res.render('homepage', { email: authData.user.email });
            }
        })
    })

app.route('/reg')
    .get(function (req, res) {
        res.render('reg');
    })
    .post(reg)

app.route('/signin')
    .get((req, res) => {
        res.render('signin')
    })
    .post(signin)

app.get('/403', function (req, res) {
    res.render('403');
})

app.route('/opentests')
    .get(verifyTokenCookie, function (req, res) {
        const token = req.cookies.token;
        jwt.verify(token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.send(err);
            } else {
                res.render('opentests', { email: authData.user.email });
            }
        })
    })

app.route('/questionnaire')
    .get(verifyTokenCookie, function (req, res) {
        const token = req.cookies.token;
        jwt.verify(token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.send(err);
            } else {
                res.render('questionnaire', { email: authData.user.email });
            }
        })
    })
app.get('/sign-out', function (req, res) {
    res.clearCookie("token");
    res.redirect('homepage');
})
app.get('/api/getOpenTests', getOpenTest);
app.post('/addData', addData);

app.get('/getData', getData);
app.get('/getLastData', getLastData);
app.get('/phpmyadmin', function (req, res) {
    res.redirect('http://188.93.211.152:8000/phpmyadmin/');
})

app.get('/test/:id', verifyTokenCookie, setTest);

app.post('/test/addDataTest', addDataTest);
app.post('/setAnketaCoef', setAnketaCoef); //Обновление столбца tests в таблице users(Коэф. анкеты)

app.route('/results')
    .get(verifyTokenCookie, function (req, res) {
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

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

module.exports = app;