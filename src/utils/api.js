import Axios from 'axios'
import URLSearchParams from 'url-search-params'
import { getUserInfo } from '@/utils/auth'
import sign from './sign'

const service = Vue => {
  const { userId, merchantId, userToken } = getUserInfo()

  const axios = Axios.create({
    baseURL: 'http://localhost:8999',
    timeout: 15000
  })
  axios.defaults.headers['osType'] = 'h5'
  axios.defaults.headers['merchantId'] = 1

  const { userId, merchantId, userToken } = getUserInfo()

  axios.interceptors.request.use(
    config => {
      if (userToken) {
<<<<<<< HEAD
=======
        console.log("here");
>>>>>>> 870bf9e3c4f01ceb7b9861f4fe3f96c746ae6162
        config.headers = {
          userToken: userToken,
          userId: userId,
          timestamp: +new Date(),
          sign: sign(),
          osType: 'h5',
          merchantId: 1
        }
      }
      const params = new URLSearchParams()
      for (let key in config.data) {
        params.append(key, config.data[key])
      }
      config.data = params
      console.log(config)
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
