import Mock from 'mockjs'

const loginData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    userId: '@id',
    merchantId: 1,
    uname: '@cname',
    userToken: '@guid',
    headimg: '@IMG(30x30)'
  }
})

const init = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    shareLink: '',
    qrcodeLink: 'http://youxin.51morecash.com/api/wap/wenti-jk',
    agreementLink: 'http://youxin.51morecash.com/api/wap/wenti-jk',
    about: 'http://youxin.51morecash.com/api/wap/wenti-jk',
    lenderQuestionLink: 'http://youxin.51morecash.com/api/wap/wenti-jk',
    loanerQuestionLink: 'http://youxin.51morecash.com/api/wap/wenti-jk',
    lenderRegisterLink: 'http://youxin.51morecash.com/api/wap/wenti-jk',
    loanerRegisterLink: 'http://youxin.51morecash.com/api/wap/wenti-jk',
    userInfo: {
      userId: 0,
      merchantId: 0,
      userName: '',
      userToken: '',
      headimg: '',
      authIdCard: 'false',
      realName: '',
      userCardNo: ''
    }
  }
})

export default {
  login: config => loginData,
  init: config => init
}
