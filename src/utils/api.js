import Axios from 'axios'
import router from '../router'
import _ from 'lodash'
import qs from 'qs'
import { getToken, getUserId, removeToken, removeUserId, removeUserInfo } from './auth'
import signUtil from './sign'
import device from './device'

const noMsg = [4003, 4123, 4130]
const service = Vue => {
  const axios = Axios.create({
    // baseURL: 'http://192.168.1.48:8888',
    timeout: 15000,
    headers: {
      osType: 'h5',
      merchantId: 1,
      appVersion: '1.0.3',
      mobileType: device()
    }
  })

  axios.interceptors.request.use(
    config => {
      if (getToken()) {
        config.headers['userToken'] = getToken()
        config.headers['userId'] = getUserId()
      }
      if (config.method.toLowerCase() === 'get') {
        if (!config.params) config.params = {}
        _.assign(config.params, {
          merchantId: 1,
          timestamp: +new Date()
        })
        let signData = signUtil(config.params)
        _.assign(config.params, {
          sign: signData
        })
        delete config.params['merchantId']
      }
      if (config.method.toLowerCase() === 'post') {
        if (!config.data) config.data = {}

        _.assign(config.data, {
          merchantId: 1,
          timestamp: +new Date()
        })
        let signData = signUtil(config.data)
        _.assign(config.data, {
          sign: signData
        })
        delete config.data['merchantId']
      }

      config.data = qs.stringify(config.data)
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
        if (noMsg.indexOf(res.resultCode) === -1) {
          Vue.$vux.toast.text(res.resultMsg)
        }
        if (res.resultCode === 4003) {
          removeToken()
          removeUserId()
          removeUserInfo()
          Vue.$vux.alert.show({
            title: '信息失效',
            content: res.resultMsg,
            onHide() {
              router.push('/login')
            }
          })
        }
        if (res.resultCode === 5000 && res.resultMsg.indexOf('request header') > 0) {
          removeToken()
          removeUserId()
          removeUserInfo()
          router.push('/login')
        }
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
