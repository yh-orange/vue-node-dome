'use strict';
let express = require('express');
let router = express.Router();
let service = require("./../http/http-server");
/* GET home page. */

router.get('/request', function (req, res, next) {
  service({
    url: req.url,
    method: 'get'
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send({cold: error.cold, message: error.message})
  });
})

router.post('/login', function (req, res, next) {
  service({
    url: req.url,
    method: 'post',
    data: req.body
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send({cold: error.cold, message: error.message})
  });
})
router.post('/postrequest', function (req, res, next) {
  service({
    url: req.url,
    method: 'post',
    data: req.body
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send({cold: error.cold, message: error.message})
  });
})
router.post('/get-data-test', function (req, res, next) {
  service({
    url: req.url,
    method: 'post',
    data: req.body
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send({cold: error.cold, message: error.message})
  });
  // next()
})
router.get('/user', function (req, res, next) {
  service({
    url: req.url,
    method: 'get'
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send({cold: error.cold, message: error.message})
  });
})
router.post("/create-db", (req, res) => {
  service({
    url: req.url,
    method: 'post',
    data: req.body
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send({cold: error.cold, message: error.message})
  });
})
// 创建表
router.post("/create-posts-table", (req, res) => {
  service({
    url: req.url,
    method: 'post',
    data: req.body
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send({cold: error.cold, message: error.message})
  });
})
router.post("/inset-data-table", (req, res) => {
  service({
    url: req.url,
    method: 'post',
    data: req.body
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send({cold: error.cold, message: error.message})
  });
})
router.post("/edit-data-table", (req, res) => {
  service({
    url: req.url,
    method: 'post',
    data: req.body
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send({cold: error.cold, message: error.message})
  });
});
router.delete("/del-data-table", (req, res) => {
  service({
    url: req.url,
    method: 'delete',
    data: req.body
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send({cold: error.cold, message: error.message})
  });
});
router.get("/get-data-table", (req, res) => {
  service({
    url: req.url,
    method: 'get'
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send({cold: error.cold, message: error.message})
  });
});
module.exports = router;
