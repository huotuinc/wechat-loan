import Mock from 'mockjs'
import globalData from '../global'

const loginData = Mock.mock({
  data: {
    userId: '@id',
    merchantId: '@id',
    uname: '@cname',
    userToken: '@guid',
    headimg: '@IMG(30x30)'
  }
})

export default {
  login: config => Object.assign(globalData, loginData)
}
