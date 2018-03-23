<template>
  <div class="login-wrapper">
    <div class="login-hd">
      <div class="logo-wrapper">
        <img class="logo" src="../../assets/logo.png" alt="有信">
      </div>
    </div>

    <div>
      <group label-width="4.5em" label-margin-right="2em" class="login-group">
         <x-input
          name="username"
          placeholder="请输入手机号码"
          keyboard="number"
          is-type="china-mobile"
          ref="username"
          :show-clear="false"
          required
          type="tel"
          v-model.trim="form.username"
          class="login-input">
          <i slot="label" class="iconfont icon-mobile"></i>
        </x-input>
        <x-input
          ref="authCode"
          name="authCode"
          placeholder="请输入验证码"
          required
          type="tel"
          class="weui-vcode"
          :show-clear="false"
          v-model="form.verifyCode">
          <i slot="label" class="iconfont icon-msg-o"></i>
          <x-button
            slot="right"
            mini
            class="login-auto-btn"
            :disabled="disabled"
            @click.native="sendCode"
            >{{sendButtonText}}
          </x-button>
        </x-input>
      </group>
    </div>
    <div class="login-btn_warp">
      <x-button @click.native="submit" class="btn-yellow">登录</x-button>
      <x-button class="btn-white" link="/register">新用户注册</x-button>
    </div>
    <div class="login-link">
      <p>
        <router-link to="/download">我是出借人</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, md5 } from 'vux'
import { removeToken, removeUserId, removeUserInfo } from '../../utils/auth'
import { isWechat } from '../../utils/isWechat'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data() {
    return {
      disabled: false,
      time: 0,
      timer: '',
      sendButtonText: '获取验证码',
      form: {
        username: '',
        verifyCode: '',
        loginType: 0,
        userType: 1
      }
    }
  },
  created() {
    removeToken()
    removeUserId()
    removeUserInfo()
    this.$store.dispatch('init')
  },
  methods: {
    getMobileValid() {
      return this.$refs.username.valid
    },
    getAuthValid() {
      return this.$refs.authCode.valid
    },
    sendCode() {
      // console.log(1);

      if (!this.disabled) {
        clearTimeout(this.timer)
        if (this.form.username && this.getMobileValid()) {
          this.disabled = true
          this.$store
            .dispatch('sendVerifyCode', {
              mobile: this.form.username
            })
            .then(() => {
              this.$vux.toast.text('发送成功')
              this.time = 60
              this.countDown()
            })
            .catch(err => {
              this.disabled = false
              console.log(err)
              this.$vux.toast.text('系统异常')
            })
        } else {
          this.$vux.toast.text('手机号错误')
        }
      }
    },
    countDown() {
      if (this.time > 0) {
        this.time--
        this.sendButtonText = `${this.time}秒后发送`
        this.timer = setTimeout(this.countDown, 1000)
      } else {
        this.disabled = false
        this.sendButtonText = '获取验证码'
        clearTimeout(this.timer)
      }
    },

    submit() {
      let login = {}
      login.username = this.form.username
      login.verifyCode = this.form.verifyCode
      login.loginType = this.form.loginType
      login.userType = this.form.userType
      if (this.validForm()) {
        this.$store
          .dispatch('login', login)
          .then(() => {
            if (isWechat()) {
              this.$router.push({ path: '/' })
            } else {
              this.$router.push({ path: '/splash', query: { to: 'loan' } })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$vux.toast.text('手机号或验证码错误')
      }
    },
    validForm() {
      if (this.form.username && this.form.verifyCode) {
        if (this.getMobileValid() && this.getAuthValid()) return true
        return false
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="less">
.login-group .weui-cells:after {
  border-bottom: 1px solid #d9d9d9 !important;
  left: 50px;
  right: 50px;
}
</style>

