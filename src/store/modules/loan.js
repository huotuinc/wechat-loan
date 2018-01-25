import request from '@/utils/request'
import { AUTH_INFO } from '../mutation-type'
const loan = {
  state: {
    authInfo: {}
  },
  mutations: {
    [AUTH_INFO](state, payload) {
      state.authInfo = payload
    }
  },
  actions: {
    saveInfo({}, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/borrow/saveInfo',
          method: 'post',
          data: obj
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getIndex({ commit }, startTime) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/index',
          method: 'get',
          params: {
            startTime: startTime
          }
        })
          .then(res => {
            commit(AUTH_INFO, res)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getBorrowList({}, data) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/borrow/list',
          method: 'get',
          params: data
        })
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    cancelBorrow({}, borrowId) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/borrow/cancel',
          method: 'post',
          data: {
            borrowId: borrowId
          }
        })
          .then(res => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getLenderById({}, data) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/lenderDetail',
          method: 'post',
          data: data
        })
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getLenderList({}, data) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/lenderList',
          method: 'post',
          data: data
        })
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    findOneLend({}, data) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/lend/lendInfo',
          method: 'post',
          data: data
        })
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default loan
