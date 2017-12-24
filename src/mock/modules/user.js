import Mock from 'mockjs'

const personal = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    userHeadImgURL: 'http://localhost:8080/static/img/avatar.0d02701.png',
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
