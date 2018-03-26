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
        <popup-picker
          v-if="type === 'register'"
          :data="sesameList"
          v-model="sesame"
          popup-title="芝麻分数"
          class="login-input_last">
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
       <x-button @click.native="submit" class="btn-yellow">注册</x-button>
       <a href="javascript:;" class="btn-inline" @click="goToExpress">已有帐号</a>
    </div>
  </div>
</template>

<script>
import { TransferDom, Popup, Cell, XInput, Group, XButton, md5, CheckIcon, Picker, PopupPicker } from 'vux'
import { getLoanerRegisterLink } from '../../utils/init'

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
  watch: {
    sesame(val) {
      const index = this.sesameValue.indexOf(this.sesame[0])
      this.obj.zmfScore = index + 1
    }
  },
  created() {
    this.obj.inviter = sessionStorage.getItem('inviter')

    if (this.$route.name === 'T-Register') {
      this.type = 'register'
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
              mobile: this.obj.username,
              smsProviderType: 1
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
      let action
      let form = {}
      if (this.type === 'register') {
        action = 'register'
        form.username = this.obj.username
        form.password = md5(this.obj.password)
        form.verifyCode = this.obj.verifyCode
        form.userType = this.obj.userType
        form.zmfScore = this.obj.zmfScore
        if (this.obj.inviter) form.inviter = this.obj.inviter
      }
      if (this.type === 'forget') {
        action = 'forger'
        form.username = this.obj.username
        form.newPassword = md5(this.obj.password)
        form.verifyCode = this.obj.verifyCode
      }
      if (this.validForm()) {
        this.$store.commit('UPDATE_LOADING', { isLoading: true, text: '处理中' })
        this.$store
          .dispatch(action, form)
          .then(() => {
            if (this.type === 'register') {
              sessionStorage.removeItem('inviter')
              this.$router.push({ path: '/authentication' })
            }
            this.$store.commit('UPDATE_LOADING', { isLoading: false })
          })
          .catch(err => {
            console.log(err)
            this.$store.commit('UPDATE_LOADING', { isLoading: false })
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

      if (this.type === 'register') {
        if (this.sesame.length == 0) {
          this.$vux.toast.text('请选择芝麻分数')
          return false
        }
      }
      return true
    },
    goToExpress() {
      this.$router.push({ path: '/third/login' })
    }
  }
}
</script>
<style lang="less">
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
  color: #ff9c00 !important;
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
.vux-cell-box.login-input_last::before {
  border-top: 1px solid #d9d9d9 !important;
  left: 50px !important;
  right: 50px !important;
}
</style>
