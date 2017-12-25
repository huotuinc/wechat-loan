import request from '@/utils/request'

const credit = {
  state: {},
  mutations: {},
  actions: {
    certificationInfo() {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/certificationInfo',
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
    creditReport() {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/creditReport',
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

export default credit
