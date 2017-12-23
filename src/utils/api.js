import Axios from 'axios'
import URLSearchParams from 'url-search-params'
import store from '../store'
import { getToken, getUserId } from './auth'
import sign from './sign'

const service = Vue => {
  const axios = Axios.create({
    baseURL: 'http://localhost:8999',
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
        if (!config.params) config.params = {}
        config.params['sign'] = sign()
        config.params['timestamp'] = +new Date()
        config.headers['userToken'] = getToken()
        config.headers['userId'] = getUserId()
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
