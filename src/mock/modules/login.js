import Mock from 'mockjs'
import globalData from '../global'

const loginData = Mock.mock({
  data: {
    userInfo: {
      userId: '@id',
      merchantId: '@id',
      uname: '@cname',
      token: '@guid'
    }
  }
})

export default {
  login: config => Object.assign(globalData, loginData)
}
