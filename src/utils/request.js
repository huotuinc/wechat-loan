import { AjaxPlugin, Toast } from 'vux'
import { getUserInfo } from '@/utils/auth'
import sign from './sign'

const { userId, merchantId, token } = getUserInfo()

const service = AjaxPlugin.$http.create({
  // baseURL: 'http://localhost:5000',
  timeout: 15000
})
service.interceptors.request.use(
  config => {
    if (token) {
      config.headers = {
        userToken: token,
        osType: 'h5',
        userId: userId,
        merchantId: merchantId,
        timestamp: +new Date(),
        sign: sign()
      }
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.resultCode !== 2000) {
      Toast.show({
        text: res.resultMsg,
        type: cancel
      })
      return Promise.reject(new Error(res.resultMsg))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    // Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
