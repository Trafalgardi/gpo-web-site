var pool = require('../database')
module.exports = {
    
    getHomePage: (req, res) => {
        
        res.render('index');
    
    },
    addData: (req, res) => {
        

        let body = req.body; // Our body from post request
        
        var personnelData = {
            firstName: body.firstName,
            lastName: body.lastName,
            secondName: body.secondName,
            gender: body.gender,
            age: body.age,
            registration: body.registration,
            children: children()
        };
        
        let swap = [];
        var swapJson = {
            Name: '',
            check: false,
            cause: ''
        };
        
        
        for (var i = 0; i < 8 ; i++) {

            swapJson.Name = body['change_'+ i + '_0'];
            swapJson.check = body['change_'+ i + '_1'];
            swapJson.cause = causeSwap(i);
            let temp = JSON.stringify(swapJson);
            swap[i] = JSON.parse(temp);
        }

        function causeSwap(index){
            let cause = {};
            for (var i = 0; i < 9 ; i++) {
                if(body['change_'+ index + '_1_' + i] == undefined) continue; 
                cause[body['change_'+ index + '_1_' + i]] = body['change_'+ index + '_1_' + i + '_1'];
            }
            return cause;
        }
        function education() {
            let education = {
                "Полное среднетехническое образование": "0",
                "Бакалавриат": "0",
                "Магистратура": "0",
                "Специалитет": "0",
                "Направление подготовки":{
                    "Педагогическое": "false",
                    "В области управления": "false",
                    "Управление проектами": "false",
                    "Техническое": "false",
                    "Гуманитарное": "false"
                },
                "Ученая степень":
                {
                    "Кандитат наук": "false",
                    "Доктор наук": "false",
                    "PhD": "false"
                },
                "Профессиональная переподготовка":{
                    "Гуманитарное": "false",
                    "Педагогическое": "false",
                    "В области управления": "false",
                    "Управление проектами": "false",
                    "Техническое": "false"
                }
                
            };
            for (let index = 0; index < 19; index++) {
                if(body["education_" + index] == undefined) continue; 
                if(index == 12) continue; 
                if(index < 4){
                    education[body["education_" + index]] = body["education_" + index + '_0'];
                    
                }else if(index > 3 && index < 9){
                    education['Направление подготовки'][body["education_" + index]] = true;
                }else if(body["education_12"] == 'Да' && index > 13){
                    education["Профессиональная переподготовка"][body["education_" + index]] = true;
                    
                }else{
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
            
            if(body["drive"] == "Да"){ 
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
                if (body['language_name_'+ index] == undefined) continue;
                languageJSON['Язык'] =  body['language_name_'+ index];
                languageJSON['Уровень владения языком'] =  body['language_level_'+ index];
                languageJSON['Шкала уровней владения иностранными языками по системе CEFR'] =  body['language_CEFR_'+ index]; 
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
            
            
            if(body['children'] == 'true'){
                let childrenJSON = {
                    'age': '',
                    'gender': ''
                }
                let temp =  body["childrenNumber"];
                for (let index = 0; index <= 13; index++) {
                    
                    if(body["ageChildrenName_" + index] == undefined) continue;
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

        var sql = "INSERT INTO json (data) VALUES ('"+ JSON.stringify(data) +"')";
        pool.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.render('post');
            //res.send("Данные записанны!\n" + JSON.stringify(data));
        });

    },
    getData: (req, res) => {
        
        
        var sql = "SELECT data FROM json WHERE 1";
        pool.query(sql, function (err, result, fields) {
            if (err) throw err;
            //res.send("Данные из таблицы!\n" + JSON.stringify(result) + "\n");
            res.json(result);
        });

    
    },
    getLastData: (req, res)=>{
        var sql = "SELECT data FROM json WHERE 1 ORDER BY ID DESC LIMIT 1";
        pool.query(sql, function (err, result, fields) {
            if (err) throw err;
            //res.send("Данные из таблицы!\n" + JSON.stringify(result) + "\n");
            res.json(result);
        });
    }

}


