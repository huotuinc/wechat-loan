const getDevice = () => {
  let device = '未知设备'
  const ua = navigator.userAgent
  const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
  const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

  if (isAndroid) {
    if (!!ua.match(/Huawei/i)) {
      device = '华为'
    } else if (!!ua.match(/Honor/i)) {
      device = '荣耀'
    } else if (!!ua.match(/Redmi/i)) {
      device = '红米'
    } else if (!!ua.match(/;\s(mi|m1|m2|m3|m4|hm)(\s*\w*)[\s\)]/i)) {
      device = '小米'
    } else if (!!ua.match(/[-\s](SM-\w*|GT-\w*|s[cgp]h-\w*|shw-\w*)[\s\)]/i)) {
      device = '三星'
    } else if (!!ua.match(/OPPO/i)) {
      device = 'OPPO'
    } else if (!!ua.match(/vivo/i)) {
      device = 'vivo'
    } else {
      device = '安卓手机'
    }
  } else if (isiOS) {
    device = 'iPhone'
  }
  localStorage.setItem('device', encodeURIComponent(device))
  return encodeURIComponent(device)
}

export default function getDeviceInStorage() {
  let device = localStorage.getItem('device')
  if (device) {
    return device
  } else {
    return getDevice()
  }
}
