import Mock from 'mockjs'

const loginData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    userId: '@id',
    merchantId: '@id',
    uname: '@cname',
    userToken: '@guid',
    headimg: '@IMG(30x30)'
  }
})

export default {
  login: config => loginData
}
