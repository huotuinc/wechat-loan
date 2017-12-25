import axios from 'axios'
import { getToken, getUserId } from './auth'
import sign from './sign'

const uploader = (url, file, successCb, errorCb) => {
  axios
    .post(url, file, {
      headers: {
        osType: 'h5',
        merchantId: 1,
        appVersion: 1.0,
        userToken: getToken(),
        userId: getUserId()
      },
      params: {
        sign: sign(),
        timestamp: +new Date()
      },
      onUploadProgress: function(progressEvent) {
        // 对原生进度事件的处理
        console.log(progressEvent)
      }
    })
    .then(res => {
      successCb && successCb(res)
    })
    .catch(err => {
      errorCb && errorCb(res)
    })
}

export default uploader
