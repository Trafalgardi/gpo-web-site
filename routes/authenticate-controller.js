const connection =  require('../database')

let bcrypt = require('bcrypt');



function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
module.exports.authenticate = function (req, res) {
  const email = req.body.email;
  const passworFromForm = req.body.password;


  connection.query('SELECT * FROM tbl_users WHERE email = ?', [email], function (error, results, fields) {
    if (error) {

      console.log("check1")
      let json = {
        status: false,
        message: 'there are some error with query, file is authenticate-controller.js check1.\n Пожалуйста передайте это сообщение на email theremandram@gmail.com'
      }
      return res.render('error', {json});
    } else {

      if (results.length > 0) {
        
        const passworFromBD = results[0].password;
        if (passworFromForm !== undefined && passworFromForm !== null && passworFromBD !== undefined && passworFromBD !== null) {
          let token = makeid();
          let ipAdr = req.connection.remoteAddress;
          console.log("the both values are " + email + token);
          connection.query('INSERT INTO tokens VALUES(?,?,?,?,?,?);', ['',email.toString(), token.toString(), new Date() + 9999, ipAdr], function (error, results, fields) {
            if (error) {
              console.log("check2")
              res.status(201).json({
                status: false,
                message: 'there are some error with query'
              })
            } else {
              tokenJSON = {
                "token": token,
                "openDate": formatted,
                "ip": ipAdr,
                expire : new Date() + 9999
              }
              res.cookie("token", tokenJSON);
              res.status(200).json({
                status: true,
                message: token.toString()
              });
            }
          });

        } else {
          res.status(201).json({
            status: false,
            message: "Email and password does not match"
          });
        }

      } else {
        res.status(201).json({
          status: false,
          message: "Email does not exits"
        });
      }
    }
  });
}