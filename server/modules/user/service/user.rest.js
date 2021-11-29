/**
 * 用户相关基本服务
 * Created by yinhu on 21/11/29.
 */
'use strict';


let service = require("../../../http/http-server");

const getDataTestServer = function (req, res) {
  return service({
    url: req.url,
    method: 'get'
  });
};

const requestServer = function (req, res) {
  return service({
    url: req.url,
    method: 'post',
    data: req.body
  });

};

export default {
  getDataTestServer,
  requestServer
};
