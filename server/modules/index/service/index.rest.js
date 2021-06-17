/*!
 * Copyright (c) 2010-2020 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有 (c) 2010-2020 湖南蚁坊软件股份有限公司。保留所有权利。
 */

/**
 * 用户相关基本服务
 * Created by dingcan on 19/09/07.
 */
'use strict';

import path from 'path';
import log4js from 'log4js-config';
import RestUtil from 'data-sdk-util/lib/rest-util';
import {
    index as indexConfig
} from 'config';

const logger = log4js.get(global.log_prefix_name + path.basename(__filename));
const RestHelp = RestUtil.getInstance(logger);

const getTestDataServer = function (req, res) {
    // let params = req.body || {};
    return RestHelp.userRest.post(indexConfig.getTestDataServerUrl)
        .opt({
            req: req,
            res: res
        })
        .data({
            'docids': '100000021186020, 100007902425437'
            // "sys": {"version": "0.1"},
            // "param": {"function": "Keyword"},
            // "data": [{"document": "天气真好"}, {"document": "天气不好"}]
        })
        .error(function (eventEmitter, errorCodeDesc) {
            logger.error('getTestDataServer error.', errorCodeDesc);
            eventEmitter.emit('error', errorCodeDesc);
        })
        .success(function (eventEmitter, data) {
            eventEmitter.emit('success', data);
        })
        .send();
};
// 统计指定领域在指定下时间范围内的人员情感CDF值(第二份图表，接口url待定)
const getLocationAnalysisCdf2Server = function (req, res) {
    let params = req.body || {};
    return RestHelp.userRest.get(indexConfig.getLocationAnalysisCdf2Url)
        .opt({
            req: req,
            res: res
        })
        .data({
            '{domain}': params.domain,
            startTime: params.startTime,
            endTime: params.endTime
        })
        .error(function (eventEmitter, errorCodeDesc) {
            logger.error('getLocationAnalysisCdf2Server error.', errorCodeDesc);
            eventEmitter.emit('error', errorCodeDesc);
        })
        .success(function (eventEmitter, data) {
            eventEmitter.emit('success', data);
        })
        .send();
};
// 统计指定领域在指定下时间范围内的人员情感CDF值
const getLocationAnalysisCdfServer = function (req, res) {
    let params = req.body || {};
    return RestHelp.userRest.get(indexConfig.getLocationAnalysisCdfUrl)
        .opt({
            req: req,
            res: res
        })
        .data({
            '{domain}': params.domain,
            startTime: params.startTime,
            endTime: params.endTime
        })
        .error(function (eventEmitter, errorCodeDesc) {
            logger.error('getLocationAnalysisCdfServer error.', errorCodeDesc);
            eventEmitter.emit('error', errorCodeDesc);
        })
        .success(function (eventEmitter, data) {
            eventEmitter.emit('success', data);
        })
        .send();
};
// 统计指定领域在指定下时间范围内的地区热力
const getLocationAnalysisCountServer = function (req, res) {
    let params = req.body || {};
    return RestHelp.userRest.get(indexConfig.getLocationAnalysisCountUrl)
        .opt({
            req: req,
            res: res
        })
        .data({
            '{domain}': params.domain,
            startTime: params.startTime,
            endTime: params.endTime
        })
        .error(function (eventEmitter, errorCodeDesc) {
            logger.error('getLocationAnalysisCountServer error.', errorCodeDesc);
            eventEmitter.emit('error', errorCodeDesc);
        })
        .success(function (eventEmitter, data) {
            eventEmitter.emit('success', data);
        })
        .send();
};
// 统计指定领域在指定下时间范围内的热点事件
const getLocationAnalysisHotEventsServer = function (req, res) {
    let params = req.body || {};
    return RestHelp.userRest.get(indexConfig.getLocationAnalysisHotEventsUrl)
        .opt({
            req: req,
            res: res
        })
        .data({
            '{domain}': params.domain,
            startTime: params.startTime,
            endTime: params.endTime
        })
        .error(function (eventEmitter, errorCodeDesc) {
            logger.error('getLocationAnalysisHotEventsServer error.', errorCodeDesc);
            eventEmitter.emit('error', errorCodeDesc);
        })
        .success(function (eventEmitter, data) {
            eventEmitter.emit('success', data);
        })
        .send();
};
// 统计指定领域在指定下时间范围内的词云列表
const getLocationAnalysisHotWordsServer = function (req, res) {
    let params = req.body || {};
    return RestHelp.userRest.get(indexConfig.getLocationAnalysisHotWordsUrl)
        .opt({
            req: req,
            res: res
        })
        .data({
            '{domain}': params.domain,
            startTime: params.startTime,
            endTime: params.endTime
        })
        .error(function (eventEmitter, errorCodeDesc) {
            logger.error('getLocationAnalysisHotWordsServer error.', errorCodeDesc);
            eventEmitter.emit('error', errorCodeDesc);
        })
        .success(function (eventEmitter, data) {
            eventEmitter.emit('success', data);
        })
        .send();
};
// 统计指定领域在指定下时间范围内的平台分布
const getLocationAnalysisPlatformsServer = function (req, res) {
    let params = req.body || {};
    return RestHelp.userRest.get(indexConfig.getLocationAnalysisPlatformsUrl)
        .opt({
            req: req,
            res: res
        })
        .data({
            '{domain}': params.domain,
            startTime: params.startTime,
            endTime: params.endTime
        })
        .error(function (eventEmitter, errorCodeDesc) {
            logger.error('getLocationAnalysisPlatformsServer error.', errorCodeDesc);
            eventEmitter.emit('error', errorCodeDesc);
        })
        .success(function (eventEmitter, data) {
            eventEmitter.emit('success', data);
        })
        .send();
};
// 统计指定领域在指定下时间范围内的地区热力分布
const getLocationAnalysisRankingServer = function (req, res) {
    let params = req.body || {};
    return RestHelp.userRest.get(indexConfig.getLocationAnalysisRankingUrl)
        .opt({
            req: req,
            res: res
        })
        .data({
            '{domain}': params.domain,
            startTime: params.startTime,
            endTime: params.endTime
        })
        .error(function (eventEmitter, errorCodeDesc) {
            logger.error('getLocationAnalysisRankingServer error.', errorCodeDesc);
            eventEmitter.emit('error', errorCodeDesc);
        })
        .success(function (eventEmitter, data) {
            eventEmitter.emit('success', data);
        })
        .send();
};
// 统计指定领域在指定下时间范围内的立场趋势
const getLocationAnalysisStanceTrendsServer = function (req, res) {
    let params = req.body || {};
    return RestHelp.userRest.get(indexConfig.getLocationAnalysisStanceTrendsUrl)
        .opt({
            req: req,
            res: res
        })
        .data({
            '{domain}': params.domain,
            startTime: params.startTime,
            endTime: params.endTime
        })
        .error(function (eventEmitter, errorCodeDesc) {
            logger.error('getLocationAnalysisStanceTrendsServer error.', errorCodeDesc);
            eventEmitter.emit('error', errorCodeDesc);
        })
        .success(function (eventEmitter, data) {
            eventEmitter.emit('success', data);
        })
        .send();
};
// 统计指定领域在指定下时间范围内的数据发展趋势
const getLocationAnalysisTimeTrendsServer = function (req, res) {
    let params = req.body || {};
    return RestHelp.userRest.get(indexConfig.getLocationAnalysisTimeTrendsUrl)
        .opt({
            req: req,
            res: res
        })
        .data({
            '{domain}': params.domain,
            startTime: params.startTime,
            endTime: params.endTime
        })
        .error(function (eventEmitter, errorCodeDesc) {
            logger.error('getLocationAnalysisTimeTrendsServer error.', errorCodeDesc);
            eventEmitter.emit('error', errorCodeDesc);
        })
        .success(function (eventEmitter, data) {
            eventEmitter.emit('success', data);
        })
        .send();
};
export default {
    getTestDataServer,
    getLocationAnalysisCdf2Server,
    getLocationAnalysisCdfServer,
    getLocationAnalysisCountServer,
    getLocationAnalysisHotEventsServer,
    getLocationAnalysisHotWordsServer,
    getLocationAnalysisPlatformsServer,
    getLocationAnalysisRankingServer,
    getLocationAnalysisStanceTrendsServer,
    getLocationAnalysisTimeTrendsServer
};
