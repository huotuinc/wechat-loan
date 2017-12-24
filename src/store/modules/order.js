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
          params: {
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
    },
    checkout({}, params) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/unifiedorder/checkout',
          method: 'post',
          data: params
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    createOrder({}, orderData) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/unifiedorder/create',
          method: 'post',
          data: orderData
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
