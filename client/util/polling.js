/*!
 * Copyright (c) 2010-2020 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有 (c) 2010-2020 湖南蚁坊软件股份有限公司。保留所有权利。
 */

'use strict';

/**
 * 轮询机制
 * Created by yinhu on 2021/6/15.
 */

export default {
    created: function () {
        /**
         *通过闭包的方式防止污染其他组件；
         *使用hook钩子函数，在组件销毁前，解绑所有监听；
         * */
        let timerId = 1; // 模拟计时器id，唯一性
        let timerObj = {}; // 计时器存储器
        // 轮询
        let _this = this;
        let start = function () {
            const id = timerId++;
            timerObj[id] = true;

            async function timerFn () {
                if (!timerObj[id]) return;
                _this.getData();
                setTimeout(timerFn, _this.pollingStep);
            }

            timerFn();
        };
        start();
        this.$once('hook:beforeDestroy', () => {
            timerObj = {}; // 暂停
        });
    },
    data () {
        return {
            pollingStep: 1000 * 60 // 默认60秒更新一次
            // timerObj: {},
            // timerId: 0
        };
    },
    methods: {
        getData () {
            console.log(1);
        }
    }
};
