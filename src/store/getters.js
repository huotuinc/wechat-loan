const getters = {
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userId,
  token: state => state.user.token,
  authInfo: state => state.loan.authInfo
}

export default getters
