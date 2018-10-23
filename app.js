var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var usersRouter = require('./routes/users');

const {getHomePage, addPlayer, addPlayerPage} = require('./routes/index');

const port = 5000;

const db  = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

/*db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});*/

const db_config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
    console.log('\n Connected to database \n');
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
//app.get('/edit/:id', editPlayerPage);
//app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
//app.post('/edit/:id', editPlayer);

//app.use('/', indexRouter);
//app.use('/users', usersRouter);


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;