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
    path: '/publish',
    name: 'Publish',
    component: _import('loan/LoanPublish'),
    meta: {
      title: '我要借款'
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
    path: '/loanList',
    component: Layout,
    children: [
      {
        path: '',
        name: 'LoanList',
        component: _import('loan/LoanList'),
        meta: {
          title: '我的借款'
        }
      }
    ]
  },
  {
    path: '/loanInfo',
    name: 'LoanInfo',
    component: _import('loan/LoanInfo'),
    meta: {
      title: '借款信息'
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: _import('setting/index')
  },
  {
    path: '/download',
    name: 'Download',
    component: _import('download/index')
  },
  {
    path: '/borrowInfo',
    component: _import('borrow-info/index')
  },
  {
    path: '/loanTreatyPage',
    name: 'LoanTreatyPage',
    component: _import('borrow-info/LoanTreatyPage')
  },
  {
    path: '/loanTreaty',
    name: 'LoanTreaty',
    component: _import('borrow-info/LoanTreaty')
  },
  {
    path: '/orderInfo/:orderId',
    name: 'OrderInfo',
    component: _import('borrow-info/LoanTreaty')
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
    path: '/repayDetail',
    name: 'RepayDetail',
    component: _import('borrow-info/RepayDetail')
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
