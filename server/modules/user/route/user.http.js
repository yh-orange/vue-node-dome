'use strict';

import actionModule from '../action/user.controller.js';

/**
 * 请求路径 - user
 * Created by wuyaoqian on 14/9/24.
 */

export default {
  module: actionModule,
  routes: [
    {
      'method': 'get',
      'path': '/request',
      'handler': 'request'
    },
    {
      'method': 'post',
      'path': '/get-data-test',
      'handler': 'getDataTest'
    }
  ]
};
