<template>
  <div class="register-wrapper">
    <div class="title">
      <h1 style="font-weight: 400;font-size: 32px;">注册</h1>
    </div>
    <div>
      <group label-width="4.5em" label-margin-right="2em">
        <x-input
          title="手机号"
          name="mobile"
          placeholder="请输入手机号码"
          keyboard="number"
          is-type="china-mobile"
          ref="mobile"
          v-model="obj.mobile">
        </x-input>
        <x-input
          title="验证码"
          class="weui-vcode">
          <x-button
            slot="right"
            mini
            :disabled="disabled"
            @click.native="sendCode"
            type="primary">{{sendButtonText}}
          </x-button>
        </x-input>
        <x-input
          title="设置密码"
          type="password"
          name="password"
          placeholder="请输入密码"
          v-model="obj.password"
          ref="password"
          :min="6">
        </x-input>
        <cell title="会员类型" value="借款人" value-align="left"></cell>
      </group>
      <check-icon :value.sync="agree"><span style="font-size: 14px;vertical-align: bottom">已阅读并同意<a href="/">《超级借条借款条约》</a></span></check-icon>
    </div>
    <div style="padding:20px;">
      <x-button @click.native="submit" type="primary">注册/提交</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, CheckIcon } from 'vux'
export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    CheckIcon
  },
  data() {
    return {
      disabled: false,
      time: 0,
      sendButtonText: '发送验证码',
      agree: false,
      valid1: false,
      valid2: false,
      obj: {
        mobile: '',
        password: '',
        loginType: 0,
        userType: 1
      }
    }
  },
  methods: {
    getValid1() {
      this.valid1 = this.$refs.mobile.valid
    },
    getValid2() {
      this.valid2 = this.$refs.password.valid
    },
    sendCode() {
      if (!this.disabled) {
        this.disabled = true
        this.time = 10
        this.timer()
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--
        this.sendButtonText = '请' + this.time + '后发送'
        setTimeout(this.timer, 1000)
      } else {
        this.disabled = false
      }
    },
    submit() {
      if (!this.agree) {
        this.$vux.toast.text('请勾选已阅读并同意《超级借条借款条约》')
        return
      }
      this.getValid1()
      this.getValid2()
      if (this.valid1 && this.valid2) {
        this.$store
          .dispatch('login', this.obj)
          .then(() => {
            this.$router.push({ path: '/' })
          })
          .catch(() => {})
      } else {
        this.$vux.toast.show({
          text: '手机号或密码填写错误'
        })
      }
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  padding: 20px 0;
}
</style>
