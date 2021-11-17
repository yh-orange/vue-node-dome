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
          // http请求拦截
          axios.interceptors.request.use(config => {
            if (config.method === 'post' && config.url !== '/login') {
            } else if (config.method === 'get') {
              if (/\?/.test(config.url)) {
                config.url += 'user=admin'
              } else {
                config.url += '?user=admin'
              }
            }
            return config;
          });

          // http响应拦截
          axios.interceptors.response.use(response => {
            if (response.data.requestIntercept === 1) {
              console.log('登录信息已失效，请重新登录！');
            }
            return response;
          });
        }
    }
};
