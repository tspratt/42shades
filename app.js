var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var model = require('./model');
var routes = require('./routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Allow CORS
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});


app.get('/', routes.isAlive);
app.get('/isAlive', routes.isAlive);
app.get('/members', routes.listMembers);
app.get('/members/:oid', routes.getMember);
//app.get('/insertMembers', routes.insertMembers);

app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

model.initDb(function(err, db){
  app.listen(8080);
  console.log('Club42 app listening on port 8080')
});


module.exports = app;
