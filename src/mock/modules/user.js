import Mock from 'mockjs'

const personal = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    headimg: 'http://iph.href.lu/80x80?text=%E5%B8%B8',
    loanAmount: '@float(99999, 100000, 2, 2)',
    userName: '15856562514',
    authReport: '@boolean',
    countMsg: '@integer(0, 10)',
    countNoComplete: '@integer(0, 10)',
    countRepayment: '@integer(0, 10)',
    countLoanOverdue: '@integer(0, 10)',
    countBorrowNum: '@integer(0, 10)'
  }
})

const cases = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  'data|10': [
    {
      headImg: 'http://resali.huobanplus.com/cdn/avatar.png',
      loanMoney: '@integer(1000, 9999)',
      dearName: '@cname',
      loanDate: '@datetime'
    }
  ]
})
export default {
  personal: config => personal,
  cases: config => cases
}
