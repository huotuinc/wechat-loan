import Mock from 'mockjs'
import globalData from '../global'


const getorderinfoData = Mock.mock({
  data: {
    orderId: '@id',
    orderName: '@name',
    orderStatus: '@pick(["待审核","待还款","已拒绝","已完成","已取消","已逾期"])',
    grantStatus: '@pick([1,6])',
    loanAmount: '@float(10000, 99999, 2, 2)',
    payAmount: '@float(99999, 100000, 2, 2)',
    interestAmount: '@float(100, 500, 2, 2)',
    loanDay: '@integer(1, 30)',
    overdueRate: '@float(0.1, 0.9, 1, 1)',
    repayAmount: '@float(99999, 100000, 2, 2)',
    overdueAmount: '@float(100, 500, 2, 2)',
    lenderUserName: '@cname',
    loanerUserName: '@cname',
    needAuth: '@boolean',
    authStatus: '@boolean',
    grantTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    agreedRepayTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    repayTimeDays: '@integer(1, 30)',
    loanerUserId: '@id',
    remarks: '@string(10,20)',
    repayType: '@pick(["等额本息","还本付息"])',
    repayTypeCode: '@integer(0, 1)',
    monthRepayMoney: '@float(100, 500, 2, 2)'
  }
})

export default {
  getOrderInfo: config => Object.assign(globalData, getorderinfoData)
}
