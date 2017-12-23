import Mock from 'mockjs'
import globalData from '../global'

let Random = Mock.Random
Random.extend({
  code: 0,
  constellations: [
    { id: 1, value: '未认证' },
    { id: 2, value: '认证失败' },
    { id: 3, value: '已认证' },
    { id: 4, value: '过期' },
    { id: 5, value: '认证中' }
  ],
  constellation: function() {
    for (let i = 0; i < this.constellations.length; i++) {
      if (this.constellations[i].id === this.code) {
        return this.constellations[i].value
      }
    }
    return ''
  },
  randomCode: function() {
    let Min = 1
    let Max = 5
    let Range = Max - Min
    let Rand = Math.random()
    let code = Min + Math.round(Rand * Range)
    this.code = code
    return code
  }
})

const certificationAllData = Mock.mock({
  data: {
    userId: '@id',
    uinfoFlg: Random.randomCode(),
    uinfoFlgMsg: Random.constellation(),
    contactFlg: Random.randomCode(),
    contactFlgMsg: Random.constellation(),
    zhimaFlg: Random.randomCode(),
    zhimaFlgMsg: Random.constellation(),
    carrierFlg: Random.randomCode(),
    carrierFlgMsg: Random.constellation(),
    idCardFlg: Random.randomCode(),
    idCardFlgMsg: Random.constellation()
  }
})

const userinfoeditData = Mock.mock({
  data: {}
})
const editcontactsData = Mock.mock({
  data: {}
})
const authoperatorData = Mock.mock({
  data:
    'https://open.shujumohe.com/box/yys?box_token=02B2654432184CE69E088C0BED366737&real_name=张三&identity_code=340222199803052620&user_mobile=15655503490'
})
const getSesameUrlData = Mock.mock({
  data:
    'https://open.shujumohe.com/box/yys?box_token=02B2654432184CE69E088C0BED366737&real_name=张三&identity_code=340222199803052620&user_mobile=15655503490'
})

const isPay = Mock.mock({
  data: false
})
export default {
  certificationAll: config => Object.assign(globalData, certificationAllData),
  userinfoedit: config => Object.assign(globalData, userinfoeditData),
  editcontacts: config => Object.assign(globalData, editcontactsData),
  authoperator: config => Object.assign(globalData, authoperatorData),
  getSesameUrl: config => Object.assign(globalData, getSesameUrlData),
  isPay: config => Object.assign(globalData, isPay)
}
