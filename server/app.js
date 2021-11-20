let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const hostIp = require('ip').address();

Object.defineProperty(global, 'ctx_path', {
  value: '',
  configurable: true
});

let usersRouter = require('./routes/users');
let allRouter =  require('./all-router');

let app = express();
//跨域问题解决方面
const cors = require('cors');
app.use(cors({
    origin:[hostIp, 'http://localhost:8080'],
    methods:['GET','POST'],
}));
//跨域问题解决方面
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', hostIp);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
　next();　
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', allRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
