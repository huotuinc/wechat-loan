import request from '@/utils/request'

const order = {
  actions: {
    getOrderInfo({}, id) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/order/getOrderInfo',
          method: 'post',
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
    }
  }
}
export default order
