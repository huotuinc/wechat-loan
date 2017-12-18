import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HelloWorld'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
