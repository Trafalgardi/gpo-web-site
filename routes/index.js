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
       
    }

}


