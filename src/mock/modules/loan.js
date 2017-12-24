import Mock from 'mockjs'

const getIndex = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
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
  index: config => getIndex
}
