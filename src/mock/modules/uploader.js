import Mock from 'mockjs'

const avatar = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {}
})

const identity = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {}
})

export default {
  avatar: config => avatar,
  identity: config => identity
}
