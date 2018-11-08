var pool = require('../database')
module.exports = {
    
    getHomePage: (req, res) => {
        
        res.render('index');
    
    },
    addData: (req, res) => {
        

        let body = req.body;
        var personnelData = {
            firstName: body.firstName,
            lastName: body.lastName,
            secondName: body.secondName,
            gender: body.gender,
            age: body.age,
            registration: body.registration,
            children: body.children
        };
        var swapJson = {

            Name: '',
            check: false,
            number: 0

        };
        let swap = [];
        let education = {
            Name: '',
            average: ''
        };
        let drive = {
            experience: '',
            haveCar: ''
        };

        for (var i = 0; i < 8 ; i++) {

            swapJson.Name = body['change_'+ i + '_0'];
            swapJson.check = body['change_'+ i + '_1'];
            swapJson.number = body['change_'+ i + '_2'];
            var temp = JSON.stringify(swapJson);
            swap[i] = JSON.parse(temp);
        }
        
        if(body["drive"] == "Нет"){ 
            drive.experience = 0;
            drive.haveCar = '-';
        }else {
            drive.experience = body['drive_1'];
            drive.haveCar = body['drive_3'];
        }
        

        var data = {
            personnelData: personnelData,
            swap: swap,
            drive: drive
        };

        



        
        //console.log("Данные записанны!\n" + JSON.stringify(body));
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

    
    }

}


