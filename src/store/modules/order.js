import request from '@/utils/request'

const order = {
  state: {},
  mutations: {},
  actions: {
    getOrderInfo({}, id) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/order/getOrderInfo',
          method: 'get',
          data: {
            orderId: id
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
    getRepayDetail({}, id) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/order/getRepayDetail',
          method: 'get',
          data: {
            orderId: id
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
    getOrderNotice({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/order/getOrderNotice',
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
export default order