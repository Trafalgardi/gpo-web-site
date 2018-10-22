var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const {getHomePage, addPlayer} = require('./routes/index');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// view engine setup

const db  = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser());

app.get('/', getHomePage);
//app.get('/add', addPlayerPage);
//app.get('/edit/:id', editPlayerPage);
//app.get('/delete/:id', deletePlayer);
app.get('/add', addPlayer);
//app.post('/edit/:id', editPlayer);

//app.use('/', indexRouter);
//app.use('/users', usersRouter);




module.exports = app;
