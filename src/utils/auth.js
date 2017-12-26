import Cookies from 'js-cookie'

const UserId = 'User-Id'
const TokenKey = 'User-Tkoen'
const UserInfo = 'User-Info'

export function getUserId() {
  return Cookies.get(UserId)
}

export function setUserId(id) {
  return Cookies.set(UserId, id)
}

export function removeUserId() {
  return Cookies.remove(UserId)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return Cookies.getJSON(UserInfo) || {}
}

export function setUserInfo(info) {
  return Cookies.set(UserInfo, info)
}
