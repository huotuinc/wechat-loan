<template>
  <div class="login-wrapper">
    <div>
      <h2 class="title">登录</h2>
      <div class="logo-wrapper">
        <img class="logo" src="../../assets/vux_logo.png">
      </div>
    </div>

    <div>
      <group>
        <x-input title="手机号" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"
               ref="mobile"  v-model="obj.mobile"></x-input>
      </group>
      <group>
        <x-input title="请输入密码" type="password" name="password" placeholder="请输入密码" v-model="obj.password"
               ref="password"  :min="6"></x-input>
      </group>
    </div>
    <div style="padding:20px;">
      <x-button @click.native="submit" type="primary">登录</x-button>
    </div>
  </div>
</template>

<script>
  import {XInput, Group, XButton, Cell, md5, Toast} from 'vux'
  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell
    },
    data () {
      return {
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
      getValid1 () {
        this.valid1 = this.$refs.mobile.valid
      },
      getValid2 () {
        this.valid2 = this.$refs.password.valid
      },
      submit() {
        this.getValid1()
        this.getValid2()
        if( this.valid1 && this.valid2) {
          this.obj.password = md5(this.obj.password)
          this.$store.dispatch('login', this.obj).then(() => {
            this.$router.push({path: '/'})
          }).catch(() => {

          })
        } else {
          Toast.show({
            text: '手机号或密码填写错误',
          })
        }

      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 25px;
    font-weight: 400;
    text-align: center;
    margin: 20px 0;
  }

  .logo-wrapper {
    text-align: center;
  }

  .logo {
    width: 80px;
    height: 80px;
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }
</style>
