import request from '@/utils/request'
import { RISK_CALL, EMERGENCY, CONSUME_BILL } from '../mutation-type'

const record = {
  state: {
    riskCallList: {},
    emergencyList: [],
    billList: {}
  },
  mutations: {
    [RISK_CALL](state, payload) {
      state.riskCallList = payload
    },
    [EMERGENCY](state, payload) {
      state.emergencyList = payload
    },
    [CONSUME_BILL](state, payload) {
      state.billList = payload
    },
  },
  actions: {
    riskCallList({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/riskCallList',
          method: 'post'
        })
          .then(res => {
            commit(RISK_CALL, res)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    emergencyContactList({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/emergencyContactList',
          method: 'post'
        })
          .then(res => {
            commit(EMERGENCY, res)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    consumeBillList({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/consumeBillList',
          method: 'post'
        })
          .then(res => {
            commit(CONSUME_BILL, res)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  }
}

export default record
