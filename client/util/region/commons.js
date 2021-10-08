/**
 * Copyright (c) 2010-2015 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有(c)2010-2015湖南蚁坊软件有限公司。保留所有权利。
 */
/**
 * Created by zhousiyao on 2017/2/4.
 */

let getRegionTitle = function (location) {
    let name = '全国';
    let region = getRegionByType(location);
    if (region) {
        name = replaceProvinceLabel(region.name);
    }
    return name;
};

/**
 * 以县市省为顺序寻找location（map）中是否有相关数据，如果有则输出其信息外加type。
 * 缺省为全国
 * @param location
 * @returns {string}
 */
let getRegionByType = function (location) {
    let locationTypes = ['district', 'county', 'city', 'province'];
    let region = null;
    if (location) {
        locationTypes.findIndex(type => {
            if (location[type] && location[type].id && location[type].name) {
                region = Object.assign({type}, location[type]);
                return true;
            }
            return false;
        });
    }
    return region;
};

let replaceProvinceLabel = function (label) {
    return label ? label.replace(/(省)|(市)|(壮族自治区)|(回族自治区)|(维吾尔自治区)|(自治区)|(特别行政区)/g, '') : label;
};

module.exports = {
    getRegionTitle,
    getRegionByType,
    replaceProvinceLabel
};
