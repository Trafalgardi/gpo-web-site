var connection = require('../database')
const {TestExecution} = require('./TestProcessing/TestProcessing.js')
const dateTime = require('node-datetime');
const jwt = require('jsonwebtoken');
module.exports = {
    setTest: (req, res) => {
        //var idTest = require('../tests/question_'+req.params.id+'.json');
        //let sql = 'SELECT JSON_MERGE(JSON_OBJECT("testName", name), questions) as data FROM tests WHERE id='+req.params.id;
        let sql = 'SELECT `questions` as data FROM `tests` WHERE id=' + req.params.id;

        connection.query(sql, function(err, result, fields) {
            if (err) throw err;
            //console.log(result[0].data)
            if (result[0] === undefined || result[0].data === undefined) {
                return res.status(500).send('<h1>Something failed!</h1>');
            }

            let js = JSON.stringify(result[0].data);
            res.render('test', { json: js, id: req.params.id });
            //res.send("Данные записанны!\n" + JSON.stringify(data));
        });

    },
    addDataTest: (req, res) => {

        let body = req.body; // Our body from post request
        console.log("Body \n")
        console.log(req.body)
        let temp = Object.values(body);
        let answers = {}
        if (req.body.id != 25 && req.body.id != 26 && req.body.id != 33) {
            answers = {
                data: []
            };
            for (let index = 0; index < temp.length - 1; index++) {

                answers.data[index] = temp[index];

            }
        } else if (req.body.id == 25) {
            answers = {
                data: JSON.parse(req.body.ans)
            }
        } else if (req.body.id == 24) {
            answers = {
                data: req.body
            }
        } else if (req.body.id == 33) {
            answers = {
                data: []
            };

            for (let index = 0; index < 4; index++) {
                tempArr = []
                for (let i = 0; i < 10; i++) {
                    let temp2 = req.body['checkbox_' + index + '_' + i]
                    tempArr.push(temp2)

                }
                answers.data.push(tempArr)

            }

        }
        //console.log("answers \n")
        //console.log(answers)

        let dt = dateTime.create();
        let formatted = dt.format('Y-m-d H:M:S');
        //if(answers.data.length != body.size){
        //    console.log("Ошибка заполнения")
        //    res.redirect('./'+body.id);

        const token = req.cookies.token;
        jwt.verify(token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {

                let sql = "SELECT `banTests` FROM `users` WHERE id = " + authData.user.id
                connection.query(sql, function(err, results, fields) {

                    let bantTests = JSON.parse(results[0].banTests);
                    console.log(JSON.stringify(bantTests))
                    bantTests.ban.push(body.id);
                    //console.log(JSON.stringify(bantTests))
                    let sqlUPDATE = "UPDATE `users` SET `banTests`= '" + JSON.stringify(bantTests) + "' WHERE `users`.`id` =" + authData.user.id;
                    connection.query(sqlUPDATE, function(err, results, fields) {
                        //console.log(sqlUPDATE)
                        if (err) throw err;
                    });
                });
                console.log("Данные ушли")
                //console.log(answers);
                let testResult = TestExecution(body.id, answers.data);
                connection.query("INSERT INTO user_tests VALUES (?,?,?,?,?,?);", [0, authData.user.id, body.id, JSON.stringify(answers), testResult, formatted], function(error, results, fields) {
                    if (error) throw error;
                    res.render('post');
                    //res.send("Данные записанны!\n" + JSON.stringify(data));UPDATE UserTests SET result= 0 WHERE id=1
                });
            }
        });



    },
    setAnketaCoef: (req, res) => {
        //let data = {
        //    id: 0,
        //    anketaResult: 0
        //}
        console.log(req.body)
        if (req.body.data === undefined || req.body.data.lenght <= 0) return;
        let temp = req.body.data;
        console.log(temp)
        let sql = 'UPDATE `users` SET `anketaResult`= CASE ';
        for (let index = 0; index < temp.length; index++) {
            sql += " WHEN `id`=" + temp[index].id + " THEN " + temp[index].anketaResult;
        }
        sql += ' ELSE `anketaResult` END WHERE 1';
        console.log(sql)
        connection.query(sql, function(err, result, fields) {
            if (err) throw err;
            console.log(result)
        });
    },
    //SELECT `tests`.`name`, `tests`.`questions` FROM `tests` WHERE `tests`.`id` = 1
    //SELECT `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `user_tests`.`answers` FROM `user_tests` WHERE `user_tests`.`result` != -1
    //SELECT `tests`.`name`, `tests`.`questions`, `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `user_tests`.`answers` FROM `tests` JOIN `user_tests` ON `user_tests`.`test_id` = `tests`.`id`
    //SELECT `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `tests`.`name`, `tests`.`questions`, `user_tests`.`answers` FROM `tests` JOIN `user_tests` ON `user_tests`.`test_id` = `tests`.`id` AND `user_tests`.`result` = -1
    
}