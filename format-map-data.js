/**
 * Copyright (c) 2010-2015 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有(c)2010-2015湖南蚁坊软件有限公司。保留所有权利。
 */

'use strict';

import allLocation from './server/modules/region/util/all-location';

/**
 * Created by yinhu on 2021/03/16.
 */
const fs = require('fs');
const path = require('path');

let dirProvince = 'static/map/cn/province';
let errorData = [];
const province = fs.readdirSync(dirProvince);
province.forEach(fileName => {
    let doc = fs.readFileSync(path.join(dirProvince, fileName), 'utf-8');
    JSON.parse(doc).features.forEach(code => {
        if (!allLocation[code.id] || allLocation[code.id] !== code.properties.name) {
            errorData.push({
                fileName: path.join(dirProvince, fileName),
                code: code.id,
                locationName: code.properties.name
            });
            // console.log(code.id, code.properties.name, path.join(dirDistrict, fileName));
        }
    });
});
fs.writeFileSync('./test.json', `${JSON.stringify(errorData)}`);
const readText = function (pathname) {
    let bin = fs.readFileSync(pathname);
    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }

    return bin.toString('utf-8');
};
let dirCity = 'static/map/cn/city';
let errorData2 = [];
let city = fs.readdirSync(dirCity);
city.forEach(fileName => {
    // console.log(fileName, path.join(dirCity, fileName));
    // let data = fs.readFileSync(path.join(dirCity, fileName), 'utf-8');
    let data = readText(path.join(dirCity, fileName));
    // console.log(typeof (data));
    let locationNameList = [];
    try {
        data = JSON.parse(data);
    } catch (e) {
        return;
    }
    let prefixCode = fileName.slice(0, 4);
    Object.keys(allLocation).filter(code => {
        if (code.slice(0, 4) === prefixCode) {
            locationNameList.push(allLocation[code]);
        }
    });
    data.features.forEach(item => {
        // console.log(item.properties && item.properties.name, locationNameList);
        let hasData = item.properties && item.properties.name && locationNameList.length > 0;
        if (hasData && !locationNameList.find(name => name === item.properties.name)) {
            errorData2.push({
                fileName: path.join(dirCity, fileName),
                errorLocationName: locationNameList,
                locationName: item.properties.name
            });
        }
    });
});
// console.log(errorData2);
// fs.writeFileSync('./test02.json', `${JSON.stringify(errorData2)}`);
fs.writeFileSync('./test.json', `${JSON.stringify(errorData)}`);
fs.writeFileSync('./test2.json', `${JSON.stringify(errorData2)}`);
