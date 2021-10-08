/**
 * Created by zhousiyao on 2018/6/12.
 */

import charts from './charts-factory';
import coordinateUtil from './coordinate-util.js';
import echarts from 'echarts/lib/echarts';
// import allLocation from '../../../server/modules/region/util/all-location';

echarts.registerMap('china-contour', require('./json/china-contour.json'));

const DEFAULT_PANEL_WIDTH = 700;
const CHINA_MAP_SCALE = 0.75;
const DEFAULT_MAP_SCALE = 0.9;
const DEFAULT_FONT_SIZE = 20;
// const DEFAULT_SCATTER_SIZE = 7;
// const VISUAL_MAP_HEIGHT = 70;
// const VISUAL_MAP_WIDTH = 20;
let whiteHotValueColor = ['#031938', '#01497a', '#ea9c47', '#e24b4b'];
let zxHotValueColor = ['#f3f7fd', '#6ed2f4', '#ffc367', '#ff6969'];
let veryNarrowList = ['ningxia', '640000', 'shanxi1', '610000', 'shanxi', '140000'];
let narrowerList = ['hebei', 'aomen'];
let largeList = ['shandong', '810000', 'xizang', '370000', 'xinjiang', '650000', 'xianggang', '440313', 'guangming', '540000'];
// let nameless = {
//     'tianjin': ['河东区', '河北区', '河西区', '红桥区', '南开区', '和平区'],
//     'chongqing': ['九龙坡区', '大渡口区', '渝中区', '南岸区', '江北区', '沙坪坝区']
// };
let getHotValueColor = function (theme) {
    if (theme === 'zx-white') {
        return zxHotValueColor;
    }
    return whiteHotValueColor;
};
let getThemeGraphic = function (theme) {
    if (theme === 'zx-white') {
        return {
            fill: '#ededed',
            fontColor: '#666666'
        };
    }
    return {
        fill: '#56d2fc',
        fontColor: '#ffffff'
    };
};

let chartOption = function (regionList, scatterList, mapName, panelWidth, panelHeight, center, isShowHotSpot, titleText, isAbsoluteHeat = false, theme) {
    mapName = mapName === 'all' ? 'china' : mapName;
    let isChina = mapName === 'china';
    let mapScale = isChina ? CHINA_MAP_SCALE : DEFAULT_MAP_SCALE;
    let newHeight = panelWidth * mapScale;
    let newWidth = panelWidth;
    if (newHeight > panelHeight) {
        newWidth = panelHeight / mapScale;
        newHeight = panelHeight;
    }
    let scale = newHeight / DEFAULT_PANEL_WIDTH;
    let marginTop = (panelHeight - newHeight) / 2;
    let marginLeft = (panelWidth - newWidth) / 2;

    if (isAbsoluteHeat) {
        let list = [];
        regionList.forEach(item => {
            list.push({
                name: item.name,
                value: Math.floor(item.absoluteScore),
                location: item.location
            });
        });
        list.sort((a, b) => {
            return b.value - a.value;
        });
        regionList = list;
    }

    let MAXMIN = {
        max: (regionList && regionList[0].value) || 0,
        min: (regionList && regionList[regionList.length - 1].value) || 0,
        range: (regionList && regionList[0].value) - (regionList && regionList[regionList.length - 1].value)
    };

    let scatterData = [];
    let fontSize = Math.round(DEFAULT_FONT_SIZE * scale);
    // let scatterSize = Math.round(DEFAULT_SCATTER_SIZE * scale);
    if (scatterList) {
        scatterList.forEach(item => {
            let coord = coordinateUtil.getCoordinateData(item.regionName);
            if (coord) {
                scatterData.push({
                    name: item.regionName,
                    value: coord
                });
            }
        });
    }

    // 确定地图大小
    let left = marginLeft + 10;
    let right = marginLeft + 10;
    let top = marginTop + 20;
    let bottom = marginTop + 10;
    let correction = 60 * scale;
    // 省份地图显示区域补正
    if (narrowerList.some(item => item === mapName)) {
        left += 2 * correction;
        right += 2 * correction;
    } else if (veryNarrowList.some(item => item === mapName)) {
        left = '20%';
        right = '20%';
    } else if (largeList.some(item => item === mapName)) {
        top += correction;
        bottom += correction;
    } else if (mapName === 'tianjin') {
        left = '25%';
        right = '25%';
    } else if (mapName === 'america') {
        top = '10%';
        bottom = '10%';
    }

    let visualMap = null;
    let colorArray = getHotValueColor(theme);
    if (regionList && regionList[0] && regionList[0].value) {
        visualMap = {
            type: 'piecewise',
            min: 0,
            max: 99,
            text: ['高', '低'],
            // realtime: false,
            z: 5,
            pieces: [
                {gt: 89, color: colorArray[3]},
                {gt: 79, lte: 89, color: colorArray[2]},
                {gt: 69, lte: 79, color: colorArray[1]},
                {lt: 69, color: colorArray[0]}
            ],
            // seriesIndex: 0,
            calculable: false,
            // show: !isShowHotSpot,
            textStyle: {
                fontSize: fontSize
            }
        };
    }
    /***
     * 计算热度top3
     * @type {{data: *, bottom: number, center: *, tooltip: {formatter: string, show: boolean}, mapType: string, zoom: number, right: number, label: {normal: {show: boolean, textStyle: {fontSize: number}}, emphasis: {show: boolean, textStyle: {fontSize: number}}}, type: string, top: number, left: number, z: number, roam: boolean}[]}
     */
    let max = 4;
    let graphic = null;
    if (regionList) {
        let top3List = regionList.slice(0, 3) || regionList.slice(0, regionList.length);
        graphic = getGraphic(top3List, MAXMIN, mapName, theme, max, titleText);
    }
    right = right - 1 ? right + 90 : right;
    let series = [
        {
            type: 'map',
            mapType: isShowHotSpot ? 'splice_map' : mapName,
            roam: false,
            top: top,
            left: left,
            right: right,
            bottom: bottom,
            z: 1,
            tooltip: {
                show: true,
                formatter: '{b}'
            },
            label: {
                normal: {
                    show: false,
                    textStyle: {
                        fontSize: fontSize
                    }
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: fontSize
                    }
                }
            },
            data: regionList,
            center: center,
            zoom: getZoom(isChina, isShowHotSpot)
        }
        // 暂时取消地图上红点的显示
        // {
        //     type: 'scatter',
        //     coordinateSystem: 'geo',
        //     data: scatterData,
        //     symbolSize: scatterSize,
        //     hoverAnimation: false,
        //     label: {
        //         normal: {
        //             show: false
        //         }
        //     },
        //     tooltip: {
        //         show: false
        //     },
        //     z: 3
        // }
    ];
    let options = charts.createOptions('map', regionList, null, {
        geo: {
            map: isChina ? 'china-contour' : (isShowHotSpot ? 'splice_map' : mapName),
            top: top,
            left: left,
            right: right,
            bottom: bottom,
            label: {
                emphasis: {
                    show: false
                }
            },
            show: true,
            roam: false,
            center: center,
            zoom: getZoom(isChina, isShowHotSpot)
        },
        animationDurationUpdate: 3 * 1000,
        visualMap,
        graphic: graphic,
        series
    });

    return options;
};

let checkName = function (name) {
    if (!name || typeof name !== 'string') {
        return '';
    }
    let maxLength = 4;
    if (name.length > maxLength) {
        name = name.slice(0, maxLength) + '...';
    }
    return name;
};
let getGraphic = function (top3List, range, mapName, theme, max, titleText, isAbsoluteHeat = false) {
    if (!top3List || top3List.length === 0) {
        return null;
    }
    let themeColor = getThemeGraphic(theme);
    let titleHeight = 0;
    let subTitleHeight = 40;
    let subTitle = [];

    let title = [];
    let fontSize = 20;
    if (titleText) {
        title.push({
            type: 'text',
            top: 0,
            height: titleHeight,
            style: {
                text: titleText,
                fill: themeColor.fontColor,
                fontSize: 20
            },
            silent: true,
            cursor: 'default'
        });
        titleHeight = 50;
    }
    let colorArray = getHotValueColor(theme);
    top3List.forEach((subTitleData, i) => {
        let top = titleHeight + subTitleHeight * i;
        let rank = subTitleData.value > 69 ? Math.ceil((subTitleData.value - 69) / 10) : 0; // 计算rank值
        subTitle.push({
            type: 'group',
            width: 150,
            height: subTitleHeight,
            top,
            children: [
                {
                    type: 'rect',
                    left: 0,
                    top: 'center',
                    shape: {
                        width: 24,
                        height: 24
                    },
                    style: {
                        fill: colorArray[rank]
                    }
                },
                {
                    type: 'text',
                    left: 6,
                    top: 'center',
                    style: {
                        text: i + 1,
                        font: fontSize,
                        fill: themeColor.fontColor
                    }
                },
                {
                    type: 'text',
                    left: 40,
                    top: 'center',
                    style: {
                        text: checkName(subTitleData.name),
                        fill: themeColor.fontColor,
                        textAlign: 'left',
                        font: fontSize
                    }
                }
                // {
                //     type: 'text',
                //     right: 0,
                //     top: 'center',
                //     style: {
                //         text: Math.floor(isAbsoluteHeat ? subTitleData.absoluteScore : subTitleData.relativelyScore),
                //         fill: themeColor.fontColor,
                //         textAlign: 'right',
                //         font: fontSize
                //     }
                // }
            ]
        });
    });
    return Object.assign({
        type: 'group',
        right: 0, // 定位到右下角
        bottom: 'center', // 定位到右下角
        // position: [100, 200],
        z: 200,
        draggable: false,
        children: title.concat(subTitle)
    });
};// let veryNarrowList = ['宁夏', '陕西', '山西'];
// let narrowerList = ['安徽', '河北'];
// let wideList = ['山东', '西藏'];

function getZoom (isChina, isShowHotSpot, mapName) {
    if (!isShowHotSpot) {
        return 1;
    }
    let zoom = 2;
    if (isChina) {
        zoom = 5;
    }
    return zoom;
}

export default chartOption;
