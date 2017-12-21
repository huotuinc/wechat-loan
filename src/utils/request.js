import Vue from 'vue'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
import api from './api'

const service = api(Vue)

export default service
