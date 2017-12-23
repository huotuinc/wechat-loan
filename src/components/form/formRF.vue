<template>
  <div class="login-wrapper">
    <div>
      <group label-width="4.5em" label-margin-right="2em" class="login-group">
        <x-input
          name="username"
          placeholder="手机号码"
          keyboard="number"
          is-type="china-mobile"
          ref="username"
          required
          :show-clear="false"
          v-model="obj.username">
          <i slot="label" class="iconfont icon-mobile"></i>
        </x-input>
        <x-input
          ref="authCode"
          name="authCode"
          placeholder="请输入验证码"
          required
          class="weui-vcode"
          :show-clear="false"
          v-model="obj.verifyCode">
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
        <x-input
          type="password"
          name="password"
          placeholder="请设置密码"
          v-model="obj.password"
          ref="password"
          :min="6"
          required
          class="login-input_last">
          <i slot="label" class="iconfont icon-password"></i>
        </x-input>
        <div class="login-agree">
          <span>我已阅读并同意《注册服务协议》</span>
        </div>
      </group>
    </div>
    <div class="login-btn_warp">
       <x-button @click.native="submit" class="btn-yellow">{{type === 'register' ? '注册' : '提交'}}</x-button>
       <p class="login-tips">会员类型 - 借款人</p>
    </div>
    <div class="login-link">
    <p>
      <router-link to="/download">我是出借人</router-link>
    </p>
  </div>
</div>
</template>

<script>
import { XInput, Group, XButton, md5} from 'vux'
export default {
  components: {
    XInput,
    XButton,
    Group
  },
  props: {
    type: String
  },
  data() {
    return {
      disabled: false,
      time: 0,
      timer: '',
      sendButtonText: '获取验证码',
      obj: {
        username: '',
        password: '',
        verifyCode: '',
        userType: 1
      }
    }
  },
  methods: {
    getMobileValid() {
      return this.$refs.username.valid
    },
    getPwdValid() {
      return this.$refs.password.valid
    },
    getAuthValid() {
      return this.$refs.authCode.valid
    },
    sendCode() {
      if (!this.disabled) {
        clearTimeout(this.timer)
        if (this.obj.username && this.getMobileValid()) {
          this.disabled = true
          this.$store
            .dispatch('sendVerifyCode', this.obj.username)
            .then(() => {
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
        clearTimeout(timer)
        this.disabled = false
        this.sendButtonText = '获取验证码'
      }
    },
    submit() {
      if (this.validForm()) {
        this.obj.password = md5(this.obj.password)
        this.$store
          .dispatch('register', this.obj)
          .then(() => {
            this.$router.push({ path: '/login' })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$vux.toast.text('注册信息有错误')
      }
    },
    validForm() {
      if (this.obj.username && this.obj.password && this.obj.verifyCode) {
        if (this.getMobileValid() && this.getPwdValid() && this.getAuthValid()) return true
        return false
      } else {
        return false
      }
    }
  }
}
</script>
