import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HelloWorld'
import Login from '@/views/login/Login'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    name: '登录',
    component: Login
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
