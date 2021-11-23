exports.get = function (fileName, key) {
  var configJson = {};
  try {//以utf8格式同步读取配置文件信息

    var str = fs.readFileSync(fileName, 'utf8');//将读取后的配置文件内容转化为json对象

    configJson = JSON.parse(str);

  } catch (e) {

    console.debug('JSON parse fail');

  }//返回需要的配置信息的值

  return configJson[key];

};
