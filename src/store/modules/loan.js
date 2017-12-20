import request from '@/utils/request'
const loan = {
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
    }
  }
}
export default loan
