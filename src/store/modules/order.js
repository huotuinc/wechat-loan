import request from '@/utils/request'
import { SET_ORDER_LIST } from '../mutation-type'

const order = {
  state: {
    orderAll: {
      list: [],
      pageIndx: 1
    },
    orderPending: {
      list: [],
      pageIndx: 1
    },
    orderRepayment: {
      list: [],
      pageIndx: 1
    },
    orderOverdue: {
      list: [],
      pageIndx: 1
    },
    orderComplete: {
      list: [],
      pageIndx: 1
    }
  },
  mutations: {
    [SET_ORDER_LIST](state, payload) {
      switch (payload.status) {
        case 2:
          state.orderPending.list = state.orderPending.list.concat(payload.list)
          state.orderPending.pageIndx++
          break
        case 4:
          state.orderRepayment.list = state.orderRepayment.list.concat(payload.list)
          state.orderRepayment.pageIndx++
          break
        case 5:
          state.orderOverdue.list = state.orderOverdue.list.concat(payload.list)
          state.orderOverdue.pageIndx++
          break
        case 6:
          state.orderComplete.list = state.orderComplete.list.concat(payload.list)
          state.orderComplete.pageIndx++
          break
        default:
          state.orderAll.list = state.orderAll.list.concat(payload.list)
          state.orderAll.pageIndx++
          break
      }
    }
  },
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
    },
    getOrderList({ commit }, orderData) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/order/getOrderList',
          method: 'post',
          data: orderData
        })
          .then(response => {
            commit(SET_ORDER_LIST, { list: response.list, status: orderData.grantStatus })
            resolve(response.list)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default order
