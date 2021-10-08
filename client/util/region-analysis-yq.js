/**
 * Created by zhousiyao on 2018/6/12.
 */

import charts from './charts-factory';
// import coordinateUtil from './coordinate-util.js';
import {replaceProvinceLabel} from './region/commons.js';

const NORNAL_FONT_SIZE = 20;

let whiteHotValueColor = ['#fff', '#f7d9a2', '#f7cc7c', '#e08775', '#cc6252', '#bd362a', '#991e12'];
// 0色号：#faf6f0   1-9色号：#f7ddad   10-99色号：#f7cc7c      100-499色号：#e08775    500-999色号：#cc6252       1000-9999色号：#bd362a   >10000色号：#991e12   边线色号:#f0f0f0
// let whiteHotValueColor = ['#faf6f0', '#f7ddad', '#f7cc7c', '#e08775', '#cc6252', '#bd362a', '#991e12'];
let zxHotValueColor = ['#4e080f', '#7f1d26', '#f3f7fd', '#6ed2f4', '#ffc367', '#ff6969'];
let getHotValueColor = function (theme) {
    if (theme === 'zx-white') {
        return zxHotValueColor;
    }
    return whiteHotValueColor;
};

let getLayoutSize = function (mapName, panelWidth, panelHeight) {
    // 中国地图比较扁平，需额外处理
    if (mapName === 'china') {
        const CHINA_SCALE = 1.28;
        let num = panelWidth / panelHeight > CHINA_SCALE ? panelHeight * CHINA_SCALE : panelWidth / CHINA_SCALE;
        return Math.floor(num * 0.2);
    } else if (mapName === 'world') {
        const CHINA_SCALE = 1.28;
        let num = panelWidth / panelHeight > CHINA_SCALE ? panelHeight * CHINA_SCALE : panelWidth / CHINA_SCALE;
        return Math.floor(num * 0.6);
    }
    let width = panelWidth * 0.45;
    let height = panelHeight * 0.45;
    let size = width > height ? height : width;
    return size;
};
let getValue = function (data) {
    let params = data.data;
    if (!params) {
        return null;
    }
    return `${params.locationName}<br />现存确诊：${params.currentDiagnoseNumber === null ? '暂无数据' : params.currentDiagnoseNumber}<br />累计确诊：${params.diagnoseNumber === null ? '暂无数据' : params.diagnoseNumber}<br />死亡：${params.deathNumber === null ? '暂无数据' : params.deathNumber}<br />治愈：${params.cureNumber === null ? '暂无数据' : params.cureNumber}`;
};
let getPeice = function (regionName) {
    let colorArray = getHotValueColor();
    if (regionName === 'world') {
        return [
            {gt: 100000, color: colorArray[6], label: '> 10万'},
            {gt: 49999, lte: 99999, color: colorArray[5], label: '5万 - 99999'},
            {gt: 19999, lte: 49999, color: colorArray[4], label: '2万 - 49999'},
            {gt: 9999, lte: 19999, color: colorArray[3], label: '1万 - 19999'},
            {gt: 999, lte: 9999, color: colorArray[2], label: '1000 - 9999'},
            {gt: 0, lte: 999, color: colorArray[1], label: '1 - 999'},
            {lte: 0, color: colorArray[0], label: '0'}
        ];
    } else if (regionName === 'china') {
        return [
            {
                gt: 500,
                color: colorArray[6],
                label: '> 500'
            },
            {
                gt: 299,
                lte: 499,
                color: colorArray[5],
                label: '300 - 499'
            },
            {
                gt: 199,
                lte: 299,
                color: colorArray[4],
                label: '200 - 299'
            },
            {
                gt: 99,
                lte: 199,
                color: colorArray[3],
                label: '100 - 199'
            },
            {gt: 9, lte: 99, color: colorArray[2], label: '10 - 99'},
            {gt: 0, lte: 9, color: colorArray[1], label: '1 - 9'},
            {lte: 0, color: colorArray[0], label: '0'}
        ];
    } else {
        return [
            {gt: 100, color: colorArray[6], label: '> 100'},
            {gt: 49, lte: 100, color: colorArray[5], label: '50 - 99'},
            {gt: 19, lte: 49, color: colorArray[4], label: '20 - 49'},
            {gt: 9, lte: 19, color: colorArray[3], label: '10 - 19'},
            {gt: 5, lte: 9, color: colorArray[2], label: '5 - 9'},
            {gt: 0, lte: 5, color: colorArray[1], label: '1 - 5'},
            {lte: 0, color: colorArray[0], label: '0'}
        ];
    }
};

let chartOption = function (regionList, mapName, panelWidth, panelHeight, titleText, theme, fontScale = 1) {
    let fontSize = NORNAL_FONT_SIZE * fontScale;
    mapName = mapName === 'all' ? 'china' : mapName;
    let isShowLabel = mapName !== 'world';
    let isChina = mapName === 'china';
    if (regionList) {
        let list = [];
        regionList.forEach(item => {
            list.push({
                name: item.name,
                locationName: item.locationName,
                value: item.currentDiagnoseNumber || 0,
                location: item.location,
                currentDiagnoseNumber: item.currentDiagnoseNumber || 0, // 确诊人数
                diagnoseNumber: item.diagnoseNumber || 0, // 确诊人数
                suspectNumber: item.suspectNumber || 0, // 疑似人数
                severeNumber: item.severeNumber || 0, // 重症人数
                deathNumber: item.deathNumber || 0,
                cureNumber: item.cureNumber || 0
            });
        });
        list.sort((a, b) => {
            return b.value - a.value;
        });
        regionList = list;
    }
    // let minValue = regionList[regionList.length - 1].value;
    // let maxValue = regionList[0].value;
    // let step = Math.ceil((maxValue - minValue) / 4);
    let visualMap = null;
    if (regionList && regionList[0] && regionList[0].value) {
        visualMap = {
            type: 'piecewise',
            min: 0,
            max: 99,
            left: fontSize * 1.1,
            bottom: fontSize * 1.5,
            z: 5,
            pieces: getPeice(mapName),
            itemWidth: fontSize,
            itemHeight: fontSize * 0.7,
            textStyle: {
                fontSize: fontSize * 0.8,
                color: '#89a5f4'
            }
        };
    }
    /***
     * 计算热度top3
     * @type {{data: *, bottom: number, center: *, tooltip: {formatter: string, show: boolean}, mapType: string, zoom: number, right: number, label: {normal: {show: boolean, textStyle: {fontSize: number}}, emphasis: {show: boolean, textStyle: {fontSize: number}}}, type: string, top: number, left: number, z: number, roam: boolean}[]}
     */
    let layoutSize = getLayoutSize(mapName, panelWidth, panelHeight);
    let series = [
        {
            type: 'map',
            mapType: mapName,
            roam: false,
            layoutCenter: ['50%', '50%'],
            layoutSize: layoutSize,
            z: 1,
            tooltip: {
                show: true,
                formatter: function (params) {
                    return getValue(params);
                },
                textStyle: {
                    fontSize: fontSize * 0.9
                }
            },
            label: {
                show: isShowLabel,
                fontSize: NORNAL_FONT_SIZE * fontScale * 0.7,
                formatter: function (data) {
                    if (!data || mapName !== 'china') {
                        return '';
                    }
                    let color = 'a';
                    if (data.data && data.data.value > 999) {
                        color = 'c';
                    }
                    return data && data.name ? `{${color}|${replaceProvinceLabel(data.name)}}` : null;
                },
                rich: {
                    a: {
                        color: '#804540',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: NORNAL_FONT_SIZE * fontScale * 0.7
                        // backgroundColor: 'rgba(255,255,255,0.65)'
                    },
                    b: {
                        color: '#08192F',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: NORNAL_FONT_SIZE * fontScale * 0.7
                    },
                    c: {
                        color: '#faf6f0',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: NORNAL_FONT_SIZE * fontScale * 0.7
                    }
                }
            },
            emphasis: {
                label: {
                    show: isShowLabel,
                    fontSize: NORNAL_FONT_SIZE * fontScale * 0.7,
                    formatter: function (data) {
                        if (!data) {
                            return false;
                        }
                        return data && data.name ? `{a|${replaceProvinceLabel(data.name)}}` : null;
                    },
                    rich: {
                        a: {
                            color: '#faf6f0',
                            fontFamily: 'Microsoft YaHei',
                            fontSize: NORNAL_FONT_SIZE * fontScale * 0.7
                        }
                    }
                }
            },
            itemStyle: {
                areaColor: '#fff',
                borderColor: '#f0f0f0',
                borderWidth: mapName === 'world' ? 0.9 * fontScale : 1.2 * fontScale
            },
            data: regionList,
            // center: center,
            zoom: getZoom(isChina)
        }
    ];
    let options = charts.createOptions('map', regionList, null, {
        geo: {
            map: mapName,
            layoutCenter: ['50%', '50%'],
            layoutSize: layoutSize,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                // borderColor: '#fff'
                borderColor: '#f0f0f0',
                borderWidth: mapName === 'world' ? 0.9 * fontScale : 1.2 * fontScale
            },
            show: true,
            roam: false,
            // center: center,
            zoom: getZoom(isChina)
        },
        animationDurationUpdate: 3 * 1000,
        visualMap,
        series
    });
    return options;
};

function getZoom (isChina) {
    let zoom = 2;
    if (isChina) {
        zoom = 5;
    }
    return zoom;
}

export default chartOption;
