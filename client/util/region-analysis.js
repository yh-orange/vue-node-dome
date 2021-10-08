/**
 * Created by zhousiyao on 2018/6/12.
 */

import charts from './charts-factory';
import coordinateUtil from './coordinate-util.js';

const NORNAL_FONT_SIZE = 20;

// let whiteHotValueColor = ['#031938', '#01497a', '#ea9c47', '#e24b4b'];
let whiteHotValueColor = ['#032A56', '#01497a', '#0b71af', '#ea9c47', '#e24b4b'];
let zxHotValueColor = ['#f3f7fd', '#6ed2f4', '#ffc367', '#ff6969'];
// let veryFlat = ['430100', '620000', '540000', '370000', '710000', '220000'];
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

let getLayoutSize = function (mapName, WHscale, panelWidth, panelHeight) {
    // 中国地图比较扁平，需额外处理
    if (mapName === 'china') {
        const CHINA_SCALE = 1.28;
        let num = panelWidth / panelHeight > CHINA_SCALE ? panelHeight * CHINA_SCALE : panelWidth / CHINA_SCALE;
        return Math.floor(num * 0.9);
    }
    let width = panelWidth * 0.85;
    let height = panelHeight * 0.9;
    return width > height ? height : width;
};

let chartOption = function (orgRegionList, scatterList, mapName, panelWidth, panelHeight, center, isShowHotSpot, titleText, isAbsoluteHeat = false, theme, WHscale, fontScale = 1) {
    let regionList = orgRegionList || [];
    let fontSize = NORNAL_FONT_SIZE * fontScale;
    mapName = mapName === 'all' ? 'china' : mapName;
    let isChina = mapName === 'china';
    let mineColor = getHotValueColor(theme);
    if (regionList.length) {
        let list = [];
        regionList.forEach(item => {
            list.push({
                name: item.name,
                value: isAbsoluteHeat ? Math.floor(item.absRank) : item.rank,
                location: item.location,
                emphasis: {
                    itemStyle: {
                        areaColor: mineColor[isAbsoluteHeat ? Math.floor(item.absRank) : item.rank],
                        borderColor: 'rgba(249,251,213,0.6)',
                        borderWidth: 3,
                        shadowColor: '#fdffd8',
                        shadowBlur: 24
                    }
                }
            });
        });
        list.sort((a, b) => {
            return b.value - a.value;
        });
        regionList = list;
    }
    let scatterData = [];
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
    let visualMap = null;
    let colorArray = getHotValueColor(theme);
    if (regionList && regionList[0] && regionList[0].value) {
        visualMap = {
            type: 'piecewise',
            min: 0,
            max: 99,
            left: fontSize * 1.5,
            bottom: fontSize * 1.5,
            text: ['高', '低'],
            // realtime: false,
            z: 5,
            pieces: [
                {gt: 3, lte: 4, color: colorArray[4]},
                {gt: 2, lte: 3, color: colorArray[3]},
                {gt: 1, lte: 2, color: colorArray[2]},
                {gt: 0, lte: 1, color: colorArray[1]},
                {gt: -1, lte: 0, color: colorArray[0]}
            ],
            // seriesIndex: 0,
            calculable: false,
            itemWidth: fontSize,
            itemHeight: fontSize * 0.7,
            // show: !isShowHotSpot,
            textStyle: {
                fontSize: fontSize * 0.9,
                color: '#89a5f4'
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
        let top3List = regionList.length > 2 ? regionList.slice(0, 3) : regionList.slice(0, regionList.length);
        graphic = getGraphic(top3List, mapName, theme, max, titleText, isAbsoluteHeat, fontScale);
    }
    let layoutSize = getLayoutSize(mapName, WHscale, panelWidth, panelHeight);
    let series = [
        {
            type: 'map',
            mapType: isShowHotSpot ? 'splice_map' : mapName,
            roam: false,
            layoutCenter: ['42%', '50%'],
            layoutSize: layoutSize,
            z: 1,
            tooltip: {
                show: true,
                formatter: '{b}',
                textStyle: {
                    fontSize: fontSize
                }
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
            // center: center,
            zoom: getZoom(isChina, isShowHotSpot)
        }
    ];
    let options = charts.createOptions('map', regionList, null, {
        geo: {
            map: mapName,
            layoutCenter: ['42%', '50%'],
            layoutSize: layoutSize,
            label: {
                emphasis: {
                    show: false
                }
            },
            show: true,
            roam: false,
            // center: center,
            zoom: getZoom(isChina, isShowHotSpot)
        },
        animationDurationUpdate: 3 * 1000,
        visualMap,
        graphic: graphic,
        series
    });
    if (!regionList) {
        delete options.graphic;
    }
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
let getGraphic = function (top3List, mapName, theme, max, titleText, isAbsoluteHeat = false, scale = 1) {
    if (!top3List || !top3List.length) {
        return {
            id: '1000000',
            type: 'group',
            ignore: true, // 节点是否完全被忽略（既不渲染，也不响应事件）。
            z: 0,
            draggable: false,
            children: []
        };
    }
    let fontSize = 18 * scale;
    let themeColor = getThemeGraphic(theme);
    let titleHeight = 0;
    let subTitleHeight = 40 * scale;
    let subTitle = [];

    let title = [];
    if (titleText) {
        title.push({
            id: 'title',
            type: 'text',
            top: 0,
            height: titleHeight,
            style: {
                text: titleText,
                fill: themeColor.fontColor,
                fontSize: fontSize
            },
            silent: true,
            cursor: 'default'
        });
        titleHeight = 50 * scale;
    }
    let colorArray = getHotValueColor(theme);
    top3List.forEach((subTitleData, i) => {
        let top = titleHeight + subTitleHeight * i;
        let rank = subTitleData.value <= 1 ? 0 : subTitleData.value; // 计算rank值
        subTitle.push({
            id: `top${i + 1}`,
            type: 'group',
            width: 150,
            height: subTitleHeight,
            top,
            children: [
                {
                    type: 'rect',
                    left: 0,
                    top: 'center',
                    info: subTitleData.location,
                    shape: {
                        width: 24 * scale,
                        height: 24 * scale
                    },
                    style: {
                        fill: colorArray[rank]
                    }
                },
                {
                    type: 'text',
                    left: 6 * scale,
                    top: 'center',
                    style: {
                        text: i + 1,
                        font: fontSize,
                        fill: themeColor.fontColor
                    }
                },
                {
                    type: 'text',
                    left: 40 * scale,
                    top: 'center',
                    info: subTitleData.location,
                    style: {
                        text: checkName(subTitleData.name),
                        fill: themeColor.fontColor,
                        textAlign: 'left',
                        font: fontSize
                    }
                }
            ]
        });
    });
    return Object.assign({
        type: 'group',
        right: fontSize * 2, // 定位到右下角
        bottom: '40%', // 定位到右下角
        // position: [100, 200],
        z: 200,
        ignore: false, // 节点是否完全被忽略（既不渲染，也不响应事件）。
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
