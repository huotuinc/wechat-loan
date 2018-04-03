<template>
  <div>
    <div class="header">
      <img src="../../assets/popularize.jpg" alt="征信推广">
    </div>
    <div class="center">

       <div class="username">
        <x-input
          name="username"
          placeholder="请输入手机号"
          keyboard="number"
          is-type="china-mobile"
          ref="username"
          required
          :show-clear="false"
          type="tel"
          v-model="obj.username">
        </x-input>
       </div>

       <div class="verifycode">
        <x-input
          ref="authCode"
          name="authCode"
          placeholder="请输入验证码"
          required
          type="tel"
          class="weui-vcode"
          :max = 4
          :show-clear="false"
          v-model="obj.verifyCode">

        </x-input>
        <div class="code-btn">
            <x-button
              slot="right"
              mini
              class="login-auto-btn"
              :disabled="disabled"
              @click.native="sendCode"
              >{{sendButtonText}}
            </x-button>
        </div>
       </div>

      <div class="zmfScore">
        <popup-picker
          :data="sesameList"
          v-model="sesame"
          popup-title="芝麻分数"
          placeholder="填选芝麻信用分"
          class="login-input_last"
          value-text-align="left"
          aria-disabled="true">
        </popup-picker>
      </div>
    </div>

    <div class="footer">
       <div class="login-btn_warp">
          <x-button @click.native="submit" class="btn-yellow" style="border-radius:99px;" :disabled="isDisabled">获取征信</x-button>
      </div>
      <div class="login-agree">
        <check-icon :value.sync="hasChecked">我同意</check-icon><span>《<ins @click="open">用户注册服务协议</ins>》</span>
        <p>点击"获取验证码"即表示您同意《用户注册服务协议》</p>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="popupShow" position="bottom" max-height="50%">
        <iframe :src="iframe" frameborder="0"></iframe>
      </popup>
    </div>
  </div>
</template>
<script>
import { TransferDom, Popup, Cell, XInput, Group, XButton, CheckIcon, Picker, PopupPicker } from 'vux'
import { getLoanerRegisterLink } from '../../utils/init'
import { log } from 'util'

export default {
  directives: {
    TransferDom
  },
  components: {
    XInput,
    XButton,
    Group,
    Popup,
    Cell,
    CheckIcon,
    Picker,
    PopupPicker
  },
  data() {
    return {
      isDisabled: true,
      hasChecked: true,
      disabled: false,
      time: 0,
      timer: '',
      sendButtonText: '获取验证码',
      obj: {
        username: '',
        verifyCode: '',
        userType: 1,
        inviter: '',
        zmfScore: ''
      },
      popupShow: false,
      iframe: '',
      type: '',
      sesameList: [['550以下', '550-599', '600-650', '650以上']],
      sesame: [],
      sesameValue: ['550以下', '550-599', '600-650', '650以上']
    }
  },
  created() {
    this.iframe = getLoanerRegisterLink()
    this.obj.inviter = sessionStorage.getItem('inviter')
    if (!this.iframe) {
      this.$store.dispatch('init').then(() => {
        this.iframe = getLoanerRegisterLink()
      })
    }
  },
  watch: {
    sesame(val) {
      const index = this.sesameValue.indexOf(this.sesame[0])
      this.obj.zmfScore = index + 1
    },
    'obj.username'() {
      this.checkIsDisabled()
    },
    'obj.verifyCode'() {
      this.checkIsDisabled()
    },
    'obj.zmfScore'() {
      this.checkIsDisabled()
    }
  },
  methods: {
    getMobileValid() {
      return this.$refs.username.valid
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
            .dispatch('sendVerifyCode', {
              mobile: this.obj.username
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
      if (!this.hasChecked) {
        this.$vux.toast.text('请确认阅读并同意《注册服务协议》')
        return
      }
      let action = 'register'
      let form = {}
      form.username = this.obj.username
      form.verifyCode = this.obj.verifyCode
      form.userType = this.obj.userType
      form.zmfScore = this.obj.zmfScore
      if (this.obj.inviter) form.inviter = this.obj.inviter

      if (this.validForm()) {
        this.$store
          .dispatch(action, form)
          .then(() => {})
          .catch(err => {
            console.log(err)
          })
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
    },
    open() {
      if (!this.iframe) return
      this.popupShow = true
    },
    checkIsDisabled() {
      if (!/^1([34578])\d{9}$/.test(this.obj.username)) {
        this.isDisabled = true
        return
      }
      if (this.obj.verifyCode == '') {
        this.isDisabled = true
        return
      }
      if (!this.getAuthValid()) {
        this.isDisabled = true
        return
      }

      if (!this.checkReg) {
        if (this.sesame.length == 0) {
          this.isDisabled = true
          return
        }
      }
      this.isDisabled = false
    }
  }
}
</script>
<style lang="less">
body {
  height: 100%;
  background: linear-gradient(#cb1f1f 50%, #e44034);
}
[class^='weui-icon-warn']:before,
[class*=' weui-icon-warn']:before,
.weui-cell_access .weui-cell__ft:after {
  display: none !important;
}
button.weui-btn,
input.weui-btn {
  height: 100%;
  background: yellow;
  border-radius: 0px 50px 50px 0;
}
.header {
  width: 100%;
  > img {
    width: 100%;
    height: auto;
    vertical-align: middle;
  }
}
.center {
  width: 100%;
  padding: 0.38rem 20px 0;
  box-sizing: border-box;
  > .username {
    margin-bottom: 0.64rem;
    padding-left: 20px;
    border-radius: 50px;
    background: #fff;
  }
  > .verifycode {
    position: relative;
    margin-bottom: 0.64rem;
    padding-left: 20px;
    border-radius: 50px;
    background: #fff;
    > .code-btn {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      > .button {
        height: 100%;
        background: yellow;
        border-radius: 0px 50px 50px 0;
      }
    }
  }
  > .zmfScore {
    padding-left: 20px;
    border-radius: 50px;
    background: #fff;
  }
}

.footer {
  padding: 0 20px;
  > .login-btn_warp {
    margin-top: 1.2rem;
    margin-bottom: 0.13rem;
    padding: 0;
  }
  > .login-agree {
    margin-top: 0.8rem;
    text-align: center;
    font-size: 12px;
    color: #faf7f8;
    & ins {
      text-decoration: none;
    }
  }
}
.vux-check-icon > .weui-icon-success,
.vux-check-icon > .weui-icon-circle {
  font-size: 14px !important;
  vertical-align: middle !important;
  margin-top: -2px !important;
}
.vux-check-icon > .weui-icon-success:before,
.vux-check-icon > .weui-icon-success-circle:before {
  color: #151515 !important;
}
.vux-check-icon > span {
  color: #faf7f8 !important;
}
</style>
