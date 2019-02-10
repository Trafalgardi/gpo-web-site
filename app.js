const express = require('express');
const path = require('path');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const connection = require('./database')
const bcrypt = require('bcrypt');
const request = require('request');
const cookieParser = require('cookie-parser')
var app = express();


var usersRouter = require('./routes/users');

const {getHomePage, addData, getData, getLastData, into,reg} = require('./routes/index');
const {setTest, addDataTest, setTestCoef,getTestData} = require('./routes/test');
const port = 3000;


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'pug');
app.use(bodyParser.json()); // parse form data client
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser())


app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(express.static(path.join(__dirname, 'fontawesome')));
app.get('/', getHomePage);
//app.get('/into', into);
//app.get('/reg', reg);

/* Creae API route */
app.get('/api/home', (req, res) => {
  res.render('home')
})
app.get('/api', (req, res) => {
  res.json({
      msg: "Welcome to NodeJS JWT Authentication Tutorial"
  });
});
/** Create posts protected route */
app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'SuperSecRetKey', (err, authData)=>{
      if(err){
          res.sendStatus(403);
      }else{
          res.json({
              msg: "A new post is created",
              authData
          });
      }
  });
});

//User signin route - create a token and return to user
app.post('/api/signin', (req, res) => {
  const passworFromForm = req.body.password;
  let user = {
    id: 0,
    email: ""
  }    
  //SELECT * FROM tbl_users WHERE email = 'theremandram@gmail.com' LIMIT 1
  const sql = "SELECT * FROM tbl_users WHERE email = '"+req.body.email+"' LIMIT 1";
  console.log(sql)
  connection.query(sql, function (error, results, fields) {  
      console.log(results[0].id)
      if (error) {
          return console.log(error);
      }
      const passworFromBD = results[0].password;//если чо то result[0]....
      console.log(passworFromForm +'\n' + passworFromBD)
      if(passworFromForm !== undefined && passworFromForm !== null && passworFromBD !== undefined && passworFromBD !== null){
          if(bcrypt.compareSync(passworFromForm, passworFromBD)) {
            console.log("Passwords match")
            user.id = results[0].id
            user.email = results[0].email
            jwt.sign({user},'SuperSecRetKey', { expiresIn: 60 * 60 }, (err, token) => {
              res.clearCookie();
              res.cookie('token', token.toString(), { httpOnly: true});
              res.json({token});
              console.log(req.cookies("token"))
            });
          } else {
            console.log("Passwords don't match")
          }
      }
  });

  
});

/** verifyToken method - this method verifies token */
function verifyToken(req, res, next){
    
  //Request header with authorization key
  const bearerHeader = req.headers['authorization'];
  
  //Check if there is  a header
  if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      
      //Get Token arrray by spliting
      const bearerToken = bearer[1];
      req.token = bearerToken;
      //call next middleware
      next();
  }else{
      res.sendStatus(403);
  }
}

app.route('/reg')
  .get(function(req, res) {
    res.render('reg');
  })
  .post(reg)
app.route('/into')
  .get(function(req, res) {
    res.render('into');
  })
  .post(into)

app.post('/addData', addData);
app.get('/getData', getData);
app.get('/getLastData', getLastData);
app.get('/phpmyadmin', function(req, res) {
  res.redirect('http://personnelsecurity.info:8000/phpmyadmin/');
})
app.get('/test/:id', setTest)
app.get('/getTestData', getTestData)
app.post('/test/addDataTest', addDataTest);
app.post('/test/setTestCoef', setTestCoef);



app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


module.exports = app;
