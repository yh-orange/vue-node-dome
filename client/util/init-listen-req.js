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
          }, (err) => {
            return Promise.reject(err);
          });

          // http响应拦截
          axios.interceptors.response.use(response => {
            return response;
          }, (err) =>{
            let config = err.config;
            // If config does not exist or the retry option is not set, reject
            if(!config || !config.retry) return Promise.reject(err);
            // Set the variable for keeping track of the retry count
            config.__retryCount = config.__retryCount || 0;
            // Check if we've maxed out the total number of retries
            if(config.__retryCount >= config.retry) {
              this.$message.error('请求超时')
              // Reject with the error
              return Promise.reject(err);
            }
            // Increase the retry count
            config.__retryCount += 1;
            // Create new promise to handle exponential backoff
            let backoff = new Promise(function(resolve) {
              setTimeout(function() {
                resolve();
              }, config.retryDelay || 1);
            });
            // Return the promise in which recalls axios to retry the request
            return backoff.then(function() {
              return axios(config);
            });
          });
        }
    }
};
