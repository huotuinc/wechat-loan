const getters = {
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userId,
  token: state => state.user.token,
  authInfo: state => state.loan.authInfo,
  authStatus: state => state.authentication.authStatus,
  sesameUrl: state => state.authentication.sesameUrl,
  authOperator: state => state.authentication.authOperator
}

export default getters
