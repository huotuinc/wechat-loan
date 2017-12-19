import Mock from 'mockjs'
import loginApi from './modules/login'
import sendCodeApi from './modules/register'
import registerApi from './modules/register'

// 模拟服务器延迟
Mock.setup({
  timeout: '500-1000'
})

// 登录相关
Mock.mock(/\/api\/user\/login/, 'post', loginApi.login)
//发送验证码
Mock.mock(/\/api\/user\/sendVerifyCode/, 'post', sendCodeApi.sendCode)
//注册
Mock.mock(/\/api\/user\/register/, 'post', registerApi.register())
