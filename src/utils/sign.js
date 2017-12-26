import store from '../store'
import { md5 } from 'vux'
import _ from 'lodash'
import { getUserInfo } from './auth'
const validKey = ['merchantId', 'userId', 'userToken', 'cityName', 'cityCode', 'timestamp']
const secretKey = '4165a8d240b29af3f41818d10599d0d1'

const raw = args => {
  // 规避非驼峰问题
  const newObj = {}
  for (let o in args) {
    newObj[o.toLowerCase()] = args[o]
  }
  let keys = Object.keys(newObj)

  keys = keys.sort()

  let newArgs = {}
  keys.forEach(key => {
    newArgs[key.toLowerCase()] = newObj[key]
  })

  let string = ''
  for (let k in newArgs) {
    string += k + newArgs[k]
  }
  return string
}

const sign = data => {
  let signParams = data || {}
  let userInfo = getUserInfo()
  // 过滤空值
  for (let info in userInfo) {
    if (!(validKey.indexOf(info) > -1 && userInfo[info] !== '')) {
      delete userInfo[info]
    }
  }
  Object.assign(signParams, userInfo)
  return md5(raw(signParams) + secretKey)
}
export default sign
