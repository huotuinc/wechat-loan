import axios from 'axios'
import store from '../store'
import { getToken, getUserId } from './auth'
import { UPDATE_LOADING, UPDATE_PROGRESS, UPDATE_PERCENT } from '../store/mutation-type'
import signUtil from './sign'

const uploader = (url, file, successCb, errorCb, progressCb) => {
  let timestamp = +new Date()
  let sign = signUtil({
    merchantId: 1,
    timestamp: timestamp,
    userToken: getToken(),
    userId: getUserId()
  })
  store.commit(UPDATE_LOADING, { isLoading: true, text: '上传中' })
  store.commit(UPDATE_PROGRESS, true)
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
        sign: sign,
        timestamp: timestamp
      },
      onUploadProgress: function(progressEvent) {
        if (progressEvent.lengthComputable) {
          progressCb && progressCb(progressEvent)
          let percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total)
          store.commit(UPDATE_PERCENT, percentCompleted)
        }
      }
    })
    .then(res => {
      successCb && successCb(res)
      store.commit(UPDATE_LOADING, { isLoading: false })
      store.commit(UPDATE_PROGRESS, false)
    })
    .catch(err => {
      errorCb && errorCb(res)
      store.commit(UPDATE_LOADING, { isLoading: false })
      store.commit(UPDATE_PROGRESS, false)
    })
}

export default uploader
