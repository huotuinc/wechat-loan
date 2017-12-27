import request from '@/utils/request'

const cases = {
  actions: {
    getCases({}, orderId) {
      return new Promise((resolve, reject) => {
        request({
          url: '/api/borrow/hybrid/cases',
          method: 'post'
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

export default cases
