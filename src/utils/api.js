import Axios from 'axios'
import URLSearchParams from 'url-search-params'
import store from '../store'
import { getToken, getUserId } from './auth'
import signUtil from './sign'

const service = Vue => {
  const axios = Axios.create({
    // baseURL: 'http://youxin.51morecash.com',
    timeout: 15000,
    headers: {
      osType: 'h5',
      merchantId: 1,
      appVersion: 1.0
    }
  })

  axios.interceptors.request.use(
    config => {
      if (store.getters.token) {
        config.headers['userToken'] = getToken()
        config.headers['userId'] = getUserId()
      }
      if (config.method.toLowerCase() === 'get') {
        if (!config.params) config.params = {}
        Object.assign(config.params, {
          merchantId: 1,
          timestamp: +new Date()
        })
        let signData = signUtil(config.params)
        Object.assign(config.params, {
          sign: signData
        })
      }
      if (config.method.toLowerCase() === 'post') {
        if (!config.data) config.data = {}

        Object.assign(config.data, {
          merchantId: 1,
          timestamp: +new Date()
        })
        let signData = signUtil(config.data)
        Object.assign(config.data, {
          sign: signData
        })
      }
      const dataParams = new URLSearchParams()
      for (let key in config.data) {
        dataParams.append(key, config.data[key])
      }
      config.data = dataParams
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
        if (res.resultCode !== 4123) Vue.$vux.toast.text(res.resultMsg)
        return Promise.reject(res)
      } else {
        return res.data
      }
    },
    error => {
      console.log('err: ' + error)
      Vue.$vux.toast.text(error.message)
      return Promise.reject(error)
    }
  )
  return axios
}

export default service
