module.exports = {
    getHomePage: (req, res) => {
    res.render('index');
    
    },
    addPlayer: (req, res) => {

        //let firstName = req.body.firstName;
        console.log("post");
        //let query = "INSERT INTO `json` (data) VALUES ('" + firstName +  "')";
        //db.query(query, (err, result) => {
        //    if (err) {
        //        return res.status(500).send(err);
        //    }
        //    res.redirect('/');
        // });

        console.log(req.params);
        console.log('Request Type:', req.method);
    },
    addPlayerPage: (req, res) => {

        console.log("get", res.query);
        console.log(req.params);
        console.log('Request Type:', req.method);
    }

}


