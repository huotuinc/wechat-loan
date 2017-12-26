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
    qrcodeLink: 'https://m.y.qq.com/',
    agreementLink: 'https://m.y.qq.com/',
    about: 'https://m.y.qq.com/',
    lenderQuestionLink: 'https://m.y.qq.com/',
    loanerQuestionLink: 'https://m.y.qq.com/',
    lenderRegisterLink: 'https://m.y.qq.com/',
    loanerRegisterLink: 'https://m.y.qq.com/',
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
