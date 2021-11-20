// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
// const app = express();
//
// app.use(express.static(path.resolve(__dirname, 'http://localhost/')));  // 默认首页为www下的index.html
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extend: true }));
// app.use('/api/', '/*');
// app.listen(8080, () => {
//   console.log('your app is running at http://127.0.0.1:8080')
// })
// app.listen(3000, () => {
//   console.log('your app is running at http://127.0.0.1:3000')
// })
//
// // 拦截器
// app.all('/*', function (req, res, next) {
//   // 允许跨域的白名单, 跨域时会报错 ，* 代表任意域
//   res.header('Access-Control-Allow-Origin', '*')
//   // 允许携带Cookie, 不设置的时候， 跨域时会报错
//   res.header('Access-Control-Allow-Credentials', 'true')
//   // 允许跨域的方法
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
//   // 设置允许跨域的请求头
//   // res.header("Access-Control-Allow-Headers", "X-Requested-With")
//   // 设置响应编码
//   res.header("Content-Type", "application/json;charset=utf-8")
//   next() // 继续下一个中间件
//   let url = req.url;
//   if (url == '/login') {
//     next();
//   } else {
//     if (req.method == "GET") {
//       username = req.query.user;
//     } else if (req.method == "POST") {
//       username = req.body.user;
//     }
//     if (sessionPool[username] && getSid(res.req.headers.cookie) == sessionPool[username]) {
//       // 用户session存在
//       next();
//     } else {
//       res.json({ requestIntercept: 1 });  // 页面拿到这个值在做拦截处理即可
//     }
//   }
// });
//
// // 请求错误
// app.get('/error', function (req, res) {
//   res.send(23333333, ' \'utf-8\'')
//   res.send(fs.readFileSync(path.resolve(__dirname, './index.js/error.html'), 'utf-8'))
// });
//
// // 测试接口
// app.get('/api/get-data-test', function (req, res) {
//   res.json({ test: `测试服务器正常！` });
// })
//
// /*
// * 公共方法
// */
//
// // 解析cookie中的sid
// function getSid(cookieStr) {
//
//   let sid = '', cookieArr = cookieStr.split(';');
//   for (let i = 0; i < cookieArr.length; i++) {
//     if (cookieArr[i].trim().substring(0, 3) == 'sid') {
//       return sid = cookieArr[i].trim().substring(4, cookieArr[i].length);
//     }
//   }
//   return sid;
// }
