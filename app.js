var require_server=require('./server');
var app=require_server.app;
var server=require_server.server;
var express=require_server.express;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var jwt = require('express-jwt');
var jsonwebtoken = require("jsonwebtoken");

var key = require('./key');
var SECRET=key.secret;
var authenticate = jwt({
  secret: SECRET,
  
});


var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes); 
app.use('/users', users); 
app.use('/api', authenticate);
app.use('/api', api);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server_port;
var server_ip_address;


server_port = process.env.PORT || 3000;
server_ip_address = process.env.IP || "0.0.0.0";

server.listen(server_port, server_ip_address);




module.exports = app;
