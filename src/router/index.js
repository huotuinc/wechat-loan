import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

const _import = require('./_import')

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/loan',
    name: 'Loan',
    children: [
      {
        path: 'loan',
        component: _import('loan/index')
      }
    ]
  },
  {
    path: '/todo',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Todo',
        component: _import('todo/index')
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Personal',
        component: _import('personal/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: _import('login/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: _import('register/index')
  },
  {
    path: '*',
    name: '404',
    component: _import('404')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: _import('setting/index')
  },
  {
    path: '/borrow',
    name: 'Borrow',
    component: _import('borrow/index')
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
