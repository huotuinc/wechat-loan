export function isWechat() {
  var ua = window.navigator.userAgent.toLowerCase()
  return !!ua.match(/MicroMessenger/i)
}
