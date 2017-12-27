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
    lenderUserName: '13767671212',
    loanerUserName: '13565652323',
    needAuth: '@boolean',
    authStatus: '@boolean',
    grantTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    agreedRepayTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    repayTimeDays: '@integer(-30, 30)',
    loanerUserId: '@id',
    remarks: '@ctitle(10,20)',
    repayType: '@pick(["等额本息","还本付息"])',
    repayTypeName: '@pick(["等额本息","还本付息"])',
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
        payType: 3,
        name: '微信',
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

const receiveOrder = Mock.mock({
  resultCode: 4123,
  resultMsg: '用户未完成认证',
  data: {
    userId: '@id',
    merchantId: 1,
    uname: '@cname',
    userToken: '@guid',
    headimg: '@IMG(30x30)'
  }
})

const getLoansProductInfo = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    loanId: '@id',
    orderName: '@name',
    orderStatus: '@pick(["待审核","待还款","已拒绝","已完成","已取消","已逾期"])',
    grantStatus: '@integer(1, 6)',
    loanAmount: '@float(10000, 99999, 2, 2)',
    payAmount: '@float(99999, 100000, 2, 2)',
    interestAmount: '@float(100, 500, 2, 2)',
    loanDayHtml: '@integer(1, 30)',
    overdueRate: '@float(0.1, 0.9, 1, 1)',
    repayAmount: '@float(99999, 100000, 2, 2)',
    overdueAmount: '@float(100, 500, 2, 2)',
    lenderUserName: '13767671212',
    loanerUserName: '13565652323',
    needAuth: '@boolean',
    authStatus: '@boolean',
    grantTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    agreedRepayTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    repayTimeDays: '@integer(-30, 30)',
    loanerUserId: '@id',
    remarks: '@ctitle(10,20)',
    repayType: '@pick(["等额本息","还本付息"])',
    repayTypeName: '@pick(["等额本息","还本付息"])',
    repayTypeCode: '@integer(0, 1)',
    monthRepayMoney: '@float(100, 500, 2, 2)'
  }
})

const templateData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    jfUserName: '1',
    jfIdCardNo: '12154545',
    jfMobile: '吴系挂',
    yfUserName: 2,
    yfIdCardNo: '1436864169',
    yfMobile: '0',
    loanMoney: '0',
    loanDate: '0',
    refundMode: '0',
    refundDate: '0',
    refundTotalAmount: '0',
    annualRate: '0',
    authDate: '0'
  }
})
export default {
  getOrderInfo: config => getorderinfoData,
  getRepayDetail: config => getRepayDetailData,
  getOrderNotice: config => orderNotice,
  checkout: config => checkoutData,
  createOrder: config => createOrder,
  checkPayment: config => checkPayment,
  sendPayment: config => sendPayment,
  receiveOrder: config => receiveOrder,
  getLoansProductInfo: config => getLoansProductInfo,
  templateData: config => templateData
}
