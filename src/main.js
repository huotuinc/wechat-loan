// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { AlertPlugin, ConfirmPlugin, ToastPlugin } from 'vux'
import FastClick from 'fastclick'
import VueWechatTitle from 'vue-wechat-title'
import App from './App'
import router from './router'
import store from './store'
import './assets/font/iconfont.css'
// import './permission'
import './mock'

FastClick.attach(document.body)

Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(VueWechatTitle)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', { isLoading: true })
  next()
})

router.afterEach((to) => {
  store.commit('UPDATE_LOADING', { isLoading: false })
})
