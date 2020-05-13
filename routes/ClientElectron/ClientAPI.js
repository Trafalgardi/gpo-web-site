var connection = require('../../database');
const dateTime = require('node-datetime');
const jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
const TOKEN_SECRET_KEY = 'SuperSecRetKey'
const TITLE = '/client/';
const AUTHORIZATION_LINK = TITLE + 'authorization';
const GET_USERS_LINK = TITLE + "getUsers";
const GET_USERS_TESTS_LINK = TITLE + "getUserTests";


function template(token, body, res){
    let response = {};

    res.json(response);
}

function ParseRequest(req, res, callback, rule = null){
    let token = req.headers.access_token;
    if (rule != null && CheckRule(token, rule) == false){
        let response = {
            success: false,
            error: "Не достаточно прав!",
        }
        console.log(response);
        res.json(response);
        return;
    }
    callback(token, req.body, res);
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

function GetUsers(token, body, res){
    let response = {
        success: false,
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




function GetUserTests(token, body, res) {
    let response = {
        success: false,
    }
    
    let data = {
        id: '',
        user_id: 0,
        test_id: 0,
        questions: [],
        answers: [],
        result: 0,
        date: ''
    }

    let sql = 'SELECT `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `user_tests`.`answers`, `user_tests`.`result`, `user_tests`.`date`' +
        'FROM `tests` JOIN `user_tests` ON `user_tests`.`test_id` = `tests`.`id` AND `user_tests`.`result` != -1 AND `user_tests`.`user_id` = ' + body.id;

    //let sql = 'SELECT `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `tests`.`questions`, `user_tests`.`answers`, `user_tests`.`result`, `user_tests`.`date`'
    //    + 'FROM `tests` JOIN `user_tests` ON `user_tests`.`test_id` = `tests`.`id` AND `user_tests`.`result` != -1 AND `user_tests`.`user_id` = '+req.body.id;
    connection.query(sql, function(error, results, fields) {

        if (error) {
            console.log("check1")
            let json = {
                status: false,
                message: 'there are some error with query'
            }
            return res.render('error', { json });
        } else {
            response.success = true;
            response.data = results;
            for (let i = 0; i < response.length; i++) {
                response[i].question = "Тест №" + response[i].test_id;
            }
            //console.log(response)
            res.json(response);
        }
    })

}

function post(app, link, func){
    app.post(link, func);
}

function get(app, link, func){
    app.get(link, func);
}
module.exports = {
    Init: (app) => {
        post(app, AUTHORIZATION_LINK, (req, res) => ParseRequest(req, res, Authorization, "any"));
        get(app, GET_USERS_LINK, (req, res) => ParseRequest(req, res, GetUsers, "user"));
        post(app, GET_USERS_TESTS_LINK, (req, res) => ParseRequest(req, res, GetUserTests, "user"));
    }
}