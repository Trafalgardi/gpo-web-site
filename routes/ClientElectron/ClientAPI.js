var connection = require('../../database');
const dateTime = require('node-datetime');
const jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
const TOKEN_SECRET_KEY = 'SuperSecRetKey'
const TITLE = '/client/';
const AUTHORIZATION_LINK = TITLE + 'authorization';

function template(token, body, res){
    let response = {};

    res.json(response);
}

function CreateToken(login, rules){
    let payload = {
        login: login,
        rules: rules,
    }
    let token = jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
    //console.log("Token: " + token)
    return token;
}

function VerifyToknen(token){
    jwt.verify(token, TOKEN_SECRET_KEY, (err, data) => {
        if (err) {
            console.log("token invalid");
            return "";
        } else {
            return data;
        }
    })
}

function Authorization(token, body, res){
    let response = {
        success: false,
    };
    let data = {
        login: body.login,
        password: body.password,
    }

    //check database 
    let isValidUser = false;
    
    const sql = "SELECT `rules`, `password` FROM `client_users` WHERE `login`='" + data.login + "' LIMIT 1";
    connection.query(sql, (error, results, fields) => {
        if (error || results == ""){
            isValidUser = false;
        }
        else{
            //check password
            let passwordHash = results[0].password;
            console.log(data.password + ":" + passwordHash);
            isValidUser = bcrypt.compareSync(data.password, passwordHash);
        }
        if (isValidUser){
            //create token
            let rule = results[0].rules;
            response.rule = rule;
            response.token = CreateToken(data.login, rule);
            response.success = true;
        }
        else{
            response.success = false;
            response.error = "Не верный логин или пароль!"; //TODO: Replace by error code
        }

        res.json(response);
    })

    
}

function ParseRequest(req, res, callback){
    callback(req.headers.access_token, req.body, res);
}
module.exports = {
    Init: (app) => {
        app.post(AUTHORIZATION_LINK, (req, res) => ParseRequest(req, res, Authorization));
    }
}