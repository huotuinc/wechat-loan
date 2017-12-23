import request from '@/utils/request'
import { getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
import { USER_INFO } from '../mutation-type'

const user = {
  state: {
    userInfo: getUserInfo()
  },
  mutations: {
    [USER_INFO](state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/login',
          method: 'post',
          data: userInfo
        })
          .then(response => {
            let res = response.userInfo
            res['userToken'] = res['token']
            setUserInfo(res)
            commit(USER_INFO, res)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    sendVerifyCode({}, mobile) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/sendVerifyCode',
          method: 'post',
          data: {
            mobile: mobile
          }
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    register({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/register',
          method: 'post',
          data: userInfo
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    forger({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/updatePassword',
          method: 'post',
          data: userInfo
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit(USER_INFO, '')
        removeUserInfo()
        resolve()
      })
    },
    personalIndex({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/userIndex',
          method: 'get'
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
