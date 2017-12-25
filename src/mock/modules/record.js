import Mock from 'mockjs'

const riskCallList = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  'data|5-10': [
    {
      callCount: 50,
      callTime: 11,
      msgCount: 1,
      contactCount: 2,
      riskType: '@ctitle'
    }
  ]
})

const emergencyContactList = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: [
    {
      relation: '父亲',
      name: '张三',
      mobile: '13100001234',
      isImportant: true,
      threeMonthCount: 4222,
      threeMonthTime: 33344,
      sixMonthCount: 6333,
      sixMonthTime: 133300,
      activeCount: 233,
      passiveCount: 5333
    },
    {
      relation: '同事',
      name: '李斯',
      mobile: '13100001234',
      isImportant: false,
      threeMonthCount: 4,
      threeMonthTime: 44,
      sixMonthCount: 6,
      sixMonthTime: 100,
      activeCount: 2,
      passiveCount: 5
    }
  ]
})

const consumeBillList = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  'data|12': [
    {
      month: '1月',
      consumeAmount: 11,
      rechargeAmount: 1,
      rechargeCount: 2,
    }
  ]
})
export default {
  riskCallList: config => riskCallList,
  emergencyContactList: config => emergencyContactList,
  consumeBillList: config => consumeBillList
}
