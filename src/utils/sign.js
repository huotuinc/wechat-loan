import store from '../store'
import { md5 } from 'vux'
const validKey = ['merchantId', 'userId', 'userToken', 'cityName', 'cityCode', 'timestamp']
const secretKey = '4165a8d240b29af3f41818d10599d0d1'

const raw = args => {
  let keys = Object.keys(args)
  keys = keys.filter(key => {
    return validKey.indexOf(key) > -1 && args[key] !== ''
  })
  keys = keys.sort()
  let newArgs = {}
  keys.forEach(key => {
    newArgs[key.toLowerCase()] = args[key]
  })

  let string = ''
  for (let k in newArgs) {
    string += k + newArgs[k]
  }
  return string
}

const sign = () => {
  let userInfo = store.getters.userInfo
  if (!userInfo) userInfo = {}
  userInfo.timestamp = +new Date()
  return md5(raw(userInfo) + secretKey)
}
export default sign
