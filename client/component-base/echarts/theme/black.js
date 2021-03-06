/**
 * echart 黑夜皮肤
 * @type {string}
 */

import echarts from 'echarts/lib/echarts';
let contrastColor = '#8b9fb2';
let axisCommon = function () {
    return {
        axisLine: {
            lineStyle: {
                color: contrastColor
            }
        },
        axisTick: {
            lineStyle: {
                color: contrastColor
            }
        },
        axisLabel: {
            textStyle: {
                color: contrastColor
            }
        },
        splitLine: {
            lineStyle: {
                color: contrastColor
            }
        },
        splitArea: {
            areaStyle: {
                color: contrastColor
            }
        }
    };
};

let colorPalette = ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'];
let theme = {
    color: colorPalette,
    tooltip: {
        axisPointer: {
            lineStyle: {
                color: contrastColor
            },
            crossStyle: {
                color: contrastColor
            }
        }
    },
    legend: {
        textStyle: {
            color: contrastColor
        }
    },
    textStyle: {
        color: contrastColor
    },
    title: {
        textStyle: {
            color: contrastColor
        }
    },
    toolbox: {
        iconStyle: {
            normal: {
                borderColor: contrastColor
            }
        }
    },
    dataZoom: {
        textStyle: {
            color: contrastColor
        }
    },
    visualMap: {
        textStyle: {
            color: '#A4A4A4'
        },
        inRange: {
            color: ['#001022', '#31c0ff']
        }
    },
    timeline: {
        lineStyle: {
            color: contrastColor
        },
        itemStyle: {
            normal: {
                color: colorPalette[1]
            }
        },
        label: {
            normal: {
                textStyle: {
                    color: contrastColor
                }
            }
        },
        controlStyle: {
            normal: {
                color: contrastColor,
                borderColor: contrastColor
            }
        }
    },
    timeAxis: axisCommon(),
    logAxis: axisCommon(),
    valueAxis: axisCommon(),
    categoryAxis: axisCommon(),

    line: {
        symbol: 'circle'
    },
    graph: {
        color: colorPalette
    },
    gauge: {
        title: {
            textStyle: {
                color: contrastColor
            }
        }
    },
    candlestick: {
        itemStyle: {
            normal: {
                color: '#FD1050',
                color0: '#0CF49B',
                borderColor: '#FD1050',
                borderColor0: '#0CF49B'
            }
        }
    },
    map: {
        itemStyle: {
            normal: {
                areaColor: '#A4A4A4'
            },
            emphasis: {
                areaColor: null
            }
        },
        label: {
            normal: {
                textStyle: {
                    color: '#ffffff'
                }
            },
            emphasis: {
                textStyle: {
                    color: '#ffffff'
                }
            }
        }
    }
};
theme.categoryAxis.splitLine.show = false;
echarts.registerTheme('black', theme);
