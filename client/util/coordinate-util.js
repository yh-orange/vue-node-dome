let coordinateUtil = {
    coordinateMap: {},
    /**
     * 处理得到的地图经纬度数据
     * @param data
     * @returns {Array}
     */
    updateCoordinateMap: function (data) {
        if (data) {
            // this.clearCoordinateMap();
            // 我在注册地图资源，不会清理地图资源哦-
            data.forEach(region => {
                this.coordinateMap[region.name] = region.center;
            });
        }
    },
    clearCoordinateMap: function () {
        this.coordinateMap = {};
    },
    getCoordinateData (regionName) {
        if (!regionName) {
            return null;
        }
        return this.coordinateMap[regionName];
    }
};

export default coordinateUtil;
