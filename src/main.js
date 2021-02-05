// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import api from './fetch/api'
import jsPlumb from 'jsplumb'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import ModelObj from 'vue-3d-model'

// 全局注册，使用方法为:this.$axios
Vue.prototype.api = api
Vue.prototype.$http = axios
Vue.prototype.$jsPlumb = jsPlumb.jsPlumb
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(ModelObj)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
