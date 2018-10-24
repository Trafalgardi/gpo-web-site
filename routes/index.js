module.exports = {
    getHomePage: (req, res) => {
    res.render('index');
    
    },
    addData: (req, res) => {

        var data = JSON.parse
        var sql = "INSERT INTO json (data) VALUES ('"+ JSON.stringify(req.body) +"')";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + req.body);
        });
        //console.log(req.query);
        console.log(req.body);
        if(req.query != null){
            res.send("Данные записанны!\n" + JSON.stringify(req.body));
        }
       
       var swapJson = 
       {

            Name: '',
            check: false,
            number: 0

       };
       var swap = [];
       var temp = req.body;
       
       for (var i = 0; i < 8 ; i++) {

            swapJson.Name = temp['change_'+ i + '_0'];
            swapJson.check = temp['change_'+ i + '_1'];
            swapJson.number = temp['change_'+ i + '_2'];
            swap[i] = JSON.stringify(swapJson);
       }
       
       
    }


}


