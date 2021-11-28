// http_server.js
var axios = require("axios")
const hostIp = require('ip').address();
console.log(process);
// 创建axios实例s
const service = axios.create({
  baseURL:`http://${hostIp}:3333/`, // api的base_url  process.env.BASE_API,,注意局域网访问时，不能使用localhost
  timeout: 20 * 1000, // 请求超时时间
});
// request拦截器,拦截每一个请求加上请求头
service.interceptors.request.use(config => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers.post['Content-Type'] = 'application/x-www-fromurlencodeed'
  // if (store.state.token) {
  //     // console.log('token存在') // 如果token存在那么每个请求头里面全部加上token
  //     config.headers['Authorization'] = 'bearer ' + store.state.token
  // }
  console.log(config.url, 'node axios 拦截----------------------');
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器 拦截到所有的response，然后先做一些判断
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log('response拦截器开始拦截')
    console.log(res)
    console.log('response拦截器结束拦截(会拦截所有response)')
    if (res.errorCode !== 0) {
      // alert('有一定的错误存在:' + res.message)  //不弹出 将错传给调用出使用
      return Promise.reject(res.message)  //这里的值会传递给我调用接口处的错误返回信息
    } else {
      return response.data
    }
  },error => {
    console.log('err' + error)// for debug
    alert('error')
    return Promise.reject(error)
  })
module.exports = service
