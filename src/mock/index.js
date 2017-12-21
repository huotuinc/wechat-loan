import Mock from 'mockjs'
import loginApi from './modules/login'
import loanApi from './modules/loan'
import sendCodeApi from './modules/register'
import registerApi from './modules/register'
import borrowApi from './modules/borrow'
import certificationAllApi from './modules/authentication'
import userinfoeditDataApi from './modules/authentication'

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
//我要借款
Mock.mock(/\/api\/borrow\/saveInfo/, 'post', borrowApi.saveInfo())
//信用认证
Mock.mock(/\/api\/user\/certificationAll/, 'post', certificationAllApi.certificationAll())
//基本信息认证
Mock.mock(/\/api\/user\/userinfoedit/, 'post', userinfoeditDataApi.userinfoedit())

// 借款相关
Mock.mock(/\/api\/user\/index/, 'get', loanApi.index)
