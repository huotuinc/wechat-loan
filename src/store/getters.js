const getters = {
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userId,
  token: state => state.user.token,
  authInfo: state => state.loan.authInfo,
  authStatus: state => state.authentication.authStatus,
  sesameUrl: state => state.authentication.sesameUrl,
  authOperator: state => state.authentication.authOperator,

  orderAll: state => state.order.orderAll,
  orderPending: state => state.order.orderPending,
  orderRepayment: state => state.order.orderRepayment,
  orderOverdue: state => state.order.orderOverdue,
  orderComplete: state => state.order.orderComplete
}

export default getters
