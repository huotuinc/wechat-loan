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
    getIndex({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/index',
          method: 'get'
        })
          .then(res => {
            console.log(res)
            commit(AUTH_INFO, res)
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
