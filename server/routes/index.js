'use strict';
var express = require('express');
var router = express.Router();
let axios = require('axios');
const hostIp = require('ip').address();
var service = require("./../http/http-server");
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
  // axios.get( `http://localhost:3333/${req.url}`).then(data=>{
  //   res.send(data)
  // }).catch(error =>{
  //   res.send(error)
  // });
  // return service.get({
  //   url: req.url.split('?')[0],
  //   data: req.query,
  //   method: req.method
  // });
  service({
    url: req.url,
    method: 'get'
  }).then(data=>{
    res.send(data)
  }).catch(error =>{
    res.send(error)
  });
})

router.post('/login', function (req, res, next) {
  res.send(req.body)
})
router.post('/postrequest', function (req, res, next) {
  res.send(req.body)
})
router.post('/get-data-test', function (req, res, next) {
  console.log({
    url: req.url,
    data: req.body,
    method: req.method
  });
  res.send(req.body)
  // next()
})
router.get('/user', function (req, res, next) {
  res.send({
    name: 'kim',
    address: '广州海珠区',
  })
})
router.post("/create-db", (req, res) => {
  console.log(req.body);
})
// 创建表
router.post("/create-posts-table", (req, res) => {
  res.send(req.body)
})
router.post("/inset-data-table", (req, res) => {
  res.send(req.body)
})
router.post("/edit-data-table", (req, res) => {
  res.send(req.body)
});
router.delete("/del-data-table", (req, res) => {
  res.send(req.body)
});
router.get("/get-data-table", (req, res) => {
  res.send(req.query)
});
module.exports = router;
