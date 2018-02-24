import Mock from 'mockjs'
import loginApi from './modules/login'
import loanApi from './modules/loan'
import userApi from './modules/user'
import registerApi from './modules/register'
import borrowApi from './modules/borrow'
import authenticationApi from './modules/authentication'
import orderApi from './modules/order'
import uploader from './modules/uploader'
import record from './modules/record'

// 模拟服务器延迟
Mock.setup({
  timeout: '400-1000'
})

// 登录相关
Mock.mock(/\/api\/user\/login/, 'post', loginApi.login)
Mock.mock(/\/api\/sys\/init/, 'post', loginApi.init)
//发送验证码
Mock.mock(/\/api\/user\/sendVerifyCode/, 'post', registerApi.sendCode)
//注册
Mock.mock(/\/api\/user\/register/, 'post', registerApi.register)
Mock.mock(/\/api\/user\/updatePassword/, 'post', registerApi.forgerPass)

//我要借款
Mock.mock(/\/api\/borrow\/saveInfo/, 'post', borrowApi.saveInfo)
Mock.mock(/\/api\/borrow\/list/, 'get', {
  resultCode: 2000,
  resultMsg: 'OK',
  'data|10': [
    {
      id: '@id',
      userName: '17833457534',
      headimg: 'http://iph.href.lu/80x80?text=%E5%B8%B8',
      name: '@name',
      money: '@integer(100, 1000)',
      interval: '@integer(1, 2)',
      statusCode: 2,
      statusMsg: '已取消',
      purpose: '其他',
      cancelable: '@boolean',
      createTime: '@datetime'
    }
  ]
})
Mock.mock(/\/api\/borrow\/cancel/, 'post', borrowApi.cancel)

//信用认证
Mock.mock(/\/api\/authentication\/certificationAll/, 'post', authenticationApi.certificationAll)
//基本信息认证
Mock.mock(/\/api\/user\/userinfoedit/, 'post', authenticationApi.userinfoedit)
//联系人认证
Mock.mock(/\/api\/user\/editContacts/, 'post', authenticationApi.editcontacts)
//运营商认证
Mock.mock(/\/api\/user\/authOperator/, 'post', authenticationApi.authoperator)
//芝麻认证
Mock.mock(/\/api\/authentication\/getSesameUrl/, 'post', authenticationApi.getSesameUrl)
// 是否支付
Mock.mock(/\/api\/authentication\/checkIsPay/, 'post', authenticationApi.isPay)
Mock.mock(/\/api\/authentication\/identityHtmlBase/, 'post', authenticationApi.authUpload)

Mock.mock(/\/api\/user\/report\/certificationInfo/, 'post', authenticationApi.certificationInfo)
Mock.mock(/\/api\/user\/report\/creditReport/, 'post', authenticationApi.creditReport)

// 借款相关
Mock.mock(/\/api\/user\/index/, 'get', loanApi.index)
Mock.mock(/\/api\/user\/uploadImage/, 'post', {
  resultCode: 2000,
  resultMsg: '操作成功',
  data: {
    imageUrl: 'http://cdn1.51morecash.com/image/template/1/idcard/36/back-20180120135983.jpg'
  }
})
// 借款单详情
Mock.mock(/\/api\/order\/getOrderInfo/, 'get', orderApi.getOrderInfo)
Mock.mock(/\/api\/order\/getLoansProductInfo/, 'get', orderApi.getLoansProductInfo)
Mock.mock(/\/api\/order\/getOrderNotice/, 'get', orderApi.getOrderNotice)

// 用户相关
Mock.mock(/\/api\/user\/userIndex/, 'get', userApi.personal)

Mock.mock(/\/api\/borrow\/hybrid\/cases/, 'post', userApi.cases)
// 每月还款金额
Mock.mock(/\/api\/order\/getRepayDetail/, 'get', orderApi.getRepayDetail)
//查询电子签章的支付信息
Mock.mock(/\/api\/unifiedorder\/checkout/, 'post', orderApi.checkout)

Mock.mock(/\/api\/unifiedorder\/create/, 'post', orderApi.createOrder)
Mock.mock(/\/api\/order\/receiveOrder/, 'post', orderApi.receiveOrder)
Mock.mock(/\/api\/order\/receiveLoanOrder/, 'post', orderApi.receiveOrder)

Mock.mock(/\/api\/user\/esign\/templateData/, 'get', orderApi.templateData)
Mock.mock(/\/api\/order\/getOrderLog/, 'get', orderApi.orderLog)

Mock.mock(/\/api\/order\/getOrderList/, 'post', {
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    totalAmount: 1000,
    'orderList|10': [
      {
        orderId: '@id',
        orderName: '借给***的借条',
        headImgURL: 'http://iph.href.lu/80x80?text=%E5%B8%B8',
        userName: '13765281632',
        userRealName: '@cname',
        needAuth: true,
        authSuccess: true,
        loanAmount: '@float(1000, 9999, 2, 2)',
        overdueRate: '@float(1, 10, 2, 2)',
        createTime: '@datetime',
        grantTime: '@datetime',
        agreedRepayTime: '@datetime(yyyy-MM-dd)',
        grantStatus: '@pick([2,3,4,5,6,7])',
        grantStatusMsg: '@pick(["待审核","已拒绝","待还款","已逾期","已完成","已取消"])',
        overdueDay: '@integer(1, 30)',
        overdueAmount: '@float(1000, 9999, 2, 2)',
        rePayedAmount: '@float(1, 10, 2, 2)',
        RepayTypeName: '等额本息'
      }
    ]
  }
})

Mock.mock(/\/api\/user\/esign\/checkPayment/, 'post', orderApi.checkPayment)
Mock.mock(/\/api\/user\/esign\/send/, 'post', orderApi.sendPayment)

Mock.mock(/\/api\/user\/uploadHeadImg/, 'post', uploader.avatar)
Mock.mock(/\/api\/authentication\/identityHtml/, 'post', uploader.identity)

Mock.mock(/\/api\/user\/report\/riskCallList/, 'post', record.riskCallList)
Mock.mock(/\/api\/user\/report\/emergencyContactList/, 'post', record.emergencyContactList)
Mock.mock(/\/api\/user\/report\/consumeBillList/, 'post', record.consumeBillList)

Mock.mock(/\/api\/user\/lenderDetail/, 'post', {
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    userInfo: {
      userId: 0,
      realName: '张三',
      mobile: '13000000000',
      nums: 10,
      friend: '@boolean',
      headimg: 'http://cdn1.51morecash.com/image/1/head/29/20180120134903.png'
    }
  }
})

Mock.mock(/\/api\/sys\/getMessageCount/, 'get', {
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    countNum: '@integer(10, 999)'
  }
})

Mock.mock(/\/api\/user\/lenderList/, 'post', {
  resultCode: 2000,
  resultMsg: '操作成功',
  data: {
    'list|9-10': [
      {
        lendId: '@id',
        lenderId: 51,
        lenderName: '@cname',
        lenderHeadimg: 'http://cdn1.51huotao.com/superloan/image/1/head/51/20180129170592.png',
        lendAmount: '5000-10000',
        lendDays: '14天-1个月',
        interestRate: 24.0,
        receivedCount: 1,
        lendStatus: 1,
        lendStatusHtml: '上架',
        repayType: '一次偿还本息',
        endTimeHtml: '1天后到期',
        applyStatus: 0
      }
    ]
  }
})

Mock.mock(/\/api\/lend\/lendInfo/, 'post', {
  resultCode: 2000,
  resultMsg: '操作成功',
  data: {
    lendId: 26,
    lenderId: 51,
    lenderName: '陈洁',
    lenderHeadimg: 'http://cdn1.51huotao.com/superloan/image/1/head/51/20180129170592.png',
    lendAmount: '300-3000',
    lendDays: '1-7天',
    interestRate: 24.0,
    receivedCount: 1,
    lendStatus: 1,
    lendStatusHtml: '上架',
    repayType: '一次偿还本息',
    endTimeHtml: '1天后到期',
    applyStatus: 0
  }
})

Mock.mock(/\/api\/sys\/getAnnouceList/, 'post', {
  resultCode: 2000,
  resultMsg: 'OK',
  'data|10': [
    {
      annId: '@id',
      title: '@ctitle',
      infoType: '@pick([6,8])',
      createTime: '2017-11-12 11:22：45'
    }
  ]
})
Mock.mock(/\/api\/sys\/getAnnouceInfo/, 'get', {
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    annId: '@id',
    title: '@ctitle',
    content: '@cparagraph',
    createTime: '2017-11-12 11:22：45'
  }
})
// 是否是免费用户
Mock.mock(/\/api\/authentication\/checkFree/, 'post', {
  resultCode: 2000,
  resultMsg: 'OK',
  data: '@boolean'
})
