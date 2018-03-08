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
        <x-input
          type="password"
          name="password"
          placeholder="请设置密码"
          v-model="obj.password"
          ref="password"
          class="login-input_last"
          :min="6"
          required
         >
          <i slot="label" class="iconfont icon-password"></i>
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
        <div class="login-agree" v-if="type === 'register'">
          <check-icon :value.sync="hasChecked"><span>我已阅读并同意</span></check-icon><span>《<ins @click="open">注册服务协议</ins>》</span>
        </div>
      </group>
    </div>
    <div class="login-btn_warp">
       <x-button @click.native="submit" class="btn-yellow">{{type === 'register' ? '注册' : '提交'}}</x-button>
       <x-button class="btn-white" link="/login" v-if="type === 'register'">已有帐号</x-button>
       <p class="login-tips">会员类型 - 借款人</p>
    </div>
    <div class="login-link">
      <p>
        <router-link to="/download">我是出借人</router-link>
      </p>
    </div>
    <div v-transfer-dom>
      <popup v-model="popupShow" position="bottom" max-height="50%">
        <iframe :src="iframe" frameborder="0"></iframe>
      </popup>
    </div>
  </div>
</template>

<script>
import { TransferDom, Popup, Cell, XInput, Group, XButton, md5, CheckIcon, Picker, PopupPicker } from 'vux'
import { getLoanerRegisterLink } from '../../utils/init'
import { isWechat } from '../../utils/isWechat'

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
      hasChecked: true,
      disabled: false,
      time: 0,
      timer: '',
      sendButtonText: '获取验证码',
      obj: {
        username: '',
        password: '',
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
    this.iframe = getLoanerRegisterLink()
    this.obj.inviter = sessionStorage.getItem('inviter')
    if (!this.iframe) {
      this.$store.dispatch('init').then(() => {
        this.iframe = getLoanerRegisterLink()
      })
    }
    if (this.$route.path === '/register') {
      this.type = 'register'
    }
    if (this.$route.path === '/forget') {
      this.type = 'forget'
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
              if (isWechat()) {
                if (form.inviter) {
                  sessionStorage.removeItem('inviter')
                  history.replaceState(null, '过海有信', '/')
                  this.$router.push({ path: '/authentication' })
                } else {
                  this.$router.push({ path: '/publish' })
                }
              } else {
                this.$router.push({ path: '/splash', query: { to: 'publish' } })
              }
            }
            if (this.type === 'forget') {
              this.$router.push({ path: '/login' })
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

      if (this.obj.password == '') {
        this.$vux.toast.text('密码设置错误')
        return false
      }

      if (!this.getPwdValid()) {
        this.$vux.toast.text('密码设置错误')
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
    open() {
      if (!this.iframe) return
      this.popupShow = true
    },
    goToExpress() {
      this.$router.push({ path: '/express' })
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
.vux-cell-box.login-input_last::before {
  border-top: none !important;
}
</style>
