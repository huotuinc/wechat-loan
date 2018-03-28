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
          placeholder="手机号码"
          keyboard="number"
          is-type="china-mobile"
          ref="username"
          :show-clear="false"
          required
          type="tel"
          v-model.trim="form.username"
          class="login-input">
          <i slot="label" class="iconfont icon-mobile"></i>
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
          ref="authCode"
          name="authCode"
          placeholder="请输入验证码"
          required
          type="tel"
          class="weui-vcode"
          :show-clear="false"
          v-model="form.input">
          <i slot="label" class="iconfont icon-msg-o"></i>
        </x-input>
         <popup-picker
          v-if="!checkReg"
          :data="sesameList"
          v-model="sesame"
          popup-title="芝麻分数"
          class="login-input_last"
          aria-disabled="true">
          <template slot="title" slot-scope="props">
            <span :class="props.labelClass">
              <i class="iconfont icon-zhi-ma" style="color: #999;vertical-align: middle;"></i>
              <span style="vertical-align:middle;">芝麻分数</span>
            </span>
          </template>
        </popup-picker>
      </group>
    </div>
    <div class="login-btn_warp">
      <x-button @click.native="submit" class="btn-yellow">登录/注册</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, md5 } from 'vux'
import { removeToken, removeUserId, removeUserInfo } from '../../utils/auth'

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
      checkReg: true,
      sendButtonText: '获取验证码',
      form: {
        username: '',
        verifyCode: '',
        userType: 1,
        inviter: '',
        zmfScore: ''
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
      this.$store
        .dispatch('checkReg', {
          username: this.obj.username
        })
        .then(res => {
          console.log(res)
          this.checkReg = res.regStatus
        })

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
      login.userType = this.form.userType
      login.zmfScore = this.form.zmfScore
      if (this.validForm()) {
        this.$store
          .dispatch('loginByVerifyCode', login)
          .then(() => {
            this.$router.push({ path: '/authentication' })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$vux.toast.text('手机号或验证码错误')
      }
    },
    validForm() {
      if (!/^1([34578])\d{9}$/.test(this.obj.username)) {
        this.$vux.toast.text('手机号错误')
        return false
      }
      if (this.obj.verifyCode == '') {
        this.$vux.toast.text('验证码错误')
        return false
      }
      if (!this.getAuthValid()) {
        this.$vux.toast.text('验证码错误')
        return false
      }

      if (!this.checkReg) {
        if (this.sesame.length == 0) {
          this.$vux.toast.text('请选择芝麻分数')
          return false
        }
      }
      return true
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
