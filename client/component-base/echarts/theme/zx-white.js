/**
 * echart 白天（默认）皮肤
 * @type {string}
 */
import echarts from 'echarts/lib/echarts';

let contrastColor = '#999999';
let lineColor = '#25a9ed';
let axisLineColor = '#cccccc';
let mapBorderColor = '#5bacdd';
let geoBorderColor = new echarts.graphic.LinearGradient(
    0, 1, 0, 0,
    [
        {
            offset: 0,
            color: '#e99eff'
        },
        {
            offset: 0.5,
            color: '#a1c7fc'
        },
        {
            offset: 1,
            color: '#56eefc'
        }
    ]
);
let mapAreaColor = '#ffffff';
let splitColor = '#dddddd';

let axisCommon = function () {
    return {
        axisLine: {
            lineStyle: {
                color: axisLineColor,
                width: 2
            }
        },
        axisTick: {
            lineStyle: {
                color: axisLineColor
            }
        },
        splitLine: {
            lineStyle: {
                color: splitColor
            }
        },
        axisLabel: {
            textStyle: {
                color: contrastColor
            },
            padding: [20, 0, 0, 0]
        },
        splitArea: {
            areaStyle: {
                color: contrastColor
            }
        }
    };
};

let zxWhiteTheme = {
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
        outOfRange: {
            color: lineColor
        },
        inRange: {
            color: ['#d0eff4', '#31c0ff']
        }
    },
    timeline: {
        lineStyle: {
            color: contrastColor
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
    gauge: {
        axisTick: {
            lineStyle: {
                color: '#5093e1'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#5093e1'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#5093e1'
            }
        },
        axisLine: {
            lineStyle: {
                color: [
                    [1, '#ccc']
                ]
            }
        }
    },
    map: {
        itemStyle: {
            areaColor: mapAreaColor,
            borderColor: mapBorderColor,
            borderWidth: 1
        },
        label: {
            normal: {
                textStyle: {
                    color: '#999999'
                }
            }
        },
        emphasis: {
            itemStyle: {
                areaColor: mapAreaColor,
                borderColor: mapBorderColor,
                borderWidth: 1
            },
            label: {
                normal: {
                    textStyle: {
                        color: '#999999'
                    }
                }
            }
        }
    },
    geo: {
        itemStyle: {
            normal: {
                borderColor: geoBorderColor,
                borderWidth: 2
            }
        },
        emphasis: {
            normal: {
                borderColor: geoBorderColor,
                borderWidth: 2
            }
        }
    },
    effectScatter: {
        color: '#e12b86',
        shadowColor: '#333'
    },
    scatter: {
        color: '#e12b86',
        shadowColor: '#333'
    }
};

echarts.registerTheme('zx-white', zxWhiteTheme);
