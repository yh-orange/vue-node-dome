let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let Log = require('yh_node_logger');
const logger = Log({filePath: __filename});
const hostIp = require('ip').address();
const bodyParser = require('body-parser');
const fs = require('fs');

Object.defineProperty(global, 'ctx_path', {
  value: '',
  configurable: true
});

let usersRouter = require('./routes/users');
let indexRouter = require('./routes');

let app = express();
app.use(express.static(path.resolve(__dirname, './www')));  // 默认首页为www下的index.html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
const sessionPool = {};
const myLogger = function (req, res, next) {
  logger.info('请求地址为: %s', req.url.split('?')[0]);
  next();
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(myLogger);
//跨域问题解决方面
const cors = require('cors');
app.use(cors({
  // origin: [hostIp + '8080', hostIp + '3333', 'http://localhost:8080'],
  // origin: [hostIp + '8080'],
  methods: ['GET', 'POST', 'DELETE'],
  // origin: ['*'],
}));
//跨域问题解决方面
app.all('*', function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', hostIp + '3333');
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
  /**
   * 判断是否处于登录状态的逻辑处理，
   * 1如果处于登录状态，就将数据写入头部
   * 2如果不是登录状态且不是登录的请求接口，就重定向到登录页
   *  如果是登录的路由， 就不做任何处理
   * */
    // if (req.url === '/login') {
    //   }
    // 判断是否已在线
    // if (!sessionPool[req.body.user]) {
    //   // 在线
    // } else {
    //   if (req.method == "GET") {
    //     username = req.query.user;
    //   } else if (req.method == "POST") {
    //     username = req.body.user;
    //   }
    //   if (sessionPool[username] && getSid(res.req.headers.cookie) == sessionPool[username]) {
    //     // 用户session存在
    //     next();
    //   } else {
    //     res.json({ requestIntercept: '你还没登录哦' });  // 页面拿到这个值在做拦截处理即可
    //   }
    // }
  });
// view engine setup
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// 请求错误
app.get('/error', function (req, res) {
  res.send(fs.readFileSync(path.resolve(__dirname, './www/error.html'), 'utf-8'))
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// 登录接口
app.post('/login', function (req, res) {
  // 判断是否已在线
  if (sessionPool[req.body.user]) {
    // 在线
    delete sessionPool[req.body.user];
  }
})

// 退出登录
app.post('/logout', function (req, res) {

  delete sessionPool[req.body.user];
  res.json({logout: 1});
  res.end();
})
/*
* 公共方法
*/

// 解析cookie中的sid
function getSid(cookieStr) {
  let sid = '', cookieArr = cookieStr.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i].trim().substring(0, 3) == 'sid') {
      return sid = cookieArr[i].trim().substring(4, cookieArr[i].length);
    }
  }
  return sid;
}

module.exports = app;
