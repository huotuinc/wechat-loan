import Mock from 'mockjs'
import loginApi from './modules/login'
import loanApi from './modules/loan'
import registerApi from './modules/register'
import borrowApi from './modules/borrow'
import authenticationApi from './modules/authentication'
import orderApi from './modules/order'

// 模拟服务器延迟
Mock.setup({
  timeout: '500-1000'
})

// 登录相关
Mock.mock(/\/api\/user\/login/, 'post', loginApi.login)
//发送验证码
Mock.mock(/\/api\/user\/sendVerifyCode/, 'post', registerApi.sendCode)
//注册
Mock.mock(/\/api\/user\/register/, 'post', registerApi.register)

//我要借款
Mock.mock(/\/api\/borrow\/saveInfo/, 'post', borrowApi.saveInfo)

//信用认证
Mock.mock(/\/api\/user\/certificationAll/, 'post', authenticationApi.certificationAll)
//基本信息认证
Mock.mock(/\/api\/user\/userinfoedit/, 'post', authenticationApi.userinfoedit)
//联系人认证
Mock.mock(/\/api\/user\/editcontacts/, 'post', authenticationApi.editcontacts)

// 借款相关
Mock.mock(/\/api\/user\/index/, 'get', loanApi.index)

// 借款单详情
Mock.mock(/\/api\/order\/getOrderInfo/, 'get', orderApi.getOrderInfo())
// 每月还款金额
Mock.mock(/\/api\/order\/getRepayDetail/, 'get', orderApi.getRepayDetail())
