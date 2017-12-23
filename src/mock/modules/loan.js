import Mock from 'mockjs'
import globalData from '../global'

const getIndex = Mock.mock({
  data: {
    loanAmount: '@float(10000, 99999, 2, 2)',
    loanTotalAmount: '@float(10000, 99999, 2, 2)',
    loanNum: '@integer(0, 100)',
    myLoanAmount: '@float(10000, 99999, 2, 2)',
    authCode: '@integer(1, 5)',
    authMsg: '@pick(["已认证","未认证"])'
  }
})

export default {
  index: config => Object.assign(globalData, getIndex)
}
