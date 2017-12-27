import request from '@/utils/request'

const esign = {
  actions: {
    checkPayment({}, orderId) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/esign/checkPayment',
          method: 'post',
          data: {
            orderId: orderId
          }
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    sendEsign({}, data) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/esign/send',
          method: 'post',
          data: data
        })
          .then(res => {
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getEsign({}, orderId) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/user/esign/agreementLink',
          method: 'get',
          params: {
            orderId: orderId
          },
          responseType: 'text'
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default esign
