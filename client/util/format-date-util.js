/**
 * Copyright (c) 2010-2015 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有(c)2010-2015湖南蚁坊软件有限公司。保留所有权利。
 */
/**
 * Created by zhousiyao on 2019/1/24.
 */

import './date-pattern';

/**
 * 获取当前时间戳
 */
let getCurrentTime = function () {
    return new Date().getTime();
};

let todayDescription = '今天';
let yesterdayDescription = '昨天';

/**
 * 日期转换
 * @param date 日期
 * @param format 格式
 * @param isConvertToday 是否转换今天 true：转换今天昨天；false、null、undefined：不转换今天昨天值
 * @returns {*}
 * @private
 */
let formatDate2TodayStr = function (date, format, isConvertToday) {
    let returnDate;
    let formatDateStr = new Date(date).pattern(format);
    if (!isConvertToday) {
        returnDate = formatDateStr;
    } else {
        let dateArray = formatDateStr.split(' ');
        let lastStr = dateArray[1] || '';
        let now = new Date(getCurrentTime());
        let todayStr = new Date(now).pattern('yyyy-MM-dd');
        let yesterdayStr = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).pattern('yyyy-MM-dd');
        if (todayStr === dateArray[0]) {
            returnDate = todayDescription + ' ' + lastStr;
        } else if (yesterdayStr === dateArray[0]) {
            returnDate = yesterdayDescription + ' ' + lastStr;
        } else {
            returnDate = formatDateStr;
        }
    }
    return returnDate;
};

/**
 * 允许外部设置todayDescription和yesterdayDescription
 * @param newTodayDescription
 * @param newYesterdayDescription
 */
let setDescription = function (newTodayDescription, newYesterdayDescription) {
    if (newTodayDescription) todayDescription = newTodayDescription;
    if (newYesterdayDescription) todayDescription = newYesterdayDescription;
};

/**
 * 折线图额外配置，提供外部调用。
 * 针对x轴为时间轴提供优化。优化为：对于series中数据时间长度大于7天时。
 * 将时间轴转为类目轴，并提供简易的坐标轴控制。
 * @param options
 * @param showMinLabel
 * @param showMaxLabel
 * @returns {*}
 */
let getCategoryLineOptions = function (options, showMinLabel, showMaxLabel) {
    if (!options || !options.series || !options.xAxis || !options.xAxis[0] || options.xAxis[0].type !== 'time') {
        return options;
    }

    let firstSeriesData = options.series[0] ? options.series[0].data : null;
    if (!firstSeriesData || !firstSeriesData.length) {
        return options;
    }

    let lastTime = firstSeriesData[firstSeriesData.length - 1][0];
    let firstTime = firstSeriesData[0][0];
    let timeInterval = lastTime - firstTime;
    let num = Math.ceil(timeInterval / ONE_DAY_TIME / 7);

    if (num > 1) {
        let timeLine = [];
        let interval = num * ONE_DAY_TIME;
        let firstDate = new Date(firstTime);
        let initTime = 0;
        if (firstDate.getHours() === 0 && firstDate.getMinutes() === 0 && firstDate.getSeconds() === 0) {
            initTime = firstTime - interval;
        } else {
            if (showMinLabel) {
                initTime = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 1, 0, 0, 0).getTime();
            } else {
                initTime = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 1, 0, 0, 0).getTime() - interval;
            }
        }
        let tickCacheTime = initTime;
        let labelCacheTime = initTime;
        firstSeriesData.forEach(item => {
            timeLine.push({
                value: item[0] + ''
            });
        });

        if (!options.xAxis[0].axisTick) {
            options.xAxis[0].axisTick = {};
        }
        options.xAxis[0].type = 'category';
        options.xAxis[0].boundaryGap = true;
        options.xAxis[0].axisTick.alignWithLabel = true;
        options.xAxis[0].axisTick.interval = function (index, value) {
            let time = parseInt(value);
            if (index === 0) {
                tickCacheTime = initTime;
            }
            if (time === tickCacheTime + interval) {
                tickCacheTime += interval;
                return true;
            }
            return index === 0 || index === (timeLine.length - 1);
        };
        options.xAxis[0].axisLabel.interval = function (index, value) {
            let time = parseInt(value);
            if (index === 0) {
                labelCacheTime = initTime;
            }
            if (time === labelCacheTime + interval) {
                if (showMaxLabel && lastTime - time <= interval / 2) {
                    return false;
                }
                labelCacheTime += interval;
                return true;
            }
            return index === 0 || index === (timeLine.length - 1);
        };

        options.xAxis[0].data = timeLine;
        options.series = options.series.map(seriesItem => {
            if (seriesItem.data) {
                seriesItem.data = seriesItem.data.map(item => {
                    item[0] = item[0] + '';
                    return item;
                });
            }
            return seriesItem;
        });

        firstDate = null;
    }
    return options;
};
export default {
    formatDate2TodayStr,
    setDescription,
    getCategoryLineOptions
};
