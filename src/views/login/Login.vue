<template>
  <div class="login-wrapper">
    <div class="login-hd">
      <h2 class="title">登录</h2>
      <div class="logo-wrapper">
        <!-- <img class="logo" src="../../assets/vux_logo.png"> -->
      </div>
    </div>

    <div>
      <group>
        <x-input
          title="手机号"
          name="mobile"
          placeholder="请输入手机号码"
          keyboard="number"
          is-type="china-mobile"
          ref="mobile"
          :show-clear="false"
          required
          v-model.trim="form.mobile">
        </x-input>
      </group>
      <group>
        <x-input
          title="密码"
          type="password"
          name="password"
          placeholder="请输入密码"
          v-model.trim="form.password"
          ref="password"
          required
          :min="6">
        </x-input>
      </group>
    </div>
    <div style="padding:20px;">
      <x-button @click.native="submit" type="primary">登录</x-button>
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

<style>
.login-hd {
  overflow: hidden;
}
.login-hd .title {
  font-size: 25px;
  font-weight: 400;
  text-align: center;
  margin: 20px 0;
}
.login-hd .logo-wrapper {
  text-align: center;
}
.login-hd .logo {
  width: 80px;
  height: 80px;
}
</style>
