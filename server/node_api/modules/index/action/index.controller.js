/*!
 * Copyright (c) 2010-2020 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有 (c) 2010-2020 湖南蚁坊软件股份有限公司。保留所有权利。
 */

'use strict';

/**
 * 用户相关 controller
 * Created by yinhu on 21-5-31.
 */

// import path from 'path';
import IndexService from '../service/index.rest';
// import log4js from 'log4js-config';
import {
    indexStaticData as staticDataAccountConfig
} from 'config';
import ManageServer from '../../manage/service/manage.rest';

// const logger = log4js.get(global.log_prefix_name + path.basename(__filename));

// 测试接口
const getTestData = function (req, res) {
    IndexService.getTestDataServer(req, res).on('success', function (data) {
        if (!data) {
            return res.json({
                success: false
            });
        }
        res.json({
            success: true,
            data: data
        });
    }).on('error', function (errorCodeDesc) {
        res.json({
            success: false,
            error: errorCodeDesc
        });
    });
};
// 获取词云信息
const getWordCloudData = function (req, res) {
    let params = req.body || {};
    if (params.username && staticDataAccountConfig.wordCloud[params.username]) {
        res.json({
            success: true,
            data: staticDataAccountConfig.wordCloud[params.username]
        });
    } else {
        res.json({
            success: false,
            data: []
        });
    }
    // IndexService.getTestDataServer(req, res).on('success', function (data) {
    //     if (!data) {
    //         return res.json({
    //             success: false
    //         });
    //     }
    //     res.json({
    //         success: true,
    //         data: data
    //     });
    // }).on('error', function (errorCodeDesc) {
    //     res.json({
    //         success: false,
    //         error: errorCodeDesc
    //     });
    // });
};
// 获取发展趋势数据
const getDevelopTrendData = function (req, res) {
    let params = req.body || {};
    if (params.username && staticDataAccountConfig.developTrend[params.username]) {
        res.json({
            success: true,
            data: staticDataAccountConfig.developTrend[params.username]
        });
    } else {
        res.json({
            success: false,
            data: []
        });
    }
    // IndexService.getTestDataServer(req, res).on('success', function (data) {
    //     if (!data) {
    //         return res.json({
    //             success: false
    //         });
    //     }
    //     res.json({
    //         success: true,
    //         data: data
    //     });
    // }).on('error', function (errorCodeDesc) {
    //     res.json({
    //         success: false,
    //         error: errorCodeDesc
    //     });
    // });
};
// 获取 城市排行
const getCityRankData = function (req, res) {
    let params = req.body || {};
    if (params.username && staticDataAccountConfig.cityRank[params.username]) {
        res.json({
            success: true,
            data: staticDataAccountConfig.cityRank[params.username]
        });
    } else {
        res.json({
            success: false,
            data: []
        });
    }
    // IndexService.getTestDataServer(req, res).on('success', function (data) {
    //     if (!data) {
    //         return res.json({
    //             success: false
    //         });
    //     }
    //     res.json({
    //         success: true,
    //         data: data
    //     });
    // }).on('error', function (errorCodeDesc) {
    //     res.json({
    //         success: false,
    //         error: errorCodeDesc
    //     });
    // });
};
// 获取 平台分布
const getPlatformDistributionData = function (req, res) {
    let params = req.body || {};
    if (params.username && staticDataAccountConfig.platformDistribution[params.username]) {
        res.json({
            success: true,
            data: staticDataAccountConfig.platformDistribution[params.username]
        });
    } else {
        res.json({
            success: false,
            data: []
        });
    }
    // IndexService.getTestDataServer(req, res).on('success', function (data) {
    //     if (!data) {
    //         return res.json({
    //             success: false
    //         });
    //     }
    //     res.json({
    //         success: true,
    //         data: data
    //     });
    // }).on('error', function (errorCodeDesc) {
    //     res.json({
    //         success: false,
    //         error: errorCodeDesc
    //     });
    // });
};
// 获取 平台分布
const getChangeOfPositionData = function (req, res) {
    let params = req.body || {};
    if (params.username && staticDataAccountConfig.ChangeOfPosition[params.username]) {
        res.json({
            success: true,
            data: staticDataAccountConfig.ChangeOfPosition[params.username]
        });
    } else {
        res.json({
            success: false,
            data: []
        });
    }
    // IndexService.getTestDataServer(req, res).on('success', function (data) {
    //     if (!data) {
    //         return res.json({
    //             success: false
    //         });
    //     }
    //     res.json({
    //         success: true,
    //         data: data
    //     });
    // }).on('error', function (errorCodeDesc) {
    //     res.json({
    //         success: false,
    //         error: errorCodeDesc
    //     });
    // });
};
// 获取 热点事件 数据
const getHotEventData = function (req, res) {
    let params = req.body || {};
    if (params.username && staticDataAccountConfig.HotEvents[params.username]) {
        res.json({
            success: true,
            data: staticDataAccountConfig.HotEvents[params.username]
        });
    } else {
        res.json({
            success: false,
            data: []
        });
    }
    // IndexService.getTestDataServer(req, res).on('success', function (data) {
    //     if (!data) {
    //         return res.json({
    //             success: false
    //         });
    //     }
    //     res.json({
    //         success: true,
    //         data: data
    //     });
    // }).on('error', function (errorCodeDesc) {
    //     res.json({
    //         success: false,
    //         error: errorCodeDesc
    //     });
    // });
};
// 获取 媒体情感态度 数据
const getEmotionTrend = function (req, res) {
    let params = req.body || {};
    if (params.username && staticDataAccountConfig.emotionTrend[params.username]) {
        res.json({
            success: true,
            data: staticDataAccountConfig.emotionTrend[params.username]
        });
    } else {
        res.json({
            success: false,
            data: []
        });
    }
    // IndexService.getTestDataServer(req, res).on('success', function (data) {
    //     if (!data) {
    //         return res.json({
    //             success: false
    //         });
    //     }
    //     res.json({
    //         success: true,
    //         data: data
    //     });
    // }).on('error', function (errorCodeDesc) {
    //     res.json({
    //         success: false,
    //         error: errorCodeDesc
    //     });
    // });
};
// 获取 地图 数据
const getRegionData = function (req, res) {
    let params = req.body || {};
    if (params.username && staticDataAccountConfig.region[params.username][params.activeEventType]) {
        res.json({
            success: true,
            data: staticDataAccountConfig.region[params.username][params.activeEventType]
        });
    } else {
        res.json({
            success: false,
            data: []
        });
    }
    // IndexService.getTestDataServer(req, res).on('success', function (data) {
    //     if (!data) {
    //         return res.json({
    //             success: false
    //         });
    //     }
    //     res.json({
    //         success: true,
    //         data: data
    //     });
    // }).on('error', function (errorCodeDesc) {
    //     res.json({
    //         success: false,
    //         error: errorCodeDesc
    //     });
    // });
};

// 统计指定领域在指定下时间范围内的人员情感CDF值(第二份图表，接口url待定)
const getLocationAnalysisCdf2 = function (req, res) {
    ManageServer.getLocationAnalysisCdf2Server(req, res).on('success', function (data) {
        if (!data) {
            return res.json({
                success: false
            });
        }
        res.json({
            success: true,
            data: data
        });
    }).on('error', function (errorCodeDesc) {
        res.json({
            success: false,
            error: errorCodeDesc
        });
    });
};
// 统计指定领域在指定下时间范围内的人员情感CDF值
const getLocationAnalysisCdf = function (req, res) {
    ManageServer.getLocationAnalysisCdfServer(req, res).on('success', function (data) {
        if (!data) {
            return res.json({
                success: false
            });
        }
        res.json({
            success: true,
            data: data
        });
    }).on('error', function (errorCodeDesc) {
        res.json({
            success: false,
            error: errorCodeDesc
        });
    });
};
// 统计指定领域在指定下时间范围内的人员情感CDF值
const getLocationAnalysisCount = function (req, res) {
    ManageServer.getLocationAnalysisCountServer(req, res).on('success', function (data) {
        if (!data) {
            return res.json({
                success: false
            });
        }
        res.json({
            success: true,
            data: data
        });
    }).on('error', function (errorCodeDesc) {
        res.json({
            success: false,
            error: errorCodeDesc
        });
    });
};
// 统计指定领域在指定下时间范围内的热点事件
const getLocationAnalysisHotEvents = function (req, res) {
    ManageServer.getLocationAnalysisHotEventsServer(req, res).on('success', function (data) {
        if (!data) {
            return res.json({
                success: false
            });
        }
        res.json({
            success: true,
            data: data
        });
    }).on('error', function (errorCodeDesc) {
        res.json({
            success: false,
            error: errorCodeDesc
        });
    });
};
// 统计指定领域在指定下时间范围内的词云列表
const getLocationAnalysisHotWords = function (req, res) {
    ManageServer.getLocationAnalysisHotWordsServer(req, res).on('success', function (data) {
        if (!data) {
            return res.json({
                success: false
            });
        }
        res.json({
            success: true,
            data: data
        });
    }).on('error', function (errorCodeDesc) {
        res.json({
            success: false,
            error: errorCodeDesc
        });
    });
};
// 统计指定领域在指定下时间范围内的平台分布
const getLocationAnalysisPlatforms = function (req, res) {
    ManageServer.getLocationAnalysisPlatformsServer(req, res).on('success', function (data) {
        if (!data) {
            return res.json({
                success: false
            });
        }
        res.json({
            success: true,
            data: data
        });
    }).on('error', function (errorCodeDesc) {
        res.json({
            success: false,
            error: errorCodeDesc
        });
    });
};
// 统计指定领域在指定下时间范围内的地区热力分布
const getLocationAnalysisRanking = function (req, res) {
    ManageServer.getLocationAnalysisRankingServer(req, res).on('success', function (data) {
        if (!data) {
            return res.json({
                success: false
            });
        }
        res.json({
            success: true,
            data: data
        });
    }).on('error', function (errorCodeDesc) {
        res.json({
            success: false,
            error: errorCodeDesc
        });
    });
};
// 统计指定领域在指定下时间范围内的立场趋势
const getLocationAnalysisStanceTrends = function (req, res) {
    ManageServer.getLocationAnalysisStanceTrendServer(req, res).on('success', function (data) {
        if (!data) {
            return res.json({
                success: false
            });
        }
        res.json({
            success: true,
            data: data
        });
    }).on('error', function (errorCodeDesc) {
        res.json({
            success: false,
            error: errorCodeDesc
        });
    });
};
// 统计指定领域在指定下时间范围内的数据发展趋势
const getLocationAnalysisTimeTrends = function (req, res) {
    ManageServer.getLocationAnalysisTimeTrendsServer(req, res).on('success', function (data) {
        if (!data) {
            return res.json({
                success: false
            });
        }
        res.json({
            success: true,
            data: data
        });
    }).on('error', function (errorCodeDesc) {
        res.json({
            success: false,
            error: errorCodeDesc
        });
    });
};
export default {
    getTestData,
    getWordCloudData,
    getDevelopTrendData,
    getCityRankData,
    getPlatformDistributionData,
    getChangeOfPositionData,
    getHotEventData,
    getEmotionTrend,
    getRegionData,
    getLocationAnalysisCdf2,
    getLocationAnalysisCdf,
    getLocationAnalysisCount,
    getLocationAnalysisHotEvents,
    getLocationAnalysisHotWords,
    getLocationAnalysisPlatforms,
    getLocationAnalysisRanking,
    getLocationAnalysisStanceTrends,
    getLocationAnalysisTimeTrends
};
