import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

const _import = require('./_import')

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        alias: '/loan',
        name: 'Loan',
        component: _import('loan/index'),
        meta: {
          title: '过海有信',
          auth: false
        }
      },
      {
        path: 'publish',
        name: 'Publish',
        component: _import('loan/LoanPublish'),
        meta: {
          title: '我要借款',
          auth: true
        }
      },
      {
        path: 'publishList',
        name: 'PublishList',
        component: _import('loan/LoanPublishList'),
        meta: {
          title: '发布',
          auth: true
        }
      },
      {
        path: 'applyList',
        name: 'ApplyList',
        component: _import('personal/ApplyLogs'),
        meta: {
          title: '借款申请记录',
          auth: true
        }
      },
      {
        path: 'personal',
        name: 'Personal',
        component: _import('personal/index'),
        meta: {
          title: '个人中心',
          auth: true
        }
      }
    ]
  },
  {
    path: '/lender/:lenderId/lend/:lendId',
    name: 'Lender',
    component: _import('loan/Lender'),
    meta: {
      title: '出借人信息',
      auth: true
    }
  },
  {
    path: '/subscribe/:lenderId/lend/:lendId',
    name: 'Subscribe',
    component: _import('loan/LoanPublish'),
    meta: {
      title: '我要借款',
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: _import('login/index'),
    meta: {
      title: '登录',
      auth: false
    }
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: _import('express/login'),
    meta: {
      title: '登录',
      auth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: _import('register/index'),
    meta: {
      title: '用户注册',
      auth: false
    }
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: _import('express/register'),
    meta: {
      title: '用户注册',
      auth: false
    }
  },
  {
    path: '/forget',
    name: 'Forget',
    component: _import('forget/index'),
    meta: {
      title: '忘记密码',
      auth: false
    }
  },
  {
    path: '/findPassword',
    name: 'Password',
    component: _import('express/register'),
    meta: {
      title: '忘记密码',
      auth: false
    }
  },
  {
    path: '/orderList',
    component: _import('order/index'),
    children: [
      {
        path: '',
        name: 'All',
        component: _import('order/OrderAll'),
        meta: {
          title: '我的借款',
          auth: true
        }
      },
      {
        path: 'pending',
        name: 'Pending',
        component: _import('order/OrderPending'),
        meta: {
          title: '待审核',
          auth: true
        }
      },
      {
        path: 'repayment',
        name: 'Repayment',
        component: _import('order/OrderRepayment'),
        meta: {
          title: '待还款',
          auth: true
        }
      },
      {
        path: 'overdue',
        name: 'Overdue',
        component: _import('order/OrderOverdue'),
        meta: {
          title: '已逾期',
          auth: true
        }
      },
      {
        path: 'complete',
        name: 'Complete',
        component: _import('order/OrderComplete'),
        meta: {
          title: '已完成',
          auth: true
        }
      }
    ]
  },
  {
    path: '/message',
    component: _import('message/index'),
    children: [
      {
        path: 'todo',
        name: 'Todo',
        component: _import('message/Todo'),
        meta: {
          title: '待处理',
          auth: true
        }
      },
      {
        path: 'notice',
        name: 'Notice',
        component: _import('message/Notice'),
        meta: {
          title: '通知',
          auth: true
        }
      }
    ]
  },
  {
    path: '/announce',
    name: 'Announce',
    component: _import('message/Announce'),
    meta: {
      title: '公告',
      auth: true
    }
  },
  {
    path: '/orderInfo/:orderId',
    name: 'OrderInfo',
    component: _import('order/OrderInfo'),
    meta: {
      title: '借款信息',
      auth: true
    }
  },
  {
    path: '/installment/:orderId',
    name: 'Installment',
    component: _import('installment/index'),
    meta: {
      title: '每月还款金额',
      auth: true
    }
  },
  {
    path: '/payment/:tradeType',
    name: 'Payment',
    component: _import('payment/index'),
    meta: {
      title: '支付',
      auth: true
    }
  },
  {
    path: '/payment/:tradeType/:orderId',
    name: 'PaymentWithId',
    component: _import('payment/index'),
    meta: {
      title: '支付',
      auth: true
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: _import('setting/index'),
    meta: {
      title: '系统设置',
      auth: true
    }
  },
  {
    path: '/question',
    name: 'Question',
    component: _import('setting/Question'),
    meta: {
      title: '常见问题',
      auth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: _import('setting/About'),
    meta: {
      title: '关于我们',
      auth: false
    }
  },
  {
    path: '/protocol',
    name: 'Protocol',
    component: _import('setting/Protocol'),
    meta: {
      title: '平台协议',
      auth: false
    }
  },
  {
    path: '/download',
    name: 'Download',
    component: _import('download/index'),
    meta: {
      title: '软件下载',
      auth: false
    }
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: _import('authentication/index'),
    meta: {
      title: '信用认证',
      auth: true
    }
  },
  {
    path: '/invite',
    name: 'Invite',
    component: _import('authentication/Invite'),
    meta: {
      title: '快来征信',
      auth: false
    }
  },
  {
    path: '/authSuccess',
    name: 'AuthSuccess',
    component: _import('authentication/Success'),
    meta: {
      title: '认证完成',
      auth: false
    }
  },
  {
    path: '/treaty/:orderId',
    name: 'Treaty',
    component: _import('treaty/index'),
    meta: {
      title: '借款条约',
      auth: true
    }
  },
  {
    path: '/basicInfo',
    name: 'BasicInfo',
    component: _import('basicInfo/index'),
    meta: {
      title: '基本信息认证',
      auth: true
    }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: _import('contacts/index'),
    meta: {
      title: '联系人信息',
      auth: true
    }
  },
  {
    path: '/identity',
    name: 'Identity',
    component: _import('identity/index'),
    meta: {
      title: '身份证识别',
      auth: true
    }
  },
  {
    path: '/credit',
    component: _import('credit/index'),
    children: [
      {
        path: '',
        name: 'CreditInfo',
        component: _import('credit/info'),
        meta: {
          title: '认证信息',
          auth: true
        }
      },
      {
        path: 'report',
        name: 'CreditReport',
        component: _import('credit/report'),
        meta: {
          title: '信用信息',
          auth: true
        }
      }
    ]
  },
  {
    path: '/riskCall',
    name: 'RiskCall',
    component: _import('record/RiskCall'),
    meta: {
      title: '风险通话记录',
      auth: true
    }
  },
  {
    path: '/emergency',
    name: 'Emergency',
    component: _import('record/EmergencyContact'),
    meta: {
      title: '紧急联系人通话',
      auth: true
    }
  },
  {
    path: '/consume',
    name: 'ConsumeBill',
    component: _import('record/ConsumeBill'),
    meta: {
      title: '缴费记录',
      auth: true
    }
  },
  {
    path: '/shareOrder',
    name: 'ShareOrderByOne',
    component: _import('receive/index'),
    meta: {
      title: '领取',
      auth: false
    }
  },
  {
    path: '/success',
    name: 'ReceiveSuccess',
    component: _import('receive/Success'),
    meta: {
      title: '领取成功',
      auth: false
    }
  },
  {
    path: '/case',
    name: 'Case',
    component: _import('case/index'),
    meta: {
      title: '过海有信',
      auth: false
    }
  },
  {
    path: '/log/:orderId',
    name: 'Log',
    component: _import('logs/index'),
    meta: {
      title: '日志',
      auth: true
    }
  },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: _import('setting/test'),
  //   meta: {
  //     title: '测试'
  //   }
  // },
  {
    path: '/feedback',
    name: 'Feedback',
    component: _import('feedback/index'),
    meta: {
      title: '问题反馈',
      auth: true
    }
  },
  {
    path: '/follow',
    name: 'Follow',
    component: _import('follow/index'),
    meta: {
      title: '关注我们',
      auth: false
    }
  },
  {
    path: '/splash',
    name: 'Splash',
    component: _import('splash/index'),
    meta: {
      title: '关注我们',
      auth: false
    }
  },
  {
    path: '/third/case',
    name: 'T-Case',
    component: _import('third/Case'),
    meta: {
      title: '拿去花',
      auth: false
    }
  },
  {
    path: '/third/login',
    name: 'T-Login',
    component: _import('third/Login'),
    meta: {
      title: '登录',
      auth: false
    }
  },
  {
    path: '/third/register',
    name: 'T-Register',
    component: _import('third/Register'),
    meta: {
      title: '注册',
      auth: false
    }
  },
  {
    path: '/third/forget',
    name: 'T-Forget',
    component: _import('third/Register'),
    meta: {
      title: '忘记密码',
      auth: false
    }
  },
  {
    path: '/404',
    name: '404',
    component: _import('404'),
    meta: {
      title: '404',
      auth: false
    }
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/fake',
    name: 'Fake',
    component: _import('fake/Fake'),
    meta: {
      title: '修改信息'
    }
  },
  {
    path: '/fake/update',
    name: 'FakeUpdate',
    component: _import('fakeupdate/FakeUpdate'),
    meta: {
      title: '个人信息'
    }
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
