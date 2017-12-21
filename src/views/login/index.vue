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
          name="mobile"
          placeholder="手机号码"
          keyboard="number"
          is-type="china-mobile"
          ref="mobile"
          :show-clear="false"
          required
          v-model.trim="form.mobile"
          class="login-input">
          <i slot="label" class="iconfont icon-mobile"></i>
        </x-input>
        <x-input
          type="password"
          name="password"
          placeholder="请输入密码"
          v-model.trim="form.password"
          ref="password"
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
        mobile: '',
        password: '',
        loginType: 0,
        userType: 1
      }
    }
  },
  methods: {
    getMobileValid() {
      return this.$refs.mobile.valid
    },
    getPwdValid() {
      return this.$refs.password.valid
    },
    submit() {
      if (this.validForm()) {
        this.form.password = md5(this.form.password)
        this.$store
          .dispatch('login', this.form)
          .then(() => {
            this.$router.push({ path: '/' })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$vux.toast.text('手机号或密码错误')
      }
    },
    validForm() {
      if (this.form.mobile && this.form.password) {
        if (this.getMobileValid() && this.getPwdValid()) return true
        return false
      } else {
        return false
      }
    }
  }
}
</script>
