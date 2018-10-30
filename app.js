var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var usersRouter = require('./routes/users');

const {getHomePage, addData, addPlayerPage} = require('./routes/index');

const port = 3000;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'pug');
app.use(bodyParser.json()); // parse form data client
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

app.get('/', getHomePage);
app.post('/addData', addData);


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;