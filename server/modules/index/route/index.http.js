/*!
 * Copyright (c) 2010-2020 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有 (c) 2010-2020 湖南蚁坊软件股份有限公司。保留所有权利。
 */

'use strict';

// var actionModule = require ('../action/index.controller.js');
// console.log(global.ctx_path, 'global===============');
/**
 * 请求路径 - user
 * Created by wuyaoqian on 14/9/24.
 */
 module.exports = {
    // module: actionModule,
    routes: [
        {
            'method': 'post',
            'path': `${global.ctx_path}/get-data-test`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getTestData'
        }, {
            'method': 'post',
            'path': `${global.ctx_path}/get-word-cloud-data`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getWordCloudData'

        }, {
            'method': 'post',
            'path': `${global.ctx_path}/get-develop-trend-data`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getDevelopTrendData'

        }, {
            'method': 'post',
            'path': `${global.ctx_path}/get-city-rank-data`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getCityRankData'

        }, {
            'method': 'post',
            'path': `${global.ctx_path}/get-platform-distribution-data`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getPlatformDistributionData'

        }, {
            'method': 'post',
            'path': `${global.ctx_path}/get-change-of-position-data`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getChangeOfPositionData'

        }, {
            'method': 'post',
            'path': `${global.ctx_path}/get-hot-event-data`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getHotEventData'

        }, {
            'method': 'post',
            'path': `${global.ctx_path}/get-emotion-trend`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getEmotionTrend'

        }, {
            'method': 'post',
            'path': `${global.ctx_path}/get-region-data`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getRegionData'

        },
        {
            'method': 'post',
            'path': `${global.ctx_path}/get-location-analysis-cdf-2`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getLocationAnalysisCdf2'
        },
        {
            'method': 'post',
            'path': `${global.ctx_path}/get-location-analysis-cdf`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getLocationAnalysisCdf'
        },
        {
            'method': 'post',
            'path': `${global.ctx_path}/get-location-analysis-count`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getLocationAnalysisCount'
        },
        {
            'method': 'post',
            'path': `${global.ctx_path}/get-location-analysis-hot-events`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getLocationAnalysisHotEvents'
        },
        {
            'method': 'post',
            'path': `${global.ctx_path}/get-location-analysis-hot-words`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getLocationAnalysisHotWords'
        },
        {
            'method': 'post',
            'path': `${global.ctx_path}/get-location-analysis-platforms`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getLocationAnalysisPlatforms'
        },
        {
            'method': 'post',
            'path': `${global.ctx_path}/get-location-analysis-ranking`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getLocationAnalysisRanking'
        },
        {
            'method': 'post',
            'path': `${global.ctx_path}/get-location-analysis-stance-trends`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getLocationAnalysisStanceTrends'
        },
        {
            'method': 'post',
            'path': `${global.ctx_path}/get-location-analysis-time-trends`,
            'session': 'base',
            'extract': true,
            'consume': true,
            'handler': 'getLocationAnalysisTimeTrends'
        }
    ]
};
