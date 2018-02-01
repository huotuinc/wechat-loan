import Mock from 'mockjs'

const loginData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    authIdCard: false,
    education: 1,
    headimg: 'http://cdn1.51morecash.com/image/1/head/29/20180120134903.png',
    homeAddress: null,
    marry: false,
    merchantId: 1,
    qq: null,
    realEstate: 3,
    realEstateType: 10,
    realName: null,
    userCardNo: null,
    userId: 29,
    userName: '15670007176',
    userToken: 'c21326b5-cbc7-4154-ad46-6e68e41a86bb',
    userType: 0
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
