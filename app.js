var express = require('express');
var path = require('path');
var favicon = require('serve-favicon')
var bodyParser = require('body-parser');
var app = express();

var usersRouter = require('./routes/users');

const {getHomePage, addData, getData, getLastData} = require('./routes/index');

const port = 3000;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'pug');
app.use(bodyParser.json()); // parse form data client
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(express.static(path.join(__dirname, 'fontawesome')));
app.get('/', getHomePage);
app.post('/addData', addData);
app.get('/getData', getData);
app.get('/getLastData', getLastData);
app.get('/phpmyadmin', function(req, res) {
  res.redirect('http://personnelsecurity.info:8000/phpmyadmin/');
})


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
