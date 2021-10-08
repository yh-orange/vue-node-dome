let china = require('./map/cn/china.json');
let chinaEn = require('./test.json');

/***
 * 将geojson资源进行压缩及解压
 */
let fs = require('fs');

/**
 * 数组映射
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {Array}
 */
let nativeMap = Array.prototype.map;
let nativeFilter = Array.prototype.filter;
let nativeForEach = Array.prototype.forEach;
let zrUtil = function () {
};
/**
 * 数组过滤
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {Array}
 */
zrUtil.filter = function (obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.filter && obj.filter === nativeFilter) {
        return obj.filter(cb, context);
    } else {
        let result = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            if (cb.call(context, obj[i], i, obj)) {
                result.push(obj[i]);
            }
        }
        return result;
    }
};

/**
 * 数组或对象遍历
 * @memberOf module:zrender/core/util
 * @param {Object|Array} obj
 * @param {Function} cb
 * @param {*} [context]
 */
zrUtil.each = function (obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.forEach && obj.forEach === nativeForEach) {
        obj.forEach(cb, context);
    } else if (obj.length === +obj.length) {
        for (let i = 0, len = obj.length; i < len; i++) {
            cb.call(context, obj[i], i, obj);
        }
    } else {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                cb.call(context, obj[key], key, obj);
            }
        }
    }
};
zrUtil.map = function (obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.map && obj.map === nativeMap) {
        return obj.map(cb, context);
    } else {
        let result = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            result.push(cb.call(context, obj[i], i, obj));
        }
        return result;
    }
};

let decodePolygon = function (coordinate, encodeOffsets, encodeScale) {
    let result = [];
    let prevX = encodeOffsets[0];
    let prevY = encodeOffsets[1];

    for (let i = 0; i < coordinate.length; i += 2) {
        let x = coordinate.charCodeAt(i) - 64;
        let y = coordinate.charCodeAt(i + 1) - 64;
        // ZigZag decoding
        x = (x >> 1) ^ (-(x & 1));
        y = (y >> 1) ^ (-(y & 1));
        // Delta deocding
        x += prevX;
        y += prevY;

        prevX = x;
        prevY = y;
        // Dequantize
        result.push([x / encodeScale, y / encodeScale]);
    }

    return result;
};
let decode = function (json) {
    if (!json.UTF8Encoding) {
        return json;
    }
    let encodeScale = json.UTF8Scale;
    if (encodeScale == null) {
        encodeScale = 1024;
    }

    let features = json.features;

    for (let f = 0; f < features.length; f++) {
        let feature = features[f];
        let geometry = feature.geometry;
        let coordinates = geometry.coordinates;
        let encodeOffsets = geometry.encodeOffsets;

        for (let c = 0; c < coordinates.length; c++) {
            let coordinate = coordinates[c];

            if (geometry.type === 'Polygon') {
                coordinates[c] = decodePolygon(
                    coordinate,
                    encodeOffsets[c],
                    encodeScale
                );
            } else if (geometry.type === 'MultiPolygon') {
                for (let c2 = 0; c2 < coordinate.length; c2++) {
                    let polygon = coordinate[c2];
                    coordinate[c2] = decodePolygon(
                        polygon,
                        encodeOffsets[c][c2],
                        encodeScale
                    );
                }
            }
        }
    }
    // Has been decoded
    json.UTF8Encoding = false;
    console.log(JSON.stringify(json));
    return json;
};

let convert2Echarts = function (rawStr) {
    let json = rawStr;
    // Meta tag
    json.UTF8Encoding = true;
    let features = json.features;
    if (!features) {
        return;
    }
    features.forEach(function (feature) {
        let encodeOffsets = feature.geometry.encodeOffsets = [];
        let coordinates = feature.geometry.coordinates;
        if (feature.geometry.type === 'Polygon') {
            coordinates.forEach(function (coordinate, idx) {
                coordinates[idx] = encodePolygon(
                    coordinate, encodeOffsets[idx] = []
                );
            });
        } else if (feature.geometry.type === 'MultiPolygon') {
            coordinates.forEach(function (polygon, idx1) {
                encodeOffsets[idx1] = [];
                polygon.forEach(function (coordinate, idx2) {
                    coordinates[idx1][idx2] = encodePolygon(
                        coordinate, encodeOffsets[idx1][idx2] = []
                    );
                });
            });
        }
    });
    return JSON.stringify(json);
};
let encodePolygon = function (coordinate, encodeOffsets) {
    let result = '';

    let prevX = quantize(coordinate[0][0]);
    let prevY = quantize(coordinate[0][1]);
    // Store the origin offset
    encodeOffsets[0] = prevX;
    encodeOffsets[1] = prevY;

    for (let i = 0; i < coordinate.length; i++) {
        let point = coordinate[i];
        result += encode(point[0], prevX);
        result += encode(point[1], prevY);

        prevX = quantize(point[0]);
        prevY = quantize(point[1]);
    }

    return result;
};

let encode = function (val, prev) {
    // Quantization
    val = quantize(val);
    // let tmp = val;
    // Delta
    val = val - prev;

    if (((val << 1) ^ (val >> 15)) + 64 === 8232) {
        // WTF, 8232 will get syntax error in js code
        val--;
    }
    // ZigZag
    val = (val << 1) ^ (val >> 15);
    // add offset and get unicode
    return String.fromCharCode(val + 64);
    // let tmp = {'tmp' : str};
    // try{
    //     eval("(" + JSON.stringify(tmp) + ")");
    // }catch(e) {
    //     console.log(val + 64);
    // }
};

function quantize (val) {
    return Math.ceil(val * 1024);
}

/***
 * 将已经压缩的地图资源进行解压，并导出制定名称的文件
 * @param geoJson
 */
let decodeGeojson = function (geoJson) {
    let ret = decode(geoJson);
    fs.writeFileSync('./test.json', `${JSON.stringify(ret)}`);

    // return zrUtil.map(zrUtil.filter(geoJson.features, function (featureObj) {
    //     // Output of mapshaper may have geometry null
    //     return featureObj.geometry && featureObj.properties && featureObj.geometry.coordinates.length > 0;
    // }), function (featureObj) {
    //     // let properties = featureObj.properties;
    //     let geo = featureObj.geometry;
    //
    //     let coordinates = geo.coordinates;
    //
    //     let geometries = [];
    //     if (geo.type === 'Polygon') {
    //         geometries.push({
    //             type: 'polygon',
    //             // According to the GeoJSON specification.
    //             // First must be exterior, and the rest are all interior(holes).
    //             exterior: coordinates[0],
    //             interiors: coordinates.slice(1)
    //         });
    //     }
    //     if (geo.type === 'MultiPolygon') {
    //         zrUtil.each(coordinates, function (item) {
    //             if (item[0]) {
    //                 geometries.push({
    //                     type: 'polygon',
    //                     exterior: item[0],
    //                     interiors: item.slice(1)
    //                 });
    //             }
    //         });
    //     }
    //     console.log(111, JSON.stringify(geometries));
    //     return geometries;
    // });
};
// decodeGeojson(china);

/***
 * 将未压缩的地图资源进行压缩，并导出制定名称的文件
 * @param geoJson
 */
let encodeGeojson = function (geoJson) {
    let ret = convert2Echarts(geoJson);
    fs.writeFileSync('./encode-ret.json', `${ret}`);
};
// encodeGeojson(chinaEn);
