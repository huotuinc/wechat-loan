import Mock from 'mockjs'
import globalData from '../global'

const saveInfoData = Mock.mock({
  data: {
  }
})

export default {
  saveInfo: config => Object.assign(globalData, saveInfoData)
}
