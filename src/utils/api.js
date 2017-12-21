import { AjaxPlugin } from 'vux'
import { getUserInfo } from '@/utils/auth'
import sign from './sign'

const { userId, merchantId, token } = getUserInfo()

const service = Vue => {
  const axios = AjaxPlugin.$http.create({
    // baseURL: 'http://localhost:5000',
    timeout: 15000
  })
  axios.interceptors.request.use(
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

  axios.interceptors.response.use(
    response => {
      const res = response.data
      if (res.resultCode !== 2000) {
        Vue.$vux.toast.text(res.resultMsg)
        return Promise.reject(new Error(res.resultMsg))
      } else {
        return res.data
      }
    },
    error => {
      console.log('err' + error)
      Vue.$vux.toast.text(error.message)
      return Promise.reject(error)
    }
  )
  return axios
}

export default service
