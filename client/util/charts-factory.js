/**
 * Copyright (c) 2010-2015 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有(c)2010-2015湖南蚁坊软件有限公司。保留所有权利。
 */

/**
 * echarts工厂
 * Created by liaozhidan on 16/5/26.
 */

import _ from 'lodash';
// import commons from '../util/data/commons.js';

const ONE_DAY_TIME = 60 * 60 * 24 * 1000;

/**
 * 通用配置
 * @type {{tooltip: {trigger: string, formatter: string}, toolbox: {show: boolean, feature: {mark: boolean, dataView: {show: boolean, readOnly: boolean}, restore: {show: boolean}, saveAsImage: {show: boolean}}}, grid: {left: string, right: string, bottom: string, containLabel: boolean}}}
 */
let chartCommonOption = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        confine: true
    },
    toolbox: {
        show: false
    },
    grid: {
        left: '2%',
        right: '2%',
        bottom: '2%',
        containLabel: true
    }
};

/**
 * echarts options配置
 * @type {{pie: Function, line: Function, map: Function, scatter: Function, bar: Function}}
 */
let chartOption = {
    normal: function (data, name, options) {
        let defaultOptions = {};
        return _.merge({}, chartCommonOption, defaultOptions, options);
    },
    map: function (data, name, options) {
        let defaultOptions = {
            title: {
                // text: name,
                subtext: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            }
        };
        return _.merge({}, chartCommonOption, defaultOptions, options);
    },
    bar: function (data, name, options) {
        return _.merge({}, chartCommonOption, options);
    }
};

let charts = {
    /**
     * 创建echart 配置信息（options）
     * @param type    echart类型
     * @param data    数据
     * @param name    名称
     * @param options 扩展配置
     * @returns {*}   配置信息
     */
    createOptions: function (type, data, name, options) {
        return chartOption[type](data, name, options);
    },

    pieColors: [
        '#1694ee',
        '#ed7079',
        '#2ec5da',
        '#ed9542',
        '#19b57c',
        '#e1b620'
    ],
    maxDescriptionLength: 10,
    fontFamily: 'SimHei, Helvetica-Neue, Helvetica, Hiragino Sans GB, Arial, sans-serif',

    getDefaultGraphic: function (text, panelWidth, panelHeight, textColor, itemWidth = 100, itemHeight = 20) {
        return {
            graphic: [
                {
                    type: 'text',
                    left: (panelWidth - itemWidth) / 2,
                    top: (panelHeight - itemHeight) / 2,
                    width: itemWidth,
                    height: itemHeight,
                    style: {
                        text: text,
                        font: '0.8em ' + this.fontFamily,
                        fill: textColor || '#ffffff'
                    }
                }
            ],
            series: []
        };
    },

    verticalPosition: function (pos, params, dom, rect, size) {
        let yPadding = 10;
        let top = pos[1] - (yPadding + size.contentSize[1]);
        if (top < 0) {
            top = pos[1] + (yPadding * 2);
        }
        return {
            left: pos[0] - (size.contentSize[0] / 2),
            top
        };
    },

    /**
     * 折线图额外配置，提供外部调用。
     * 针对x轴为时间轴提供优化。优化为：对于series中数据时间长度大于7天时。
     * 将时间轴转为类目轴，并提供简易的坐标轴控制。
     * @param options
     * @returns {*}
     */
    getCategoryLineOptions (options) {
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
                initTime =
                    new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 1, 0, 0, 0).getTime() - interval;
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
    }
};

module.exports = charts;
