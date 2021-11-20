// var mysql = require('mysql');var con =mysql.createConnection({undefined
//
//   host:'localhost',　　//mysql服务器，本地为localhost
//
//   user:'admin',　　//连接mysql的用户名
//
//   password:'123456',　　//连接mysql的密码
//
// });//判断是否成功链接
//
// connection.connect(function(err){undefined
//
//   console.log('connection success');
//
// });//关闭数据库连接
//
// connection.end(function(err){undefined
//
//   console.log('connection close');
//
// });
//
// // 2.数据库连接
// //
// // 首先建立一个Node.js的MySQL操作基类BaseModel，其中包含数据库连接、插入、修改、删除、条件获取数据列表和数据转义等操作方法。
// //
// // 创建一个js文件，命名为basemodel.js。
//
// module.exports = function(){//数据查询接口
//
//   this.findOneById = function(tableName,id,callback){};//数据插入接口
//
//   this.insert = function(tableName,rowInfo,acllback){};//数据修改接口
//
//   this.modify = function(tableName,id,rowInfo,callback){};//数据删除接口
//
//   this.remove = function(table,id,callback){};//数据条件查询接口
//
//   this.find = function(tableName,whereJson,orderByJson,limitArr,fieldsArr,callback){};function__constructor(){};
//
// };
//
// 再创建一个名为util.js工具类用于存放一些公有方法，包含json配置文件解析的方法。
//
// var fs = require('fs'),
//
//   util= require('util');
//
// exports.get= function(fileName,key){var configJson ={};try{//以utf8格式同步读取配置文件信息
//
//   var str = fs.readFileSync(fileName,'utf8');//将读取后的配置文件内容转化为json对象
//
//   configJson =JSON.parse(str);
//
// }catch(e){undefined
//
//   sys.debug('JSON parse fail');
//
// }//返回需要的配置信息的值
//
//   returnconfigJson[key];
//
// };
//
// // 创建一个名为config.json的配置文件，存放数据库配置信息。
//
// {"db":{"host":"localhost","port":"3306","user":"root","password":"password","dbName":"dbname"}
//
// }
//
// // 然后在创建的项目文件中进行操作，例如在app.js中，先声明变量Util和dbClient。
//
// var Util = require('./util'),//引入util.js工具类
//
//   mysql = require('mysql'),//获取mysql模块对象
//
//   dbClient;//全局的mysql连接句柄
//
// // 实例化BaseModel对象。
//
// var BaseModel = require('./base_model');//引入base_model基类
//
// var baseModel = new BaseModel();//实例化baseModel对象
//
// // 应用util工具类模块，实现BaseModel的构造函数。
//
// function__constructor(){//读取config.json配置文件，并获取其中db的配置信息
//
//   var dbConfig = Util.get('config.json','db');
//
//   client= {};//获取mysql的配置信息
//
//   client.host = dbConfig['host'];//读取配置文件中mysql的host值
//
//   client.port = dbConfig['port'];//读取配置文件中mysql的port值
//
//   client.user = dbConfig['user'];//读取配置文件中mysql的数据库用户名
//
//   client.password = dbConfig['password'];//读取配置文件中mysql的数据库密码
//
// //创建mysql连接
//
//   dbClient = mysql.createConnection(client);//创建mysql连接对象
//
//   dbClient.connect();//连接mysql服务器
//
// //连接mysql服务器指定的数据库
//
//   dbClient.query('USE ' + dbConfig['dbName'],function(error,results){if(error){undefined
//
//     console.log('ClientConnectionReady Error: ' +error.message);
//
//     dbClient.end();
//
//   }
//
//     console.log('connection local mysql success');
//
//   });
//
// }
//
// __constructor();
