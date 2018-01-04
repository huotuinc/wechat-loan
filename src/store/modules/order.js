import request from '@/utils/request'
import { SET_ORDER_LIST, SET_TOKEN, SET_USER_ID, SET_USER_INFO } from '../mutation-type'
import {
  getToken,
  getUserId,
  setToken,
  setUserId,
  setUserInfo,
  removeToken,
  removeUserId,
  removeUserInfo
} from '../../utils/auth'

const order = {
  state: {
    userInfo: '',
    token: getToken(),
    userId: getUserId(),
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
    },
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
            commit(SET_ORDER_LIST, { list: response.orderList, status: orderData.grantStatus })
            resolve(response.orderList)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getShareOrder({}, data) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/order/getOrderInfo',
          method: 'get',
          params: data
        })
          .then(response => {
            removeToken()
            removeUserId()
            removeUserInfo()
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getLoansProductInfo({}, data) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/order/getLoansProductInfo',
          method: 'get',
          params: data
        })
          .then(response => {
            removeToken()
            removeUserId()
            removeUserInfo()
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    receiveOrder({ commit }, data) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/order/receiveOrder',
          method: 'post',
          data: data
        })
          .then(response => {
            setUserInfo(response)
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
    receiveLoanOrder({ commit }, data) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/order/receiveLoanOrder',
          method: 'post',
          data: data
        })
          .then(response => {
            setUserInfo(response)
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
    orderLog({}, orderId) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/order/getOrderLog',
          method: 'get',
          params: {
            orderId: orderId
          }
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
