var pool = require('../database')
module.exports = {
    setTest: (req, res) => {
        //var idTest = require('../tests/question_'+req.params.id+'.json');
        let sql = 'SELECT JSON_MERGE(JSON_OBJECT("testName", name), questions) as data FROM tests WHERE id='+req.params.id;
        
        pool.query(sql, function (err, result, fields) {
            if (err) throw err;
            let js = JSON.stringify(result[0].data);
            res.render('test', {json: js, id: req.params.id});
            //res.send("Данные записанны!\n" + JSON.stringify(data));
        });
        
    },
    addDataTest: (req, res) => {

        let body = req.body; // Our body from post request
        let temp = Object.values(body);
        let answers = {
            data: []
        };
        for (let index = 0; index < temp.length-2; index++) {

            answers.data[index] = temp[index];

        }
        
        if(answers.data.length != body.size){
            console.log("Ошибка заполнения")
            res.redirect('./'+body.id);
        
        }else {
            console.log("Данные ушли")
            pool.query("INSERT INTO user_tests VALUES (?,?,?,?,?);", [0,0,body.id,JSON.stringify(answers),-1], function(error, results, fields){
                if (error) throw error;
                res.render('post');
                //res.send("Данные записанны!\n" + JSON.stringify(data));UPDATE UserTests SET result= 0 WHERE id=1
            });
        }
        
    }, 
    updateTests:(req, res) => {
        //let data = {
        //    id: 0,
        //    result: 0
        //}
        if (req.body.data === undefined || req.body.data.lenght <= 0) return;
        console.log(req.body)
        let temp = req.body.data;
        //UPDATE `user_tests` SET `result`=1 WHERE `id` = 1
        //let sql = 'UPDATE user_tests SET result='+temp.result+' WHERE id='+temp.id;
        let sql = 'UPDATE `user_tests` SET `result`= CASE ';
        for (let index = 0; index < temp.length; index++) {
            sql+= " WHEN `id`="+temp[index].id+" THEN "+temp[index].result;
        }
        sql+= ' ELSE `result` END WHERE 1';
        console.log(sql)
        //sql = UPDATE `user_tests` SET `result`= CASE WHEN `id`=2 THEN '0.1' WHEN `id`=3 THEN '0.2' WHEN `id`=4 THEN '0.3' ELSE `result` END WHERE 1
        
        pool.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result)
        });
    },
    setAnketaCoef:(req, res) => {
        //let data = {
        //    id: 0,
        //    anketa: 0
        //}
        console.log(req.body)
        if (req.body.data === undefined || req.body.data.lenght <= 0) return;
        let temp = req.body.data;
        console.log(temp)
        let sql = 'UPDATE `tbl_users` SET `anketa`= CASE ';
        for (let index = 0; index < temp.length; index++) {
            sql+= " WHEN `id`="+temp[index].id+" THEN "+temp[index].anketa;
        }
        sql+= ' ELSE `anketa` END WHERE 1';
        console.log(sql)   
        pool.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result)
        });
    },
    setTestCoef:(req, res) => {
        //let data = {
        //    id: 0,
        //    tests: 0
        //}
        console.log(req.body)
        if (req.body.data === undefined || req.body.data.lenght <= 0) return;
        let temp = req.body.data;
        console.log(temp)
        let sql = 'UPDATE `tbl_users` SET `tests`= CASE ';
        for (let index = 0; index < temp.length; index++) {
            sql+= " WHEN `id`="+temp[index].id+" THEN "+temp[index].tests;
        }
        sql+= ' ELSE `tests` END WHERE 1';
        console.log(sql)  
        let message = 'Сообщение об ошибки'; 
        pool.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result)
            message = 'Данные успешно загруженны';
        });
        //res.json({ message: message });
    },
    getTestAnswers:(req, res) => {
        
    },
    //SELECT `tests`.`name`, `tests`.`questions` FROM `tests` WHERE `tests`.`id` = 1
    //SELECT `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `user_tests`.`answers` FROM `user_tests` WHERE `user_tests`.`result` != -1
    //SELECT `tests`.`name`, `tests`.`questions`, `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `user_tests`.`answers` FROM `tests` JOIN `user_tests` ON `user_tests`.`test_id` = `tests`.`id`
    //SELECT `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `tests`.`name`, `tests`.`questions`, `user_tests`.`answers` FROM `tests` JOIN `user_tests` ON `user_tests`.`test_id` = `tests`.`id` AND `user_tests`.`result` = -1
    getTestData:(req, res) => {
        let data = {
            id: '',
            user_id: 0,
            test_id: 0,
            test_name: '',
            questions: [],
            answers: []
        }
        let response = {};
        let sql = 'SELECT `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `tests`.`name`, `tests`.`questions`, `user_tests`.`answers`'
        + 'FROM `tests` JOIN `user_tests` ON `user_tests`.`test_id` = `tests`.`id` AND `user_tests`.`result` = -1';
        pool.query(sql, function (error, results, fields) {
            
            if (error) {
                console.log("check1")
                let json = {
                  status: false,
                  message: 'there are some error with query'
                }
                return res.render('error', {json});
              }else {
                    response = results[0];
                    //console.log(response)
                    res.json(response);
              }
        })

    }

}