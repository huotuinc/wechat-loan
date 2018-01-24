import request from '@/utils/request'

const cases = {
  actions: {
    saveFeedback({}, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        request({
          url: '/api/sys/saveFeedBack',
          method: 'post',
          data: data
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
