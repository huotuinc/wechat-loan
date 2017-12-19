<template>
  <div class="login-wrapper">
    <div class="login-hd">
      <div class="logo-wrapper">
        <img class="logo" src="../../assets/logo.png">
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

<style lang="less">
@import '../../style/variable.less';

.login-wrapper {
  height: 100%;
  background: #fff;
}
.login-hd {
  padding-top: 10px;
  margin-bottom: 60px;
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
.login-btn_warp {
  padding: 20px 50px;
}
.login-group {
  .weui-cells:before {
    border-top: none !important;
  }
  .weui-cells:after {
    border-bottom: none !important;
  }
  .weui-cell {
    padding: 10px 50px !important;
    &::before {
      left: 50px !important;
      right: 50px !important;
    }
    .iconfont {
      padding: 0 10px;
      color: #000;
      font-size: 20px;
    }
  }
  .login-input_last {
    &:after {
      content: ' ';
      position: absolute;
      bottom: 0;
      right: 50px;
      height: 1px;
      border-bottom: 1px solid #d9d9d9;
      color: #d9d9d9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 50px;
    }
  }
  .weui-cell_warn {
    &::before {
      border-top: 1px solid @loan-red !important;
    }
    &::after {
      border-bottom: 1px solid @loan-red !important;
    }
    .weui-cell__ft {
      display: none;
    }
    .iconfont {
      color: @loan-red;
    }
  }
}
</style>
