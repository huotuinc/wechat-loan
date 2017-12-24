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
    merchantId: '@id',
    uname: '@cname',
    token: '@guid'
  }
})
export default {
  sendCode: config => sendData,
  register: config => registerData
}
