import axios from 'axios';

/**
 * 事件总线mixins
 */
export default {
    created () {
        this.initListenReq();
    },
    data () {
        return {
            isNeedLogout: false, // 需要登出
            hrefLogout: true, //
            content: ''
        };
    },
    methods: {
        initListenReq () {
            // 增加全局拦截 处理401 session失效等异常
            axios.interceptors.response.use(response => {
                if (!this.isNeedLogout) {
                    this.isSsoLogout = true;
                    if (response.status === 200) {
                        if (!response.data.success && response.data.error) {
                            if (response.data.error.code === '11473') {
                                this.content = response.data;
                                this.isSsoLogout = false;
                                this.isNeedLogout = true;
                            } else if (response.data.error.code === 'B00006') {
                                this.content = response.data.error.msg; // 用户没有组织信息
                                this.hrefLogout = true;
                                this.isSsoLogout = false;
                                this.isNeedLogout = true;
                            }
                        }
                    }
                }
                return response;
            }, error => {
                if (error && error.response && error.response.status) {
                    this.hrefLogout = false;
                    switch (error.response.status) { // 401: 未登录// 未登录则跳转登录页面，并携带当前页面的路径// 在登录成功后返回当前页面，这一步需要在登录页操作。
                    case 401:
                        // 会话失效，重新登录
                        this.content = this.$t('main.common.error.sessionInvalid');
                        this.isNeedLogout = true;
                        break;
                    case 454:
                        // sso单点退出
                        this.content = error.response.data;
                        this.isSsoLogout = false;
                        this.isNeedLogout = true;
                        break;
                    case 452:
                        // 多人同时登录，被踢出
                        this.content = error.response.data;
                        this.isNeedLogout = true;
                        break;
                    case 453:
                        // 多人同时登录，被踢出
                        this.content = error.response.data;
                        this.isNeedLogout = true;
                        break;
                    case 200:
                        if (!error.response.data.success && error.response.data.error && error.response.data.error.code === '11473') {
                            this.content = error.response.data;
                            this.isSsoLogout = false;
                            this.isNeedLogout = true;
                        }
                        break;
                    }
                    return Promise.reject(error.response);
                }
            });
        }
    }
};
