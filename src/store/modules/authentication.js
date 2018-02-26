import request from '@/utils/request'
import { AUTH_INFO, AUTH_STATUS, SESAME_URL, AUTH_OPERATOR } from '../mutation-type'

const authentication = {
  state: {
    authStatus: {},
    sesameUrl: '',
    authOperator: ''
  },
  mutations: {
    [AUTH_STATUS](state, payload) {
      state.authStatus = payload
    },
    [SESAME_URL](state, payload) {
      state.sesameUrl = payload
    },
    [AUTH_OPERATOR](state, payload) {
      state.authOperator = payload
    }
  },
  actions: {
    certificationAll({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/authentication/certificationAll',
          method: 'post'
        })
          .then(response => {
            commit(AUTH_STATUS, response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    userinfoedit({}, form) {
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
    editcontacts({}, form) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/editContacts',
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
    authoperator({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/authOperator',
          method: 'post'
        })
          .then(response => {
            commit(AUTH_OPERATOR, response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getSesameUrl({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/authentication/getSesameUrl',
          method: 'post'
        })
          .then(response => {
            commit(SESAME_URL, response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    checkIsPay({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/authentication/checkIsPay',
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
    authUpload({}, data) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/authentication/identityHtmlBase',
          method: 'post',
          data: data
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    checkFree({}, data) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/authentication/checkFree',
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
