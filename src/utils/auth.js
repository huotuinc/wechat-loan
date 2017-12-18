import Cookies from 'js-cookie'

const UserInfo = 'Loan-Info'

export function getUserInfo() {
  return Cookies.getJSON(UserInfo) || {}
}

export function setUserInfo(info) {
  return Cookies.set(UserInfo, info)
}

export function removeUserInfo() {
  return Cookies.remove(UserInfo)
}
