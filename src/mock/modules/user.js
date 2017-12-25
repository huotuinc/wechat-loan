import Mock from 'mockjs'

const personal = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    headimg: 'http://iph.href.lu/80x80?text=%E5%B8%B8',
    loanAmount: '@float(99999, 100000, 2, 2)',
    userName: '15856562514',
    authReport: false,
    countMsg: '@integer(0, 10)',
    countNoComplete: '@integer(0, 10)',
    countRepayment: '@integer(0, 10)',
    countLoanOverdue: '@integer(0, 10)',
    countBorrowNum: '@integer(0, 10)'
  }
})

export default {
  personal: config => personal
}
