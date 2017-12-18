import Mock from 'mockjs'

const AppCode = {
  2000: '请求成功',
  5000: '系统请求失败',
  4000: '无效的appId和token',
  4001: '签名参数未传',
  4002: '签名错误',
  4003: 'token失效',
  4004: 'timestamp失效',
  4005: '暂无数据',
  4006: '保存失败',
  4007: '当前已是最新版本',
  4008: '参数错误'
}

const globalData = Mock.mock({
  resultCode: 2000,
  resultMsg: AppCode[2000]
})

export default globalData
