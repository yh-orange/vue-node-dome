//读取config.json配置文件，并获取其中db的配置信息
let Util = require('./util/util'),//引入util.js工具类
  mysql = require('mysql'),//获取mysql模块对象
  dbClient;//全局的mysql连接句柄
let dbConfig = Util.get('config.json', 'db');

let function__constructor = function () {
  client = {};//获取mysql的配置信息

  client.host = dbConfig['host'];//读取配置文件中mysql的host值

  client.port = dbConfig['port'];//读取配置文件中mysql的port值

  client.user = dbConfig['user'];//读取配置文件中mysql的数据库用户名

  client.password = dbConfig['password'];//读取配置文件中mysql的数据库密码

//创建mysql连接

  dbClient = mysql.createConnection(client);//创建mysql连接对象

  dbClient.connect(function (err) {

    console.log('connection success');

  });
//连接mysql服务器指定的数据库
  dbClient.query('USE ' + dbConfig['dbName'], function (error, results) {
    if (error) {
      console.log('ClientConnectionReady Error: ' + error.message);
      dbClient.end();
    }
    console.log('connection local mysql success');

  })
  //关闭数据库连接

  dbClient.end(function (err) {

    console.log('connection close');

  });
};
module.exports = function () {//数据查询接口
  function__constructor();
  // 增
  this.insert = function (addSql, addSqlParams, successCallback, errorCallback) {
    dbClient.query(addSql, addSql, (err, result) => {
      dbClient.release();
      if (err) {
        errorCallback(err && err.message);
        return;
      }
      // 插入成功输出
      console.log('插入成功');
      successCallback(result);
    });
  };
  // 改
  this.edit = function (modSql, modSqlParams, successCallback, errorCallback) {
    dbClient.query(modSql, modSqlParams, (err, result) => {
      dbClient.release();
      if (err) {
        errorCallback(err && err.message);
        return;
      }
      console.log('upload success!');
      successCallback(result);
    });
  };
  //数据删除接口
  this.remove = function (sql, successCallback, errorCallback) {
    dbClient.query(sql, (err, result) => {
      dbClient.release();
      if (err) {
        errorCallback(err && err.message);
        return;
      }
      // 执行成功
      console.log('delete success!');
      successCallback(result);
    });
  };
  //数据条件查询接口
  this.find = function (sql, successCallback, errorCallback) {
    dbClient.query(sql, (err, result) => {
      dbClient.release();
    if (err) {
      errorCallback(err && err.message);
      return;
    }
    // 查询成功
      successCallback(result);
  });
  };

};
