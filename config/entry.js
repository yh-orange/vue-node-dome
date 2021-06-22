// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../client/entry-page/index'
import router from '@/router'
import axios from 'axios'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import '@/util/rem';
Vue.prototype.$axios = axios // 把axios注册为原型属性
Vue.use(ViewUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})