/**
 * Copyright (c) 2010-2015 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有(c)2010-2015湖南蚁坊软件有限公司。保留所有权利。
 */

'use strict';

/**
 * Created by yinhu on 2021/03/18.
 */
let fs = require('fs');

function file () {
}

/***
 * 读取json文件
 * @returns {*}
 * @param path 文件地址
 */
const readText = function (path) {
    let bin = fs.readFileSync(path);

    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }

    return bin.toString('utf-8');
};
/***
 * 读取json文件
 * @returns {*}
 * @param path 文件地址
 */
file.readText = function (path) {
    let bin = fs.readFileSync(path);

    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }

    return bin.toString('utf-8');
};
// console.log(file.readText('./test.json'), '=========================');
/***
 * 往后写入json文件
 * @returns {*}
 * @param path 文件地址
 * @param jsonData
 * 为什么呢,因为记事本这个编辑工具在手动保存时会自动把数据做一些处理,
 * 导致数据看起来是对的,但是却无法解析,因为数据里面搀杂着不会显示的unicode字符,
 * utf-8分有dom版和无dom版，一般编辑器不刻意设置会默认保存为带dom的utf8,
 * 解决办法是先将读到的文件转成二进制，然后检索dom符号删除,以下是方法:
 */
file.writeJson = function (path, jsonData) {
    // 现将json文件读出来
    fs.readFile(path, function (err, data) {
        if (err) {
            return console.error(err);
        }
        let person = data.toString();// 将二进制的数据转换为字符串
        try {
            person = JSON.parse(person);// 将字符串转换为json对象
        } catch (e) {
            person = JSON.parse(readText(path));
        }
        person.data.push(jsonData);// 将传来的对象push进数组对象中
        console.log(person.data);
        person.total = person.data.length;
        let str = JSON.stringify(person);// 因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile(path, str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('----------新增成功-------------');
        });
    });
};
// writeJson(params);// 执行一下;
/***
 * 根据删除json文件文件中的某项数据
 * @returns {*}
 * @param path 文件地址
 * @param deleteId 删除项ID
 * @param propertyName 删除项字段
 * @param delCallback  删除项回调 如果有就不使用内部的删除功能 回到文件内容
 */
file.deleteJson = function (path, deleteId, propertyName, delCallback) {
    fs.readFile(path, function (err, data) {
        if (err) {
            return console.error(err);
        }
        let person = data.toString();// 将二进制的数据转换为字符串
        try {
            person = JSON.parse(person);// 将字符串转换为json对象
        } catch (e) {
            person = JSON.parse(readText(path));
        }
        if (delCallback) {
            person = delCallback(person);
        } else {
            // 把数据读出来根据某项进行删除
            person = person.filter(delData => {
                if (delData.propertyName === deleteId) {
                    return null;
                }
            });
        }
        console.log(person.data);
        person.total = person.data.length;
        let str = JSON.stringify(person);
        // 然后再把数据写进去
        fs.writeFile(path, str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('----------删除成功------------');
        });
    });
};
/***
 * 修改json数据中某项
 * @returns {*}
 * @param path 文件地址
 * @param changeId 修除项ID
 * @param changeData 修改后的数据
 * @param delCallback  删除项回调 如果有就不使用内部的删除功能 回到文件内容
 */
file.changeJson = function (path, changeId, changeData, delCallback) {
    fs.readFile('./mock/person.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        let person = data.toString();// 将二进制的数据转换为字符串
        try {
            person = JSON.parse(person);// 将字符串转换为json对象
        } catch (e) {
            person = JSON.parse(readText(path));
        }
        if (delCallback) {
            person = delCallback(person);
        } else {
            // 把数据读出来根据某项进行删除
            person = person.filter(delData => {
                if (delData.propertyName === changeId) {
                    return changeData;
                }
            });
        }
        person.total = person.data.length;
        let str = JSON.stringify(person);
        // console.log(str);
        fs.writeFile(path, str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('--------------------修改成功');
            console.log(person.data);
        });
    });
};
// changeJson(3, params);// 执行一下;

// 通过传回来的页数，进行分页模拟
/***
 * 修改json数据中某项
 * @returns {*}
 * @param path 文件地址
 * @param startPage 页码数
 * @param pageSize 每页条数
 */
file.pagination = function (path, startPage, pageSize) {
    // startPage为页数，比如第一页传0，第二页传1, pageSize为每页多少条数据
    fs.readFile(path, function (err, data) {
        if (err) {
            return console.error(err);
        }
        let person = data.toString();// 将二进制的数据转换为字符串
        try {
            person = JSON.parse(person);// 将字符串转换为json对象
        } catch (e) {
            person = JSON.parse(readText(path));
        }
        let pagePerson = person.data.slice(startPage * pageSize, (startPage + 1) * pageSize);
        console.log('------------------------查询成功pagePerson');
        console.log(pagePerson);
    });
};
export default {
    file
};
