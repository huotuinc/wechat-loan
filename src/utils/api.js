import Axios from 'axios'
import URLSearchParams from 'url-search-params'
import { getUserInfo } from '@/utils/auth'
import sign from './sign'

const { userId, merchantId, token } = getUserInfo()

const service = Vue => {
  const axios = Axios.create({
    // baseURL: 'http://localhost:5000',
    timeout: 15000
  })
  axios.defaults.headers['osType'] = 'h5'
  axios.defaults.headers['merchantId'] = '1'

  axios.interceptors.request.use(
    config => {
      if (token) {
        config.headers = {
          userToken: token,
          userId: userId,
          timestamp: +new Date(),
          sign: sign()
        }
      }
      const params = new URLSearchParams()
      for (let key in config.data) {
        params.append(key, config.data[key])
      }
      config.data = params
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
