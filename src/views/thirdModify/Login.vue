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
          type="tel"
          v-model="obj.username">
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
          placeholder="输入短信验证码"
          required
          type="tel"
          class="weui-vcode"
          :max = 4
          :show-clear="false"
          v-model="obj.verifyCode">
        </x-input>

        <popup-picker
          v-if="!checkReg"
          :data="sesameList"
          v-model="sesame"
          popup-title="芝麻分数"
          placeholder="填选芝麻信用分"
          class="login-input_last"
          value-text-align="left"
          aria-disabled="true">
          <template slot="title" slot-scope="props">
            <span :class="props.labelClass">
              <!-- <span style="vertical-align:middle;">芝麻分数</span> -->
            </span>
          </template>
        </popup-picker>
      </group>
        <div class="login-btn_warp">
          <x-button @click.native="submit" class="btn-yellow" style="border-radius:99px;" :disabled="isDisabled">注册&nbsp;/&nbsp;登录</x-button>
        </div>
    </div>
  </div>
</template>

<script>
import { TransferDom, Popup, Cell, XInput, Group, XButton, md5, CheckIcon, Picker, PopupPicker } from 'vux'
import { getLoanerRegisterLink } from '../../utils/init'
import { isWechat } from '../../utils/isWechat'
import { log } from 'util'
import { removeUserId, removeToken, removeUserInfo } from '../../utils/auth'

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
      checkReg: false,
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
  created() {
    this.iframe = getLoanerRegisterLink()
    this.obj.inviter = sessionStorage.getItem('inviter')
    if (!this.iframe) {
      this.$store.dispatch('init').then(() => {
        this.iframe = getLoanerRegisterLink()
      })
    }
    removeUserId()
    removeToken()
    removeUserInfo()
    // this.$store.dispatch('init')
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
          .then(() => {
            this.$router.push({ path: '/authentication' })
          })
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
.weui-cells {
  font-size: 14px !important;
}
.vux-popup-dialog {
  iframe {
    display: block;
    width: 100%;
    height: 1000px;
  }
}
.login-agree {
  > span {
    vertical-align: middle;
  }
}
.vux-check-icon {
  > .weui-icon-success {
    font-size: 19px !important;
  }
  > .weui-icon-circle {
    font-size: 19px !important;
  }
}
.vux-check-icon > .weui-icon-success:before,
.vux-check-icon > .weui-icon-success-circle:before {
  color: #00a7fd !important;
}
.btn-inline {
  margin-top: 5px;
  font-size: 14px;
  float: right;
  color: #000;
  text-decoration: underline;
}
.login-input_last {
  > .vux-tap-active {
    .weui-label {
      width: auto;
    }
  }
}
.vux-cell-box:not(:first-child):before {
  width: auto !important;
}
.login-group .weui-cell::before {
  left: 20px !important;
  right: 20px !important;
}
.vux-check-icon > .weui-icon-success,
.vux-check-icon > .weui-icon-circle {
  font-size: 17px !important;
}
.vux-cell-box.login-input_last::before {
  border-top: 1px solid #d9d9d9 !important;
  left: 20px !important;
  right: 20px !important;
}
.login-group .login-input_last:after {
  border: none !important;
}

.login-group .weui-cells:after {
  border-bottom: 1px solid #d9d9d9 !important;
  left: 20px !important;
  right: 20px !important;
}
.login-agree {
  text-align: center;
  margin-top: 10px;
}
.weui-btn:after {
  border: none !important;
}
.login-group .login-auto-btn {
  background: #fff !important;
  border-radius: none !important;
  color: #00a7fd !important;
}
.login-btn_warp {
  padding: 30px 25px 0;
  margin-bottom: 15px;
}
.weui-cell_access .weui-cell__ft:after {
  display: none !important;
}
ins {
  text-decoration: none;
}

.login-group .login-auto-btn {
  border-radius: none !important;
}

.login-agree {
  font-size: 12px;
  color: #666;
  > span {
    color: #00a7fd;
  }
}
.login-link {
  margin-top: 20px;
}
</style>
