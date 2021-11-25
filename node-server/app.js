let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let Log = require('yh_node_logger');
const logger = Log({filePath: __filename});
const hostIp = require('ip').address();
const bodyParser = require('body-parser');
const fs = require('fs');
let BaseModel = require('./base-model');//引入base_model基类
let baseModel = new BaseModel();//实例化baseModel对象

Object.defineProperty(global, 'ctx_path', {
  value: '',
  configurable: true
});
let usersRouter = require('./routes/users');
let indexRouter = require('./routes');

let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.resolve(__dirname, './www')));  // 默认首页为www下的index.html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
const sessionPool = {};
const myLogger = function (req, res, next) {
  console.log('LOGGED');
  logger.info('请求地址为: %s', req.url.split('?')[0]);
  next();
};

app.use(myLogger);
//跨域问题解决方面
const cors = require('cors');
app.use(cors({
  origin: ['*'],
  // origin: [hostIp + '3000', '127.0.0.1：3000', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE'],
}));
//跨域问题解决方面
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Origin', [hostIp + '3000','http://localhost:3000', '127.0.0.1:3000']);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
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
  console.log(req && req.body);
  // 判断是否已在线
  if (sessionPool[req.body.user]) {
    // 在线
    delete sessionPool[req.body.user];
  }
  // 使用数据库连接池
  // pool.getConnection(function (err, connection) {
  //
  //   // 多语句查询示例
  //   connection.query("select * from userlist where username = '" + req.body.username + "' and password = '" + req.body.password + "' and delMark = '0'; select count(1) from userlist", function (err, rows) {
  //
  //     if (err) {
  //       throw err;
  //     } else {
  //       if (rows[0].length > 0) {
  //         // 设置cookie
  //         let cookieSid = req.body.user + Date.parse(new Date());
  //         res.setHeader("Set-Cookie", ["sid=" + cookieSid + ";path=/;expires=" + new Date("2030")]);
  //         // 先存储session到sessionPool
  //         sessionPool[req.body.user] = cookieSid;
  //         // 返回登录成功的信息
  //         res.json({ status: 1, dbData: rows[0], session: req.session });
  //         res.end();
  //       } else {
  //         // 用户不存在
  //         res.json({ status: 0 });
  //         res.end();
  //       }
  //     }
  //   });
  //   // 释放本次连接
  //   connection.release();
  // });
  let addSql = "insert into userlist (username, password, phoneNumber, QQ)";
  let addSqlParams = [req.body.username, req.body.password, req.body.phoneNumber, req.body.QQ];
  baseModel.insert(addSql, addSqlParams, (data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    }
  )
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