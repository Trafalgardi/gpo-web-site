module.exports = {
    getHomePage: (req, res) => {
    res.render('index');
    
    },
    addPlayer: (req, res) => {

        let firstName = req.body.firstName;
        let query = "INSERT INTO `json` (data) VALUES ('" + first_name +  "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }

}


