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
app.get('/listAllMembers', routes.listAllMembers);
app.get('/listMembers', routes.listMembers);
app.get('/filterMembersByName', routes.filterMembersByName);
app.get('/getMember', routes.getMember);
//app.get('/insertMembers', routes.insertMembers);

model.initDb(function(err, db){
  app.listen(8080);
  console.log('app listening on port 8080')
});


module.exports = app;
