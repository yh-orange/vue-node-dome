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
  },
  login(data) {
    return axios.post(`${baseUrl}/login`, data, {
      cancelToken: source.token
    });
  },
  getDome () {
    return axios.get(`${baseUrl}/users/get-test`);
  },
  addDatabase(data) {
    return axios.post(`${baseUrl}/create-db`, data, {
      cancelToken: source.token
    });
  },
  addSurface(data) {
    return axios.post(`${baseUrl}/create-posts-table`, data, {
      cancelToken: source.token
    });
  },
  addValue(data) {
    return axios.post(`${baseUrl}/inset-data-table`, data, {
      cancelToken: source.token
    });
  },
  changeValue(data) {
    return axios.post(`${baseUrl}/edit-data-table`, data, {
      cancelToken: source.token
    });
  },
  delValue(data) {
    return axios.delete(`${baseUrl}/del-data-table`, data, {
      cancelToken: source.token
    });
  },
  viewValue(data) {
    return axios.get(`${baseUrl}/get-data-table`, data, {
      cancelToken: source.token
    });
  }
};
