// const config = require('config.json');
// // 然后在创建的项目文件中进行操作，例如在app.js中，先声明变量Util和dbClient。
var Util = require('./util/util'),//引入util.js工具类
  mysql = require('mysql'),//获取mysql模块对象
  dbClient;//全局的mysql连接句柄
var connection = mysql.createConnection(config);//判断是否成功链接

connection.connect(function (err) {

  console.log('connection success');

});//关闭数据库连接

connection.end(function (err) {

  console.log('connection close');

});

// 实例化BaseModel对象。

let BaseModel = require('./base-model');//引入base_model基类

let baseModel = new BaseModel();//实例化baseModel对象
