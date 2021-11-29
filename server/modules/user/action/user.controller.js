/**
 * 用户相关 controller
 * Created by yinhu on 21/11/29.
 */
'use strict';

import UserService from '../service/user.rest.js';

const getDataTest = function (req, res) {
  UserService.getDataTestServer.then(data => {
    if (data) {
      req.send({
        success: true,
        data: data
      });
    } else {
      req.send({
        success: false,
        data: null
      });
    }
  }).catch(error => {
    req.send({
      code: error.code,
      message: error.message
    });
  });
};

const request = function (req, res) {
  UserService.requestServer.then(data => {
    if (data) {
      req.send({
        success: true,
        data: data
      });
    } else {
      req.send({
        success: false,
        data: null
      });
    }
  }).catch(error => {
    req.send({
      code: error.code,
      message: error.message
    });
  });
};

export default {
  getDataTest,
  request
};
