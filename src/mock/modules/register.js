import Mock from 'mockjs'
import globalData from '../global'

const sendData = Mock.mock({
  data: {}
})

const registerData = Mock.mock({
  data: {
    userId: '@id',
    merchantId: '@id',
    uname: '@cname',
    token: '@guid'
  }
})
export default {
  sendCode: config => Object.assign(globalData, sendData),
  register: config => Object.assign(globalData, registerData)
}
