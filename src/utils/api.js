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
    },
    params: {}
  })

  axios.interceptors.request.use(
    config => {
      if (store.getters.token) {
        config.headers['userToken'] = getToken()
        config.headers['userId'] = getUserId()
      }

      if (config.method.toLowerCase() === 'get') {
        config.params['merchantId'] = 1
        config.params['timestamp'] = +new Date()
        signUtil(config.params)
      }
      if (config.method.toLowerCase() === 'post') {
        config.data['merchantId'] = 1
        config.data['timestamp'] = +new Date()
        console.log(config.data)
        signUtil(config.data)
      }
      // const params = new URLSearchParams()
      // for (let key in config.data) {
      //   params.append(key, config.data[key])
      // }
      // config.data = params

      // signUtil(config.params)
      // console.log(config)
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
