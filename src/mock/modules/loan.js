import Mock from 'mockjs'

const getIndex = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    loanAmount: '@float(10000, 99999, 2, 2)',
    loanTotalAmount: '@float(10000, 99999, 2, 2)',
    loanNum: '@integer(0, 100)',
    myLoanAmount: '@float(10000, 99999, 2, 2)',
    authCode: 1,
    authMsg: '@pick(["已认证","未认证"])',
    headimg: '@img(80x80)'
  }
})

export default {
  index: config => getIndex
}
