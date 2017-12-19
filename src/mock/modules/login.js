import Mock from 'mockjs'
import globalData from '../global'

const loginData = Mock.mock({
  data: {
    userInfo: {
      userId: '@id',
      merchantId: '@id',
      uname: '@cname',
      token: '@guid',
      headimg:'@IMG(30x30)'
    }
  }
})

export default {
  login: config => Object.assign(globalData, loginData)
}
