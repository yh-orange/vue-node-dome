<template>
    <div class="echarts-panel">

    </div>
</template>

<script type="text/babel">
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/chart/map';
    import 'echarts/lib/chart/effectScatter';
    import 'echarts/lib/chart/scatter';
    import 'echarts/lib/component/geo';
    import 'echarts/lib/component/visualMap';
    import 'echarts/lib/component/visualMapContinuous';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/graphic';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/chart/gauge';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/graph';
    import 'echarts-wordcloud';
    import 'echarts/lib/coord/geo/geoCreator';
    import 'echarts/lib/chart/lines';

    export default {
        props: {
            chartWidth: {
                type: Number,
                default: null
            },
            chartHeight: {
                type: Number,
                default: null
            },
            options: {
                type: Object
            },
            isAutoTip: {
                type: Boolean,
                default: false
            },
            autoOptions: {
                type: Object,
                default: () => {
                    return {loopSeries: true};
                }
            },
            operateBeforeSetOption: {
                type: Function
            },
            operateAfterSetOption: {
                type: Function
            },
            isClear: {
                type: Boolean,
                default: false
            },
            chartClick: {
                type: Function
            },
            chartMouseover: {
                type: Function
            }
        },
        data () {
            return {
                isInit: true,
                isBegin: false,
                themeValue: null
            };
        },
        computed: {
            opts () {
                return {
                    width: this.chartWidth,
                    height: this.chartHeight
                };
            }
        },
        watch: {
            'options': {
                handler: function (val) {
                    if (this.theme.value !== this.themeValue) {
                        this.themeValue = this.theme.value;
                        this.toggleEchart();
                    } else {
                        this.chartRender(val);
                    }
                },
                deep: true
            },
            'theme': {
                handler: function (newTheme) {
                    if (newTheme.value !== this.themeValue) {
                        this.themeValue = newTheme.value;
                        this.toggleEchart();
                    }
                },
                deep: true
            }
        },
        created () {
            this.echart = null;
        },
        mounted () {
            this.themeValue = this.theme.value;
            this.chartRender(this.options);
        },
        beforeDestroy () {
            this.destroyEchart();
        },
        methods: {
            toggleEchart () {
                this.destroyEchart();
                this.chartRender(this.options);
            },
            destroyEchart () {
                if (this.echart) {
                    this.echart.dispose();
                    this.echart = null;
                    this.isInit = true;
                }
            },
            isShow () {
                let width = (this.$el ? this.$el.offsetWidth : 0) || this.chartWidth;
                let height = (this.$el ? this.$el.offsetHeight : 0) || this.chartHeight;
                return width > 0 && height > 0;
            },
            chartRender (options) {
                if (this.echart && this.isClear && !this.isInit) {
                    this.echart.clear();
                }
                if (this.echart === null && this.themeValue && this.isShow()) {
                    this.echart = echarts.init(this.$el, this.themeValue, this.opts);
                    if (this.chartClick) {
                        this.echart.on('click', this.chartClick);
                    }
                    if (this.chartMouseover) {
                        this.echart.on('mouseover', this.chartMouseover);
                    }
                }
                if (this.echart && options && options !== {}) {
                    if (this.isInit && this.operateBeforeSetOption) {
                        this.operateBeforeSetOption();
                    }
                    this.echart.setOption(options);
                    if (this.isInit && this.operateAfterSetOption) {
                        this.operateAfterSetOption(this.echart);
                    }
                    this.isInit = false;
                    this.$emit('update-chart-ready');
                }
                if (this.isAutoTip && this.echart && options && !this.isBegin && options.series[0].data.length) {
                    this.isBegin = true;
                    global.tools.loopShowTooltip(this.echart, options, this.autoOptions);
                }
            },
            resize () {
                if (this.echart && !this.echart.isDisposed()) {
                    this.echart.resize(this.opts);
                }
            },
            clearChart () {
                if (this.echart && this.isClear && !this.isInit) {
                    this.echart.clear();
                }
            },
            /**
             * 根据经纬度计算坐标
             */
            convertToPixel (type, coordinate) {
                if (!this.echart) {
                    this.echart = echarts.init(this.$el, this.opts);
                }
                return this.echart.convertToPixel(type, coordinate);
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less" scoped>
    .echarts-panel {
        width: 100%;
        height: 100%;
    }
</style>
