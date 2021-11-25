'use strict';
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, './modules/');
let BaseModel = require('../base-model');//引入base_model基类
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/hi', function (req, res, next) {
  req.name = 'kim';
  next();
})

router.get('/hi', function (req, res) {
  res.send(`hello ${req.name}`)
})

router.get('/request', function (req, res, next) {
  res.send(req.query)
})

router.post('/login', function (req, res, next) {
  res.send(req.body)
})
router.post('/postrequest', function (req, res, next) {
  res.send(req.body)
})
router.post('/get-data-test', function (req, res, next) {
  // res.send(req.body)
  next()
})
router.get('/user', function (req, res, next) {
  res.send({
    name: 'kim',
    address: '广州海珠区',
  })
})
router.post("/create-db", (req, res) => {
  console.log(req.body.value);
  let sql = req.query.value || "CREATE DATABASE nodemysql";
  BaseModel.createDb(sql, (data) => {
    res.send(data);
  })
})
// 创建表
router.post("/create-posts-table", (req, res) => {
  //  创建表 表名为posts id自增 title字符串长度255 body字符串255 主键是ID
  let sql = req.body.value ||
    "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(ID))";
  BaseModel.createPostsTable(sql, (data) => {
    res.send(data);
  })
})
router.post("/inset-data-table", (req, res) => {
  let sql = req.body.sql || "INSERT INTO posts SET ?";
  let params = req.body.params || {title: "post two", body: "weasth"};
  BaseModel.insert(sql, params, (data) => {
    res.send(data);
  })
})
router.post("/edit-data-table", (req, res) => {
  let params = req.body.params || {title: "post two", id: "1"};
  let sql = req.body.sql || `UPDATE posts SET title = '${params.title}' WHERE id = ${params.id}`;
  BaseModel.edit(sql, params, (data) => {
    res.send(data);
  })
});
router.delete("/del-data-table", (req, res) => {
  let params = req.body.params || {id: "1"};
  let sql = req.body.sql || `DELETE FROM posts WHERE id = ${params.id}`;
  BaseModel.delete(sql, params, (data) => {
    res.send(data);
  })
});
router.get("/get-data-table", (req, res) => {
  let params = req.query.params || {id: "1"};
  let sql = req.query.sql || `SELECT * FROM posts WHERE id = ${req.query.id}`;
  BaseModel.find(sql, params, (data) => {
    res.send(data);
  })
});
module.exports = router;
