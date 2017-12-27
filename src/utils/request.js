import Vue from 'vue'
import { ToastPlugin, AlertPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
import api from './api'

const service = api(Vue)

export default service
