import Cookies from 'js-cookie'

const UserId = 'User-Id'
const TokenKey = 'User-ToKen'
const UserInfo = 'User-Info'

export function getUserId() {
  return Cookies.get(UserId)
}

export function setUserId(id) {
  if (id) {
    return Cookies.set(UserId, id)
  } else {
    return Cookies.set(UserId, '')
  }
}

export function removeUserId() {
  return Cookies.remove(UserId)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  if (token) {
    return Cookies.set(TokenKey, token)
  } else {
    return Cookies.set(TokenKey, '')
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return Cookies.getJSON(UserInfo) || {}
}

export function setUserInfo(info) {
  if (info) {
    return Cookies.set(UserInfo, info)
  } else {
    return Cookies.set(UserInfo, '')
  }
}

export function removeInfo() {
  return Cookies.remove(UserInfo)
}
