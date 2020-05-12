var connection = require('../../database');
const dateTime = require('node-datetime');
const jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
const TOKEN_SECRET_KEY = 'SuperSecRetKey'
const TITLE = '/client/';
const AUTHORIZATION_LINK = TITLE + 'authorization';
const GET_USERS_LINK = TITLE + "getUsers";

function template(token, body, res){
    let response = {};

    res.json(response);
}

function CheckRule(token, targetRule){
    let payload = VerifyToknen(token);
    if (payload == false || payload == "")
    {
        return false;
    }
    function getRulePower(rule){
        let r = 3;
        if (rule == "user"){
            r = 1;
        }
        else if (rule == "admin"){
            r = 2;
        }
        else if (rule == "root"){
            r = 3;
        }
        else if (rule == "any"){
            r = 0;
        }
        return r;
    }
    return getRulePower(payload.rules) >= getRulePower(targetRule);
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
    let error, payload = jwt.verify(token, TOKEN_SECRET_KEY);
    if (error){
        console.log(error);
        return false;
    }
    return payload;
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

function GetUser(token, body, res){
    let response = {
        success: false,
    }
    if (CheckRule(token, "user") == false){
        console.log("Не достаточно прав!")
        response.error = "Не достаточно прав!"
        res.json(response);
        return;
    }
    response.anketa = [];
    let sql = "SELECT id, email, date, anketaData, anketaResult FROM users WHERE 1";
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        response.anketa = result;
        response.success = true;
        res.json(response)
    });
}


function ParseRequest(req, res, callback){
    callback(req.headers.access_token, req.body, res);
}
module.exports = {
    Init: (app) => {
        app.post(AUTHORIZATION_LINK, (req, res) => ParseRequest(req, res, Authorization));
        app.get(GET_USERS_LINK, (req, res) => ParseRequest(req, res, GetUser));
    }
}