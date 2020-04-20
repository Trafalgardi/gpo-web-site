const connection = require('../database')
const dateTime = require('node-datetime');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pdf = require('html-pdf');

const pdfTemplate = require('./documents');

module.exports = {

    getHomePage: (req, res) => {
        //res.clearCookie('cookie')
        const token = req.cookies.token;
        jwt.verify(token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.send(err);
            } else {
                res.render('homepage', { email: authData.user.email });
            }
        });
    },
    addData: (req, res) => {
        let body = req.body; // Our body from post request

        let personnelData = {
            gender: body.gender,
            age: body.age,
            registration: body.registration,
            familyStatus: body.sp,
            children: children()
        };

        let swap = [];
        let swapJson = {
            Name: '',
            check: false,
            cause: ''
        };

        for (let i = 0; i < 8; i++) {
            swapJson.Name = body['change_' + i + '_0'];
            swapJson.check = body['change_' + i + '_1'];
            swapJson.cause = causeSwap(i);
            let temp = JSON.stringify(swapJson);
            swap[i] = JSON.parse(temp);
        }

        function causeSwap(index) {
            let cause = {};
            for (let i = 0; i < 9; i++) {
                if (body['change_' + index + '_1_' + i] == undefined) continue;
                cause[body['change_' + index + '_1_' + i]] = body['change_' + index + '_1_' + i + '_1'];
            }
            return cause;
        }

        function education() {
            let education = {
                //"Полное среднетехническое образование": "0",
                "Бакалавриат": "0",
                "Магистратура": "0",
                "Специалитет": "0",
                "Подготовка кадров высшей квалификации": "0",
                "Направление подготовки": {
                    "Педагогическое": "false",
                    "В области управления": "false",
                    "Управление проектами": "false",
                    "Техническое": "false",
                    "Гуманитарное": "false"
                },
                "Ученая степень": {
                    "Кандитат наук": "false",
                    "Доктор наук": "false",
                    "PhD": "false"
                },
                "Профессиональная переподготовка": {
                    "Гуманитарное": "false",
                    "Педагогическое": "false",
                    "В области управления": "false",
                    "Управление проектами": "false",
                    "Техническое": "false"
                }

            };
            for (let index = 0; index < 19; index++) {
                if (body["education_" + index] == undefined) continue;
                if (index == 12) continue;
                if (index < 4) {
                    education[body["education_" + index]] = body["education_" + index + '_0'];

                } else if (index > 3 && index < 9) {
                    education['Направление подготовки'][body["education_" + index]] = true;
                } else if (body["education_12"] == 'Да' && index > 13) {
                    education["Профессиональная переподготовка"][body["education_" + index]] = true;

                } else {
                    education["Ученая степень"][body["education_" + index]] = true;
                }

            }
            return education;
        }

        function driveLicense() {
            let driveLicenseJSON = {
                experience: 0,
                category: '-',
                haveCar: '-'
            };

            if (body["drive"] == "Да") {
                driveLicenseJSON.experience = body['drive_1'];
                driveLicenseJSON.category = body['drive_2'];
                driveLicenseJSON.haveCar = body['drive_3'];
            }
            return driveLicenseJSON;
        }

        function militaryService() {
            let militaryServiceJSON = {
                "Отношение к воинской обязанности": body['militarySelect'],
                "По какой причине": body['notMilitarySelect'],
                "Военнообязанный": body['yesMilitarySelect'],
                "Воинское звания": body['yesMilitaryRankSelect']
            }
            return militaryServiceJSON;
        }

        function language() {
            let num = body['langNubmer'];
            let languageArr = [];
            let languageJSON = {
                'Язык': '',
                'Уровень владения языком': '',
                'Шкала уровней владения иностранными языками по системе CEFR': ''
            };


            for (let index = 0; index <= num; index++) {
                if (body['language_name_' + index] == undefined) continue;
                languageJSON['Язык'] = body['language_name_' + index];
                languageJSON['Уровень владения языком'] = body['language_level_' + index];
                languageJSON['Шкала уровней владения иностранными языками по системе CEFR'] = body['language_CEFR_' + index];
                let temp = JSON.stringify(languageJSON);
                languageArr[index] = JSON.parse(temp);

            }




            return languageArr;
        }

        function children() {
            let arr = [];
            let child = {
                "Дети": body['children']
            };


            if (body['children'] == 'true') {
                let childrenJSON = {
                    'age': '',
                    'gender': ''
                }
                let temp = body["childrenNumber"];
                for (let index = 0; index <= 13; index++) {

                    if (body["ageChildrenName_" + index] == undefined) continue;
                    childrenJSON['age'] = body["ageChildrenName_" + index]
                    childrenJSON['gender'] = body["genderChildrenName_" + index]
                    let temp = JSON.stringify(childrenJSON);
                    arr[index] = JSON.parse(temp);
                }
                const result = arr.filter(Boolean); //определенный баг, не уверен где он появляется, но в начале массива всегда пустое значение это строка уберает пустое значение
                child['children'] = result;
            }

            return child;

        }


        let data = {
            personnelData: personnelData,
            swap: swap,
            drive: driveLicense(),
            education: education(),
            military: militaryService(),
            language: language(),
            academicDegree: {
                "Доктор наук": 'Нет',
                "Кандидат наук": 'Нет'
            },
            experience: body['work_experience'],
            workExpirence: {
                'Общий стаж': body['experience_0'],
                'По специальности': body['experience_1'],
                'Управленческий стаж': body['experience_2'],
                'Педагогический стаж': body['experience_3'],
                'Управление проектами': body['experience_4'],
                'Не по специальности': body['experience_5'],
                'Рабочие специальности': body['experience_6']
            }

        };

        data.academicDegree['Доктор наук'] = body['academic_degree_doc_1'];
        data.academicDegree['Кандидат наук'] = body['academic_degree_candidate_1'];



        //console.log("Данные записанны!\n" + JSON.stringify(body));
        //let tempData = JSON.stringify(data);
        const token = req.cookies.token;
        jwt.verify(token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.send(err);
            } else {
                let sql = "UPDATE users SET anketaData='" + JSON.stringify(data) + "' WHERE id='" + authData.user.id + "'";
                console.log(sql)
                connection.query(sql, function(err, result, fields) {
                    if (err) throw err;
                    res.render('post');
                    //res.send("Данные записанны!\n" + JSON.stringify(data));
                });
            }
        });


    },
    getOpenTest: (req, res) => {
        const token = req.cookies.token;
        jwt.verify(token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let sql = "SELECT `id`, `name`, `questions`, `category_id` FROM `tests` WHERE 1 ORDER BY `category_id` ASC"
                connection.query(sql, function(err, resultsTest, fields) {
                    if (err) throw err;

                    sql = "SELECT `banTests` FROM `users` WHERE id = " + authData.user.id
                    connection.query(sql, function(err, results, fields) {
                        if (err) throw err;

                        let banTests = JSON.parse(results[0].banTests).ban;

                        let tests = {};
                        for (let i = 0; i < resultsTest.length; i++) {
                            let check = true;
                            for (let j = 0; j < banTests.length; j++) {
                                if (resultsTest[i].id == banTests[j]) {
                                    check = false;
                                    break;
                                }
                            }

                            if (check) {
                                let id = resultsTest[i].category_id;
                                if (id === null) id = -1;

                                if (tests[id] !== undefined)
                                    tests[id].push(resultsTest[i]);
                                else
                                    tests[id] = [resultsTest[i]];
                            }
                        }

                        let sql = "SELECT * FROM `test_categories` WHERE 1"
                        connection.query(sql, function(err, resultsCats, fields) {
                            if (err) throw err;

                            resultsCats.forEach

                            resultsCats.forEach(function(item, index, object) {
                                if (tests[item.id] === undefined)
                                    object.splice(index, 1);
                            });

                            res.json({
                                categories: resultsCats,
                                tests
                            });
                        })
                    })
                })
            }
        });

    },
    getOpenCases: (req, res) => {
        const token = req.cookies.token;
        jwt.verify(token, 'SuperSecRetKey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                //console.log(authData)
                let sql = "SELECT `id`, `name`, `questions` FROM `cases` WHERE 1"
                connection.query(sql, function(err, result, fields) {
                    if (err) throw err;

                    sql = "SELECT `banCases` FROM `users` WHERE id = " + authData.user.id
                    connection.query(sql, function(err, results, fields) {

                        //console.log(JSON.parse(results[0].banTests))

                        let newJsonArray = []
                        let banCases = JSON.parse(results[0].banCases).ban;

                        //console.log(banTests)
                        let cases = [];
                        for (let i = 0; i < result.length; i++) {
                            let check = true;
                            for (let j = 0; j < banCases.length; j++) {
                                if (result[i].id == banCases[j]) {
                                    check = false;
                                    break;
                                }
                            }

                            if (check) {
                                cases.push(result[i])
                            }
                        }
                        //console.log(tests) 
                        res.json(cases);
                    })
                })
            }
        });

    },
    getData: (req, res) => {
        let json = {
            anketa: [], // все анкеты id и анкета
            newTests: [], //где result = -1
            newCases: [] //где result = -1
        }
        let sql = "SELECT id, anketaData FROM users WHERE anketaResult = -1";
        connection.query(sql, function(err, result, fields) {
            if (err) throw err;
            json.anketa = result;
            sql = 'SELECT `user_tests`.`id`, `user_tests`.`user_id`, `user_tests`.`test_id`, `user_tests`.`answers`' +
                'FROM `tests` JOIN `user_tests` ON `user_tests`.`test_id` = `tests`.`id` AND `user_tests`.`result` = -1';
            connection.query(sql, function(error, results, fields) {
                if (error) {
                    console.log("check1")
                    let json = {
                        status: false,
                        message: 'there are some error with query'
                    }
                    return res.render('error', { json });
                } else {
                    json.newTests = results;
                    sql = 'SELECT `user_cases`.`id`, `user_cases`.`user_id`, `user_cases`.`case_id`, `user_cases`.`answers`' +
                        'FROM `cases` JOIN `user_cases` ON `user_cases`.`case_id` = `cases`.`id` AND `user_cases`.`result` = -1';
                    connection.query(sql, function(error, results, fields) {
                        if (error) {
                            console.log("check2")
                            let json = {
                                status: false,
                                message: 'there are some error with query'
                            }
                            return res.render('error', { json });
                        } else {
                            json.newCases = results;
                            res.json(json)
                        }
                    })
                }
            })
        });
    },
    getUsers: (req, res) => {
        let json = {
            users: [] // все анкеты id и анкета
        }
        let sql = "SELECT id, email, date, anketaData, anketaResult FROM users WHERE 1";
        connection.query(sql, function(err, result, fields) {
            if (err) throw err;
            json.users = result;
            res.json(json)
        });
    },
    getLastData: (req, res) => {
        let sql = "SELECT json FROM data WHERE 1 ORDER BY ID DESC LIMIT 1";
        connection.query(sql, function(err, result, fields) {
            if (err) throw err;
            //res.send("Данные из таблицы!\n" + JSON.stringify(result) + "\n");
            res.json(result);
        });
    },
    signin: (req, res) => {
        module.exports.createToken(req.body.email, req.body.password, (success, token) => {
            if (success) {
                res.cookie('token', token);
                res.redirect('/homepage');
            } else {
                res.redirect('/signin');
            }
        });
    },
    reg: (req, res) => {
        let body = req.body; // Our body from post request
        console.log(body)

        let dt = dateTime.create();
        let formatted = dt.format('d-m-Y H:M:S');
        // пароль пользователя
        let passwordFromUser = req.body.password;
        // создаем соль
        let salt = bcrypt.genSaltSync(10);
        // шифруем пароль
        let passwordToSave = bcrypt.hashSync(passwordFromUser, salt)

        let user = {
            email: req.body.email,
            password: passwordToSave,
            date: formatted,
            banTests: '{"ban":[7,10,14,17,18,19,21,22,23]}' //Закрытые тесты
        };
        let sql = 'SELECT `email` FROM `users` WHERE `email` = "' + req.body.email + "\""
        console.log(sql)
        connection.query(sql, function(error, results, fields) {
            if (results == '') {
                console.log("check1")

                connection.query("INSERT INTO users SET ?", user, function(error, results, fields) {
                    if (error) {
                        res.json({
                            status: error,
                            message: "there is some error with query"
                        });
                    } else {
                        connection.query("SELECT * FROM users WHERE email = '" + req.body.email + "' LIMIT 1", function(error, results, fields) {
                            //Добавление данных пользователя в cookies start
                            console.log(results[0].id)
                            if (error) {
                                return console.log(error);
                            }
                            user = {
                                id: results[0].id,
                                email: results[0].email
                            }
                            jwt.sign({ user }, 'SuperSecRetKey', { expiresIn: 60 * 60 * 24 }, (err, token) => {
                                res.cookie('token', token.toString());
                                res.redirect('/homepage');
                            });
                            //Добавление данных пользователя в cookies end

                        })
                        console.log("registered!");
                    }
                });
            } else {
                console.log("check2")
                res.render('error', { error: { message: "Данный email уже заригистрирован!", status: "Ошибка при регистрации" } })
            }

        });
    },
    createToken(email, password, callback) {
        const passworFromForm = password;
        let user = {
            id: 0,
            email: ""
        }
        const sql = "SELECT * FROM users WHERE email = '" + email + "' LIMIT 1";
        connection.query(sql, function(error, results, fields) {
            if (error || results == "") {
                callback(false);
            } else {
                const passworFromBD = results[0].password; //если чо то result[0]....
                console.log(passworFromForm + '\n' + passworFromBD)
                if (passworFromForm !== undefined && passworFromForm !== null && passworFromBD !== undefined && passworFromBD !== null) {
                    if (bcrypt.compareSync(passworFromForm, passworFromBD)) {
                        user.id = results[0].id
                        user.email = results[0].email
                        jwt.sign({ user }, 'SuperSecRetKey', { expiresIn: 60 * 60 * 24 }, (err, token) => {
                            callback(true, token.toString(), results[0]);
                        });
                    } else {
                        callback(false);
                    }
                }
            }
        });
    },
    getResults: (req, res) => {
        if (req.body.email_address != undefined) {
            let email_list = req.body.email_address.toString().split(',');
            email_list = email_list.map(function(element) {
                return "'" + element.trim() + "'";
            });
            connection.query("SELECT * FROM users WHERE email IN (" + email_list.join(',') + ")", function(users_error, results, fields) {
                if (users_error) {
                    console.log(users_error);
                    throw users_error;
                } else {
                    if (results.length > 0) {
                        users_list = results;
                        var users_tests = [];
                        Promise.all(users_list.map(function(user) {
                            var promise = new Promise(function(resolve) {
                                connection.query("SELECT tests.id, tests.name, user_tests.result FROM user_tests JOIN tests ON user_tests.test_id=tests.id WHERE user_id='" + user.id + "'", function(tests_error, tests_list) {
                                    if (tests_error) {
                                        console.log(tests_error);
                                        throw tests_error;
                                    } else {
                                        resolve(tests_list);
                                    }
                                });
                            });
                            return promise.then(function(result) {
                                if (result.length > 0) {
                                    users_tests.push({
                                        user: user,
                                        tests: result,
                                    });
                                }
                            });
                        })).then(function() {
                            pdf.create(pdfTemplate({ users_tests }), {}).toFile(`${__dirname}/result.pdf`, (err) => {
                                if (err) {
                                    res.send(Promise.reject());
                                }

                                res.sendFile(`${__dirname}/result.pdf`);
                            });
                        });
                    } else {
                        return res.redirect('/results');
                    }
                }
            });
        } else {
            return res.redirect('/results');
        }
    },
}