/*!
 * Copyright (c) 2010-2020 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有 (c) 2010-2020 湖南蚁坊软件股份有限公司。保留所有权利。
 */

'use strict';

/**
 * 用户 DTO
 * Created by wuyaoqian on 14-2-28.
 */

const ROLE = require('config').system.role;
const ROLE_REDEFINE = ROLE.ROLE_REDEFINE;
const ROLE_CONSTANT = ROLE.ROLE_CONSTANT;

const User = function () {
  // 用户id
  this.userid = '';
  // 用户名（Email）
  this.username = '';
  // 昵称
  this.nickname = '';
  // 邮箱地址
  this.email = '';
  // 手机或电话号码
  this.phone = '';
  // 用户账号创建时间
  this.createTime = '';
  // 用户账号过期时间
  this.expireTime = '';
  // 是否允许此账号有多个Session, 即:多处登录
  this.mutilogin = false;
  // 头像
  this.head = '';

  // 用户在此应用中的配置信息
  this.appConfig = {};
  // 用户在此应用上所拥有的权限数组
  this.roles = [];
};

/**
 * 角色的权限判断
 * @param userRoles
 * @param checkRoles
 * @param specialChecker
 * @returns {*}
 */
const roleCheck = function (userRoles, checkRoles, specialChecker) {
  if (!userRoles || userRoles.length === 0) {
    return false;
  }
  if (!checkRoles || checkRoles.length === 0) {
    return false;
  }
  if (typeof specialChecker === 'function') {
    return specialChecker(checkRoles);
  }
};

/**
 * 用户（checkUser），是否全部包含指定的角色数组（roles）
 * @param checkUser {object} 用户对象
 * @param roles {array} 指定的角色数据
 */
User.hasRoles = function (checkUser, roles) {
  return roleCheck(checkUser.roles, roles, function (roles) {
    let notContains = false;
    roles.some(function (role) {
      if (!checkUser.roles.includes(role)) {
        return (notContains = true);
      }
    });
    return !notContains;
  });
};

module.exports = User;
