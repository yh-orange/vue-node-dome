
'use strict';

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, './modules/');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hi', function(req, res, next) {
  req.name = 'kim';
  next();
})

router.get('/hi', function(req,res) {
  res.send(`hello ${req.name}`)
})

router.get('/request', function(req,res,next){
  res.send(req.query)
})

router.post('/postrequest', function(req, res, next){
  res.send(req.body)
})
router.post('/get-data-test', function(req, res, next){
  res.send(req.body)
})
router.get('/user', function(req, res, next) {
  res.send({
    name: 'kim',
    address: '广州海珠区',
  })
})
// console.log(router);
module.exports = router;
