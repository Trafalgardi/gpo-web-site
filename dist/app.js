"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_js_1 = __importDefault(require("../database.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ClientAPI_1 = __importDefault(require("../routes/ClientElectron/ClientAPI"));
let app = express_1.default();
const index_1 = require("../routes/index");
const test_1 = require("../routes/test");
//import ClientApi from "./"
const port = 3000;
// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', path_1.default.join(__dirname, '../views')); // set express to look in this folder to render our view
app.set('view engine', 'pug');
app.use(body_parser_1.default.json()); // parse form data client
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(cookie_parser_1.default());
app.use(serve_favicon_1.default(path_1.default.join(__dirname, '../public', 'favicon.ico')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public'))); // configure express to use public folder
app.use(express_1.default.static(path_1.default.join(__dirname, '../fontawesome')));
app.get('/', verifyTokenCookie, index_1.getHomePage);
app.use('/js', express_1.default.static(path_1.default.join(__dirname, '../node_modules/bootstrap/dist/js'))); // redirect bootstrap JS
app.use('/js', express_1.default.static(path_1.default.join(__dirname, '../node_modules/jquery/dist'))); // redirect JS jQuery
app.use('/js', express_1.default.static(path_1.default.join(__dirname, '../node_modules/popper.js/dist/umd'))); // redirect popper js 
app.use('/js', express_1.default.static(path_1.default.join(__dirname, '../node_modules/holderjs'))); // redirect Holder js
app.use('/css', express_1.default.static(path_1.default.join(__dirname, '../node_modules/bootstrap/dist/css'))); // redirect CSS bootstrap 
//start ClientAPI
ClientAPI_1.default.Init(app);
//end ClientAPI
/** Create posts protected route */
app.post('/api/posts', verifyToken, (req, res) => {
    jsonwebtoken_1.default.verify(req['token'], 'SuperSecRetKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                msg: "A new post is created",
                authData
            });
        }
    });
});
//User signin route - create a token and return to user
app.post('/api/signin', (req, res) => {
    const passworFromForm = req.body.password;
    let user = {
        id: 0,
        email: ""
    };
    //SELECT * FROM users WHERE email = 'theremandram@gmail.com' LIMIT 1
    const sql = "SELECT * FROM users WHERE email = '" + req.body.email + "' LIMIT 1";
    console.log(sql);
    database_js_1.default.query(sql, function (error, results, fields) {
        console.log(results[0].id);
        if (error) {
            return console.log(error);
        }
        const passworFromBD = results[0].password; //если чо то result[0]....
        console.log(passworFromForm + '\n' + passworFromBD);
        if (passworFromForm !== undefined && passworFromForm !== null && passworFromBD !== undefined && passworFromBD !== null) {
            if (bcrypt_1.default.compareSync(passworFromForm, passworFromBD)) {
                console.log("Passwords match");
                user.id = results[0].id;
                user.email = results[0].email;
                jsonwebtoken_1.default.sign({ user }, 'SuperSecRetKey', { expiresIn: 60 * 60 * 24 }, (err, token) => {
                    res.cookie('token', token.toString());
                    res.redirect('/homepage');
                });
            }
            else {
                console.log("Passwords don't match");
            }
        }
    });
});
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
    }
    else {
        res.sendStatus(403);
    }
}
function verifyTokenCookie(req, res, next) {
    const cookie = req.cookies;
    if (cookie.token != '' && cookie.token != undefined) {
        req.token = cookie.token;
        console.log('печеньки существуют');
        //call next middleware
        next();
    }
    else {
        console.log('печеньки не существуют');
        res.redirect('signin');
    }
}
app.route('/homepage')
    .get(verifyTokenCookie, (req, res) => {
    jsonwebtoken_1.default.verify(req['token'], 'SuperSecRetKey', (err, authData) => {
        if (err) {
            res.redirect('signin');
        }
        else {
            res.render('homepage', { email: authData.user.email });
        }
    });
});
app.route('/reg')
    .get(function (req, res) {
    res.render('reg');
})
    .post(index_1.reg);
app.route('/signin')
    .get((req, res) => {
    res.render('signin');
})
    .post(index_1.signin);
app.get('/403', function (req, res) {
    res.render('403');
});
app.route('/opentests')
    .get(verifyTokenCookie, function (req, res) {
    const token = req.cookies.token;
    jsonwebtoken_1.default.verify(token, 'SuperSecRetKey', (err, authData) => {
        if (err) {
            res.send(err);
        }
        else {
            res.render('opentests', { email: authData.user.email });
        }
    });
});
app.route('/questionnaire')
    .get(verifyTokenCookie, function (req, res) {
    const token = req.cookies.token;
    jsonwebtoken_1.default.verify(token, 'SuperSecRetKey', (err, authData) => {
        if (err) {
            res.send(err);
        }
        else {
            res.render('questionnaire', { email: authData.user.email });
        }
    });
});
app.get('/sign-out', function (req, res) {
    res.clearCookie("token");
    res.redirect('homepage');
});
app.get('/api/getOpenTests', index_1.getOpenTest);
app.post('/addData', index_1.addData);
app.get('/getData', index_1.getData);
app.get('/getLastData', index_1.getLastData);
app.get('/phpmyadmin', function (req, res) {
    res.redirect('http://188.93.211.152:8000/phpmyadmin/');
});
app.get('/test/:id', verifyTokenCookie, test_1.setTest);
app.post('/test/addDataTest', test_1.addDataTest);
app.post('/setAnketaCoef', test_1.setAnketaCoef); //Обновление столбца tests в таблице users(Коэф. анкеты)
app.route('/results')
    .get(verifyTokenCookie, function (req, res) {
    const token = req.cookies.token;
    jsonwebtoken_1.default.verify(token, 'SuperSecRetKey', (err, authData) => {
        if (err) {
            res.send(err);
        }
        else {
            res.render('users_results_form', { email: authData.user.email });
        }
    });
});
app.post('/getResultsPDF', index_1.getResults);
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
module.exports = app;
//# sourceMappingURL=app.js.map