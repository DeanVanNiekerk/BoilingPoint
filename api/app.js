var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var kettle = require('./routes/kettle');

var app = express();

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
app.use('/scripts/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/scripts/bootstrap-switch', express.static(__dirname + '/node_modules/bootstrap-switch/dist/'));
app.use('/scripts/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/scripts/angular-bootstrap', express.static(__dirname + '/node_modules/angular-bootstrap/'));
app.use('/scripts/angular-animate', express.static(__dirname + '/node_modules/angular-animate/'));
app.use('/scripts/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

//Disable caching
app.use(function noCache(req, res, next){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
    next();
});

app.use('/', routes);
app.use('/kettle', kettle);

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


// sets port 8080 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'));
console.log("Server running at http://127.0.0.1:8080/");

module.exports = app;
