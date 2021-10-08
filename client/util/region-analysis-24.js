/**
 * Created by zhousiyao on 2018/6/12.
 */

import charts from './charts-factory';
import coordinateUtil from './coordinate-util.js';

const NORNAL_FONT_SIZE = 20;

let getLayoutSize = function (mapName, WHscale, panelWidth, panelHeight) {
    // 中国地图比较扁平，需额外处理
    if (mapName === 'china') {
        const CHINA_SCALE = 1.28;
        let num = panelWidth / panelHeight > CHINA_SCALE ? panelHeight * CHINA_SCALE : panelWidth / CHINA_SCALE;
        return Math.floor(num * 0.9);
    }
    let width = panelWidth * 0.9;
    let height = panelHeight * 0.9;
    return width > height ? height : width;
};

let chartOption = function (list, scatterList, mapName, panelWidth, panelHeight, center, isShowHotSpot, titleText, isAbsoluteHeat = false, theme, WHscale, fontScale = 1) {
    let fontSize = NORNAL_FONT_SIZE * fontScale;
    mapName = mapName === 'all' ? 'china' : mapName;
    let isChina = mapName === 'china';
    let mineColor = theme.valueColor;
    let regionList = [];
    if (list) {
        list.forEach(item => {
            regionList.push({
                name: item.name,
                value: isAbsoluteHeat ? Math.floor(item.absRank) : item.rank,
                location: item.location,
                emphasis: {
                    itemStyle: {
                        areaColor: mineColor[isAbsoluteHeat ? Math.floor(item.absRank) : item.rank],
                        borderColor: theme.borderColor,
                        borderWidth: 3,
                        shadowColor: theme.shadowColor,
                        shadowBlur: 24
                    }
                }
            });
        });
        regionList.sort((a, b) => {
            return b.value - a.value;
        });
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
    let colorArray = theme.valueColor;
    if (regionList && regionList[0] && regionList[0].value) {
        visualMap = {
            type: 'piecewise',
            min: 0,
            max: 99,
            left: fontSize * 4.5,
            bottom: fontSize * 2.5,
            orient: 'horizontal',
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
                color: theme.labelColor
            }
        };
    }
    let layoutSize = getLayoutSize(mapName, WHscale, panelWidth, panelHeight);
    let series = [
        {
            type: 'map',
            mapType: isShowHotSpot ? 'splice_map' : mapName,
            roam: false,
            layoutCenter: ['50%', '50%'],
            layoutSize: layoutSize,
            itemStyle: {
                borderColor: theme.lineColor
            },
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
    let options = charts.createOptions('map', null, null, {
        geo: {
            map: mapName,
            layoutCenter: ['50%', '50%'],
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
        graphic: {
            type: 'group',
            bottom: fontSize * 5,
            left: fontSize * 5,
            // position: [100, 200],
            z: 200,
            draggable: false,
            children: [{
                type: 'text',
                top: 10,
                style: {
                    text: titleText,
                    fill: theme.subLabelColor,
                    fontSize: fontSize
                },
                silent: true,
                cursor: 'default'
            }]
        },
        series
    });
    return options;
};

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
