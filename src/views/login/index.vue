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
        </x-input>
        <x-input
          type="password"
          name="input"
          placeholder="请输入密码"
          v-model.trim="form.input"
          ref="input"
          required
          :min="6"
          class="login-input_last">
          <i slot="label" class="iconfont icon-password"></i>
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
      <p>
        <router-link to="/forget">忘记密码</router-link>
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
      form: {
        username: '',
        input: '',
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
    getPwdValid() {
      return this.$refs.input.valid
    },
    submit() {
      let login = {}
      login.username = this.form.username
      login.input = md5(this.form.input)
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
        this.$vux.toast.text('手机号或密码错误')
      }
    },
    validForm() {
      if (this.form.username && this.form.input) {
        if (this.getMobileValid() && this.getPwdValid()) return true
        return false
      } else {
        return false
      }
    }
  }
}
</script>
