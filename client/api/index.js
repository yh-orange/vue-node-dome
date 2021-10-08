import axios from 'axios';
import config from 'config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.dev.baseUrl.dev : config.dev.baseUrl.pro

console.log('baseUrl', baseUrl);
export default {
    /***
     * request
     * @returns {*}
     */
    request (data) {
        return axios.get(`${baseUrl}/request?dong=${data.dong}`);
    },
    /***
     * get-data-test
     * @returns {*}
     */
    getDataTest (data) {
        return axios.post(`${baseUrl}/get-data-test`, data);
    }
};
