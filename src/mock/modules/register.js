import Mock from 'mockjs'

const sendData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {}
})

const registerData = Mock.mock({
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

const forgerPass = Mock.mock({ resultCode: 2000, resultMsg: '操作成功', data: null })
export default {
  sendCode: config => sendData,
  register: config => registerData,
  forgerPass: config => forgerPass
}
