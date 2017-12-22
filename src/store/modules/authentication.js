import request from '@/utils/request'
import { AUTH_INFO, AUTH_STATUS } from '../mutation-type'

const authentication = {
  state: {
    authInfo: {}
  },
  mutations: {
    [AUTH_INFO](state, payload) {
      state.authInfo = payload
    }
  },
  actions: {
    certificationAll({}) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/authentication/certificationAll',
          method: 'post'
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    userinfoedit({},form) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/userinfoedit',
          method: 'post',
          data: form
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editcontacts({},form) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/editcontacts',
          method: 'post',
          data: form
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    authoperator({}) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/authoperator',
          method: 'post'
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getSesameUrl({}) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/authentication/getSesameUrl',
          method: 'post'
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

export default authentication
