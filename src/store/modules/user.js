import request from '@/utils/request'
<<<<<<< HEAD
import { SET_TOKEN, SET_USER_ID, SET_USER_INFO } from '../mutation-type'
import { md5 } from 'vux'
import { getToken, getUserId, setToken, setUserId, removeToken, removeUserId } from '../../utils/auth'
=======
import {getUserInfo, setUserInfo, removeUserInfo} from '@/utils/auth'
import {USER_INFO} from '../mutation-type'
import {md5} from 'vux'
>>>>>>> 2df966a502ab893fa3c2c0c8784a8b17ef1f4723

const user = {
  state: {
    userInfo: '',
    token: getToken(),
    userId: getUserId()
  },
  mutations: {
    [SET_USER_INFO](state, payload) {
      state.userInfo = payload
    },
    [SET_TOKEN](state, payload) {
      state.token = payload
    },
    [SET_USER_ID](state, payload) {
      state.userId = payload
    }
  },
  actions: {
    login({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/login',
          method: 'post',
          data: userInfo
        })
          .then(response => {
            setToken(response.userToken)
            setUserId(response.userId)
            commit(SET_TOKEN, response.userToken)
            commit(SET_USER_ID, response.userId)
            commit(SET_USER_INFO, response)
            resolve(response)
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
              mobile:mobile
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
    register({commit}, userInfo) {
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
    forger({commit}, userInfo) {
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
    logout({commit}) {
      return new Promise(resolve => {
        commit(SET_TOKEN, '')
        commit(SET_USER_ID, '')
        removeToken()
        removeUserId()
        resolve()
      })
    },
    personalIndex({commit}) {
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
