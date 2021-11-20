import axios from 'axios';
import config from 'config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.dev.baseUrl.dev : config.dev.baseUrl.pro
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default {
  /***
   * request
   * @returns {*}
   */
  request(data) {
    return axios.get(`${baseUrl}/request?dong=${data.dong}`, {
      cancelToken: source.token
    }).catch(function (thrown) {
      console.log(typeof thrown, Object.values(thrown)[2].data);
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // 处理错误
        source.cancel('Operation canceled by the user.');
        console.log(111111111)
      }
    });
  },
  /***
   * get-data-test
   * @returns {*}
   */
  getDataTest(data) {
    return axios.post(`${baseUrl}/get-data-test`, data, {
      cancelToken: source.token
    });
  }
};
