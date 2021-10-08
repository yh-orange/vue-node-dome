<template>
    <div :class="['region-analysis', {'echart-crumbs-navigation': hasCrumbsNavigation}]">
        <div id="region-tip-point"
             :style="pointCenterStyle">
            <div class="point-region-name" v-html="regionDiscribe"></div>
            <div class="heartbeat-loader"></div>
        </div>
        <div class="analysis-content" v-if="!isLoadingMap">
            <echart-item v-if="isMounted"
                         :operateAfterSetOption="operateAfterSetOption"
                         :options="chartOption"
                         :is-clear="false"
                         :chart-click="chartClick"
                         ref="chart">
            </echart-item>
        </div>
        <loading-circle v-else></loading-circle>
    </div>
</template>

<script type="text/babel">
    import echartItem from 'echartItem';
    import defaultChart from 'defaultChart';
    import regionAnalysis from '../../util/region-analysis-24.js';
    import echarts from 'echarts/lib/echarts';
    import regionApi from '../../../api/region';
    import loadingCircle from 'common-loading';
    import coordinateUtil from '../../../asset/util/coordinate-util.js';
    import CommonUtil from '../../../asset/util/common.util.js';
    import commons from '../../../asset/util/data/commons';
    import eventBus from '@eagnet-component-util/event-bus/lib/event-bus';
    import eventMixins from '@eagnet-component-util/event-bus/lib/event-mixins';
    import themeUtils from '../../../asset/data/themeUtils';

    const REGION_LIST = ['province', 'city', 'county'];

    const ModuleKey = CommonUtil.CONST.ModuleKey;

    export default {
        props: {
            thermalData: Array,
            location: String,
            env: String,
            moduleId: String,
            scale: String,
            fontScale: Number, // 系统字体大小，默认单位px
            dataSource: {
                type: String,
                default: 'All'
            },
            configContent: Object,
            hasCrumbsNavigation: Boolean
        },
        data () {
            return {
                isMounted: false,
                themeType: 'region',
                waitTimeId: null,
                isLoadingMap: false,
                isShowTip: true,
                lineStyle: {
                    left: 0,
                    top: 0
                },
                echartItemOptions: {
                    width: 0,
                    height: 0
                },
                bobbleTimeId: null, // 定时器
                regionPointMsg: null, // 标记的地域相关信息
                bobbleCenter: null, // 事件点发生的geo位置
                centerXY: [], // 事件点发生的xy位置
                themeColor: themeUtils.module['region'][themeUtils.theme],
                bobbleOrgMsg: {} // 获取的标记点的原始信息
            };
        },
        computed: {
            chartOption () {
                if (this.isMounted && this.checkIsRegisteredMap()) {
                    return regionAnalysis(this.thermalData, null, this.location, this.echartItemOptions.width, this.echartItemOptions.height, this.bobbleCenter, null, this.orderTitle, this.isAbsolutely, this.themeColor, this.scale, this.fontScale);
                }
                return null;
            },
            isLoading () {
                // 暂时修改成地图加载完成即显示；之前是地图加载➕数据加载完成后才显示
                return this.isLoadingMap || !this.isRightSocket;
            },
            isAbsolutely () {
                return this.configContent.defaultThermalShowType === 'absolutely';
            },
            orderTitle () {
                return !this.isAbsolutely ? this.$t(`${ModuleKey}.content.score.relativelyScore`) : this.$t(`${ModuleKey}.content.score.absoluteScore`);
            },
            bobbleTime () {
                if (this.configContent.customDisplayTime < 1 || this.configContent.customDisplayTime >= 60) {
                    return 20 * 1000;
                } else {
                    return this.configContent.customDisplayTime * 1000;
                }
            },
            pointCenterStyle () {
                if (!this.centerXY || !this.centerXY.length) {
                    return {
                        display: 'none'
                    };
                }
                return {
                    top: this.centerXY[1] + 'px',
                    left: this.centerXY[0] + 'px'
                };
            },
            regionDiscribe () {
                if (!this.bobbleOrgMsg || !this.centerXY.length) {
                    return null;
                }
                let name = '';
                REGION_LIST.forEach(key => {
                    if (this.regionPointMsg[key] && this.regionPointMsg[key].name) {
                        name = name + (this.regionPointMsg[key] && this.regionPointMsg[key].name);
                    }
                });
                return `${this.bobbleOrgMsg.typeDescription || '最新告警'}：<em>${name}</em>`;
            }
        },
        components: {
            echartItem,
            loadingCircle
        },
        created () {
            this.getRegionMap();
        },
        mounted () {
            this.updatePanel();
            this.isMounted = true;
        },
        watch: {
            location (val) {
                this.getRegionMap();
            }
        },
        methods: {
            getMap () {
                let regionName = this.location === 'all' ? 'china' : this.location;
                return echarts.getMap(regionName);
            },
            checkIsRegisteredMap () {
                if (this.isLoadingMap) {
                    return false;
                }
                let payload = this.getMap();
                return !!payload && !!payload.geoJson;
            },
            getRegionMap () {
                this.centerXY = [];
                let timer = setTimeout(() => {
                    this.displayBobble();
                    clearTimeout(timer);
                }, 3000);
                // 已注册的地图不需要再次加载
                if (this.isLoadingMap || this.checkIsRegisteredMap()) {
                    return;
                }
                this.isLoadingMap = true;
                regionApi.getLocationByCode(this.location)
                    .then((retData) => {
                        let ret = retData.data || retData.body;
                        if (ret.success) {
                            let regionName = this.location === 'all' ? 'china' : this.location;
                            // 以后使用地图服务
                            // echarts.registerMap(regionName, ret.data);
                            // coordinateUtil.updateCoordinateMap(echarts.parseGeoJSON(ret.data));
                            echarts.registerMap(regionName, ret.geoJson);
                            coordinateUtil.updateCoordinateMap(echarts.parseGeoJSON(ret.geoJson));
                        }
                        this.mapLoaded();
                    })
                    .catch(() => {
                        this.mapLoaded();
                    });
            },
            mapLoaded () {
                this.isLoadingMap = false;
            },
            // 根据长宽比和当前容器宽高确定echart面板大小
            updatePanel () {
                this.echartItemOptions.width = this.$el.offsetWidth;
                this.echartItemOptions.height = this.$el.offsetHeight;
            },
            resizeHandler (e) {
                // 清空正在显示的突发事件
                if (this.bobbleTimeId) {
                    // 存在定时器则清理
                    clearTimeout(this.bobbleTimeId);
                    this.bobbleTimeId = null;
                }
                this.updatePanel();
                if (this.$refs.chart && this.$refs.chart) {
                    this.$refs.chart.resize();
                }
                this.centerXY = [];
                let timer = setTimeout(() => {
                    this.displayBobble();
                    clearTimeout(timer);
                }, 3000);
            },
            operateAfterSetOption () {
            },
            chartClick (params) {
                /***
                 * 用户点击查看地域详情
                 * 0、预览模式下，不可点击查看详情
                 * 1、省级及以上地图下钻往下
                 * 2、市级地图将仅高亮显示即可
                 */
                if (this.env) {
                    return;
                }
                if (params && !params.data && !params.info) {
                    return;
                }
                let location = (params.data && params.data.location) || params.info;
                regionApi.getLocationByCode(location).then(ret => {
                    let result = ret.body || ret.data;
                    if (result && !result.success) {
                        return;
                    }
                    let regionName = location === 'all' ? 'china' : location;
                    // 以后使用地图资源服务
                    // this.$emit('updateDetailLoaction', result.data.message);
                    // echarts.registerMap(regionName, result.data);
                    // coordinateUtil.updateCoordinateMap(echarts.parseGeoJSON(result.data));
                    // this.checkDetail(result.data.message);
                    this.$emit('updateDetailLoaction', result.location);
                    echarts.registerMap(regionName, result.geoJson);
                    coordinateUtil.updateCoordinateMap(echarts.parseGeoJSON(result.geoJson));
                    this.checkDetail(result.location);
                });
            },
            checkDetail (location) {
                this.$refs.chart.resize();
                eventBus.send(eventBus.MessageConstants.home.OPEN_DETAILS, {
                    detailsType: 'regionSituation',
                    moduleKey: 'REGION_SITUATION',
                    moduleId: this.moduleId,
                    mediaType: this.dataSource.toLowerCase(),
                    data: location
                });
            },
            displayBobble (region) {
                if (region) {
                    this.regionPointMsg = region;
                }
                this.getBobbleCenterPoint();
            },
            // 获取需要冒泡的中心点
            getBobbleCenterPoint () {
                if (!this.regionPointMsg) {
                    return;
                }
                let activeRegion = null;
                if (this.location === 'all') {
                    activeRegion = this.regionPointMsg.province;
                } else {
                    let index = REGION_LIST.findIndex((item) => {
                        return this.regionPointMsg[item]['id'] === this.location;
                    });
                    activeRegion = index !== -1 ? this.regionPointMsg[REGION_LIST[index + 1]] : null;
                }
                if (!activeRegion) {
                    return;
                }
                let regionName = this.location === 'all' ? commons.replaceProvinceLabel(activeRegion.name) : activeRegion.name;
                this.bobbleCenter = coordinateUtil.getCoordinateData(regionName);
                let centerXY = this.getCenterPosition(activeRegion.id, this.bobbleCenter);
                if (!centerXY || !centerXY.length) {
                    return;
                }
                this.centerXY = [parseInt(centerXY[0]), parseInt(centerXY[1])];
            },
            // 转换坐标系上的点到像素坐标值
            convertToPixel (type, coordinate) {
                if (this.$refs.chart) {
                    return this.$refs.chart.convertToPixel(type, coordinate);
                }
                return null;
            },
            // 将bobbleCenter的geo坐标点转换为xy定位点，在拉伸屏幕时需要重新计算，重新显示
            getCenterPosition (code, coordinateUtil) {
                let xy = [];
                // 当用户的地域与突发的地域一致时，只冒泡不标记具体位置
                if (code === this.location) {
                    // 随机显示冒泡点
                    xy = [Math.floor(this.echartItemOptions.width * Math.random()), Math.floor(this.echartItemOptions.height * Math.random())];
                } else {
                    xy = this.convertToPixel('geo', coordinateUtil);
                }
                return xy;
            },
            /***
             * 关闭外界通知需要标记的坐标点
             */
            stopDisplay () {
                if (this.bobbleTimeId) {
                    // 存在定时器则清理
                    clearTimeout(this.bobbleTimeId);
                }
                this.regionPointMsg = null;
                this.bobbleCenter = null;
                this.centerXY = [];
                this.bobbleTimeId = null;
            },
            /***
             * 展示外界通知需要标记的坐标点
             */
            showPoint (regionCode) {
                if (regionCode && regionCode.length === 8) {
                    regionCode = regionCode.slice(2);
                }
                regionApi.getLocationByCode(regionCode).then(ret => {
                    let result = ret.body || ret.data;
                    if (result && !result.success) {
                        return;
                    }
                    this.displayBobble(result.location);
                });
            }
        },
        extends: defaultChart,
        mixins: [eventMixins],
        events: {
            // 监控屏幕大小变化
            [eventBus.MessageConstants.home.WINDOW_RESIZE]: function () {
                this.resizeHandler();
            },
            [eventBus.MessageConstants.regionBobble.START_BOBBLE]: function (regionMsg) {
                let tempId = this.moduleId.split('_')[0];
                if (regionMsg.templateId === tempId) {
                    this.bobbleOrgMsg = regionMsg;
                    this.showPoint(regionMsg.code);
                }
            },
            [eventBus.MessageConstants.regionBobble.STOP_BOBBLE]: function (regionMsg) {
                let tempId = this.moduleId.split('_')[0];
                if (regionMsg.templateId === tempId) {
                    this.bobbleOrgMsg = {};
                    this.stopDisplay();
                }
            }
        },
        beforeDestroy () {
            if (this.waitTimeId) {
                clearTimeout(this.waitTimeId);
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    .region-analysis {
        position: relative;
        width: 100%;
        height: 50%;
        border: 1px solid transparent;

        .analysis-content {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .point-region-name {
            position: absolute;
            display: block;
            width: max-content;
            top: -1rem;
            left: 50%;
            line-height: 2.2rem;
            background: #c61212;
            padding: 0 0.75rem;
            border: 1px solid #eb3d3d;
            font-size: 1.125rem;
            transform: translate(-50%, -100%);
            vertical-align: text-bottom;

            > em {
                font-size: 1.25rem;
                font-weight: 700;
            }
        }

        #region-tip-point {
            position: absolute;
            display: block;
            transform: translate(-50%, -100%);
            z-index: 100;

            .heartbeat-loader {

            }
        }

    }
</style>
