import store from '../store'
import { md5 } from 'vux'
import { getUserInfo } from './auth'
const validKey = ['merchantId', 'userId', 'userToken', 'cityName', 'cityCode', 'timestamp']
const secretKey = '4165a8d240b29af3f41818d10599d0d1'

const raw = args => {
  let keys = Object.keys(args)
  // keys = keys.filter(key => {
  //   return validKey.indexOf(key) > -1 && args[key] !== ''
  // })
  keys = keys.sort()
  let newArgs = {}
  keys.forEach(key => {
    newArgs[key.toLowerCase()] = args[key]
  })

  let string = ''
  for (let k in newArgs) {
    string += k + newArgs[k]
  }
  console.log(string)
  return string
}

const sign = data => {
  let signParams = data
  let userInfo = getUserInfo()
  for (let info in userInfo) {
    if (!(validKey.indexOf(info) > -1 && userInfo[info] !== '')) {
      delete userInfo[info]
    }
  }
  // keys = keys.filter(key => {
  //   return validKey.indexOf(key) > -1 && args[key] !== ''
  // })

  Object.assign(signParams, userInfo)
  console.log(signParams)
  return md5(raw(signParams) + secretKey)
}
export default sign
