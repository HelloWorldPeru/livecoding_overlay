const chalk = require('chalk');

require('dotenv').config();

var express = require('express');
var socket_io = require('socket.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var livereload = require('express-livereload');


var app = express();

var io = socket_io();
app.io = io;


livereload(app, {
  watchDir: process.cwd(),
  exts: ["ejs"]
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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





// Analytics
var analytics = require('./modules/analytics')();

// Chat
var chat = require('./modules/chat')();

var manager = require('./modules/manager')(app.io);

// Music
var music = require('./modules/music')();

// Visitors
var overlay = require('./modules/overlay')(app.io);

// Visitors
var visitors = require('./modules/visitors')();

var modules = [chat, manager, overlay, music, analytics, visitors];
var events = ['guestMessage', 'guestEnter', 'guestCommand', 'guestLeave', 'trackChange', 'systemMessage', 'visitorNew', 'visitorExisting'];

modules.forEach(function(module, index, array){

  // Listen for each event
  events.forEach(function(event, index, array) {

    module.on(event, function (data) {

      if(!data.no_relay){
        revised_data = data;
        revised_data.no_relay = true;

        modules.forEach(function(receiving_module , index, array){
          if (module.name != receiving_module.name) {
            receiving_module.emit(event, revised_data);
          }
        }.bind(this));
      }

    });

  }.bind(this));

}.bind(this));









module.exports = app;
