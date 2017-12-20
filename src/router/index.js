import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

const _import = require('./_import')

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    alias: '/loan',
    name: 'Loan',
    component: _import('loan/index'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/todo',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Todo',
        component: _import('todo/index'),
        meta: {
          title: '待办事项'
        }
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
        component: _import('personal/index'),
        meta: {
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: _import('login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: _import('register/index'),
    meta: {
      title: '用户注册'
    }
  },
  {
    path: '/forget',
    name: 'Forget',
    component: _import('forget/index'),
    meta: {
      title: '忘记密码'
    }
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
  },
  {
    path: '/download',
    name: 'Download',
    component: _import('download/index')
  },
  {
    path: '/borrowInfo',
    name: 'BorrowInfo',
    component: _import('borrow-info/index')
  },
  {
    path: '/authenticationList',
    name: 'AuthenticationList',
    component: _import('authentication-list/index')
  },
  {
    path: '/basicInfo',
    name: 'BasicInfo',
    component: _import('basic-info/index')
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: _import('contacts/index')
  },
  {
    path: '*',
    name: '404',
    component: _import('404'),
    meta: {
      title: '404'
    }
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
