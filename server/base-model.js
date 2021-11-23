//读取config.json配置文件，并获取其中db的配置信息
let Util = require('./util/util'),//引入util.js工具类
  mysql = require('mysql'),//获取mysql模块对象
  dbClient;//全局的mysql连接句柄
let dbConfig = {"host":"120.77.15.134","port":"3000","user":"yh","password":"KBc7mSdYe6r7HxFN","dbName":"yh"};
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
    dbClient && dbClient.connect();
    console.log(addSql, addSqlParams);
    dbClient.query(addSql, addSqlParams, (err, result) => {
      dbClient.end && dbClient.end();
      if (err) {
        console.log('插入失败');
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
    dbClient && dbClient.connect();
    dbClient.query(modSql, modSqlParams, (err, result) => {
      dbClient.end && dbClient.end();
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
    dbClient && dbClient.connect();
    dbClient.query(sql, (err, result) => {
      dbClient.end && dbClient.end();
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
    dbClient && dbClient.connect();
    dbClient.query(sql, (err, result) => {
      dbClient.end && dbClient.end();
    if (err) {
      errorCallback(err && err.message);
      return;
    }
    // 查询成功
      successCallback(result);
  });
  };
// // 创建数据库
//   app.get("/createdb",(req,res) => {
//     let sql = "CREATE DATABASE nodemysql";
//     db.query(sql,(err,result) => {
//       if(err){
//         console.log(err);
//       }else{
//         console.log(result);
//         res.send("Datebase create success...")
//       }
//     })
//   })
//
// //  创建表
//   app.get("/createpoststable",(req,res) => {
//     //  创建表 表名为posts id自增 title字符串长度255 body字符串255 主键是ID
//     let sql = "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(ID))";
//     db.query(sql,(err,result) => {
//       if(err){
//         console.log(err);
//       }else{
//         console.log(result);
//         res.send("posts表创建成功....")
//       }
//     })
//   })
//
// // 插入数据
//   app.get("/addpost2",(req,res) => {
//     let post = {title:"post two",body:"weasth"};
//     let sql = "INSERT INTO posts SET ?";
//     db.query(sql,post,(err,result) => {
//       if(err){
//         console.log(err);
//       }else{
//         console.log(result);
//         res.send("post2 added....")
//       }
//     })
//   })
// // 查询内容
//   app.get("/getposts",(req,res) => {
//     let sql = "SELECT * FROM posts";
//     db.query(sql,(err,result) => {
//       if(err){
//         console.log(err);
//       }else{
//         console.log(result);
//         // res.send("查询成功")
//         res.json(result)
//       }
//     })
//   })
//
// // 查询单条内容
//   app.get("/getposts/:id",(req,res) => {
//     let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
//     db.query(sql,(err,result) => {
//       if(err){
//         console.log(err);
//       }else{
//         console.log(result);
//         res.json(result)
//       }
//     })
//   })
// // 更新内容
//   app.get("/updatepost/:id",(req,res) => {
//     let newTitle = "update title";
//     let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
//     db.query(sql,(err,result) => {
//       if(err){
//         console.log(err);
//       }else{
//         console.log(result);
//         res.send(`update ${req.params.id} success....`)
//       }
//     })
//   })
//
// // 删除内容
//   app.get("/deletepost/:id",(req,res) => {
//     let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
//     db.query(sql,(err,result) => {
//       if(err){
//         console.log(err);
//       }else{
//         console.log(result);
//         res.send("删除成功.....")
//       }
//     })
//   })
};
