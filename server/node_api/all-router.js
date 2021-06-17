/*!
 * Copyright (c) 2010-2020 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有 (c) 2010-2020 湖南蚁坊软件股份有限公司。保留所有权利。
 */

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * 模块路由汇总 (http)
 * Created by wuyaoqian on 2016/12/1.
 */

const dir = path.join(__dirname, './modules/');
var express = require('express');
var router = express.Router();

fs.readdirSync(dir).forEach(function (moduleName) {
    let routeDir = path.join(dir, moduleName, 'route');
    if (!fs.existsSync(routeDir) || !fs.lstatSync(routeDir).isDirectory()) { return; }
    fs.readdirSync(routeDir).forEach(function (routeFile) {
        // 排除无效的文件
        if (!/\.http\.js$/.test(routeFile)) { return; }
        // 找到合适的位置插入到路由处理链中
        let route = require(path.join(routeDir, routeFile));
        route = route.__esModule ? route.default : route;
        // console.log(route);
        route.routes.forEach(item =>{
          router[item.method](item.path, function(req, res, next) {
            if (item.method === 'post') {
              res.send(req.body)
            } else if (item.method === 'get') {
              res.send(`data ${req.query}`)
            } else {
              res.send(`data ${req.query}`)
            }
          });
        });
    });
});
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
  console.log(req.query, 'query-----');
  res.send(req.query)
})

router.post('/postrequest', function(req, res, next){
  console.log(req.body, 'query-----');
  res.send(req.body)
})

router.get('/user', function(req, res, next) {
  console.log('req: ',req)
  res.send({
    name: 'kim',
    address: '广州海珠区',
  })
})
// console.log(router);
module.exports = router;
