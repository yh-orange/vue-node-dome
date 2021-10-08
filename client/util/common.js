
function Common () {

}

// 获取浏览器Cookie的值
Common.getCookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();

// 颜色RGB转十六进制
Common.rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

/***
 * 复制到剪贴板
 * 借助navigator.clipboard.writeText可以很容易的讲文本复制到剪贴板
 * 规范要求在写入剪贴板之前使用 Permissions API 获取“剪贴板写入”权限。但是，不同浏览器的具体要求不同，因为这是一个新的API。有关详细信息，请查看compatibility table and Clipboard availability in Clipboard。
 * */ 

 Common.copyToClipboard = (text) => navigator.clipboard.writeText(text);

 /***
  * 获取用户选择的文本
  * 使用内置的getSelection 属性获取用户选择的文本。
  * */ 
 
 Common.getSelectedText = () => window.getSelection().toString();
 
/**
 * 检查日期是否合法
 * 使用以下代码段检查给定日期是否有效。
 */

Common.isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

/**
 * 查找日期位于一年中的第几天
 */
Common.dayOfYear = (date) =>
Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

/**
 * 英文字符串首字母大写
 */
Common.capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * 计算2个日期之间相差多少天
 */
Common.dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000));

/**
 * 清除全部Cookie
 * 通过使用document.cookie访问cookie并将其清除，可以轻松清除网页中存储的所有cookie。
 */

Common.clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));

/**
 * 生成随机十六进制颜色
 * 可以使用 Math.random 和 padEnd 属性生成随机的十六进制颜色。
 */

Common.randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;

/**
 * 数组去重(简单数组去重和复杂数组去重)
 * 简单数组去重：可以使用 JavaScript 中的Set轻松删除重复项
 * 复杂数组去重：可以使用 reduce 进行数据对比进行去重处理
 */
 Common.removalImpleArray = (arr) => [...new Set(arr)];

 Common.removalComplexArray = (arr, key) => arr.reduce((cur,next) => {
  obj[next[key]] ? "" : obj[next[key]] = true && cur.push(next);
  return cur;
},[]); //设置cur默认类型为数组，并且初始值为空的数组 详细介绍可以去看reduce的函数方法介绍

/**
 * 从 URL 获取查询参数
 * window.location 或原始 URL goole.com?search=easy&page=3 轻松地从 url 检索查询参数
 * 
 * 另外的方法直接使用es6的方法进行转换
 */

Common.getParameters = (URL) => {
  URL = JSON.parse(
    '{"' +
      decodeURI(URL.split("?")[1])
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
  return JSON.stringify(URL);
};
// Object.fromEntries(new URLSearchParams(window.location.search))

/**
 * 求数字的平均值
 * 使用reduce方法找到多个数字之间的平均值。
 */

Common.average = (...args) => args.reduce((a, b) => a + b) / args.length;

/**
 * 滚动任意位置 默认置顶
 * 可以使用 window.scrollTo(0, 0) 方法自动滚动到顶部。将 x 和 y 都设置为 0。
 */
Common.goToTop = (x = 0, y = 0) => window.scrollTo(x, y);

/**
 * 校验数组是否为空
 * 一行代码检查数组是否为空,将返回true或false
 */
Common.isEmptyArray = arr => Array.isArray(arr) && arr.length > 0;