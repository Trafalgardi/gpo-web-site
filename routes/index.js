module.exports = {
    getHomePage: (req, res) => {
    res.render('index');
    
    },
    addData: (req, res) => {

        let body = req.body;
        var personnelData = {
            firstName: body.firstName,
            lastName: body.lastName,
            firstName: body.secondName,
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
        var swap = [];

        for (var i = 0; i < 8 ; i++) {

            swapJson.Name = body['change_'+ i + '_0'];
            swapJson.check = body['change_'+ i + '_1'];
            swapJson.number = body['change_'+ i + '_2'];
            swap[i] = JSON.stringify(swapJson);
        }
        

        var data = {
            personnelData: personnelData,
            swap: swap
        };
        console.log(data);
        var sql = "INSERT INTO json (data) VALUES ('"+ JSON.stringify(body) +"')";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + body);
        });
        if(req.query != null){
            res.send("Данные записанны!\n" + JSON.stringify(data));
        }
       
        
       
    }


}


