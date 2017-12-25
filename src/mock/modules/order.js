import Mock from 'mockjs'

const getorderinfoData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    orderId: '@id',
    orderName: '@name',
    orderStatus: '@pick(["待审核","待还款","已拒绝","已完成","已取消","已逾期"])',
    grantStatus: '@integer(1, 6)',
    loanAmount: '@float(10000, 99999, 2, 2)',
    payAmount: '@float(99999, 100000, 2, 2)',
    interestAmount: '@float(100, 500, 2, 2)',
    loanDay: '@integer(1, 30)',
    overdueRate: '@float(0.1, 0.9, 1, 1)',
    repayAmount: '@float(99999, 100000, 2, 2)',
    overdueAmount: '@float(100, 500, 2, 2)',
    lenderUserName: '@cname',
    loanerUserName: '@cname',
    needAuth: '@boolean',
    authStatus: '@boolean',
    grantTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    agreedRepayTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    repayTimeDays: '@integer(-30, 30)',
    loanerUserId: '@id',
    remarks: '@string(10,20)',
    repayType: '@pick(["等额本息","还本付息"])',
    repayTypeCode: '@integer(0, 1)',
    monthRepayMoney: '@float(100, 500, 2, 2)'
  }
})

const getRepayDetailData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: [
    {
      repayDate: '2017-12-22',
      payAmount: '@float(99999, 100000, 2, 2)',
      amount: '@float(99999, 100000, 2, 2)',
      interestAmount: '@float(100, 500, 2, 2)'
    },
    {
      repayDate: '@DATETIME("yyyy-MM-dd")',
      payAmount: '@float(99999, 100000, 2, 2)',
      amount: '@float(99999, 100000, 2, 2)',
      interestAmount: '@float(100, 500, 2, 2)'
    },
    {
      repayDate: '@DATETIME("yyyy-MM-dd")',
      payAmount: '@float(99999, 100000, 2, 2)',
      amount: '@float(99999, 100000, 2, 2)',
      interestAmount: '@float(100, 500, 2, 2)'
    },
    {
      repayDate: '@DATETIME("yyyy-MM-dd")',
      payAmount: '@float(99999, 100000, 2, 2)',
      amount: '@float(99999, 100000, 2, 2)',
      interestAmount: '@float(100, 500, 2, 2)'
    },
    {
      repayDate: '@DATETIME("yyyy-MM-dd")',
      payAmount: '@float(99999, 100000, 2, 2)',
      amount: '@float(99999, 100000, 2, 2)',
      interestAmount: '@float(100, 500, 2, 2)'
    }
  ]
})

const orderNotice = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  'data|0-5': [
    {
      noticeTitle: '@ctitle',
      noticeContent: '@csentence',
      noticeActTime: '@datetime',
      orderId: '@id',
      lendOrder: true
    }
  ]
})

const checkoutData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    userId: '@id',
    userBalance: '@float(100, 500, 2, 2)',
    finalAmount: 3,
    payments: [
      {
        payType: 0,
        name: '支付宝',
        remark: '@string(10,20)'
      },
      {
        payType: 2,
        name: '余额',
        remark: '@string(10,20)'
      }
    ]
  }
})

const createOrder = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    orderNo: '@id',
    payType: 1,
    tradeType: 1,
    surplusAmount: 100,
    bizParameters: {
      returnUrl: 'http://xxx.com/alipay/return/order-A20171213123412345566',
      wapPayUrl: 'http://baidu.com',
      bizPackage: 'sdsd=asdfsd&sadfasdf=asdfsd&sign=sdfsadkfjkjksd'
    }
  }
})

const checkPayment = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    hasPayed: '@boolean',
    receiveEmail: '@email'
  }
})

const sendPayment = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {}
})

export default {
  getOrderInfo: config => getorderinfoData,
  getRepayDetail: config => getRepayDetailData,
  getOrderNotice: config => orderNotice,
  checkout: config => checkoutData,
  createOrder: config => createOrder,
  checkPayment: config => checkPayment,
  sendPayment: config => sendPayment
}
