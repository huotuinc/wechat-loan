<template>
  <div class="register-wrapper">
    <div class="title">
      <h1 style="font-weight: 400;font-size: 32px;">注册</h1>
    </div>
    <div>
      <group>
        <x-input title="手机号" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"
                 ref="mobile" v-model="obj.mobile"></x-input>
      </group>
      <group class="weui-cells_form">
        <x-input title="验证码" class="weui-vcode" :min="4" name="verifyCode" ref="verifyCode" v-model="obj.verifyCode">
          <x-button slot="right" :disabled="disabled" @click.native="sendCode" type="primary" mini>{{sendButtonText}}
          </x-button>
        </x-input>
      </group>
      <group>
        <x-input title="设置密码" type="password" name="password" placeholder="请输入密码" v-model="obj.password"
                 ref="password" :min="6"></x-input>
      </group>
    </div>
    <div style="margin: 15px 0"><span style="padding-left: 15px">会员类型：借款人</span></div>
    <div style="padding:0px 13px;">
      <check-icon :value.sync="agree"><span style="font-size: 14px;vertical-align: bottom">已阅读并同意《超级借条借款条约》</span>
      </check-icon>
      <br>
    </div>
    <div style="padding:20px;">
      <x-button @click.native="submit" type="primary">注册/提交</x-button>
    </div>
  </div>
</template>

<script>
  import {XInput, Group, XButton, Cell, md5, CheckIcon} from 'vux'
  const buttonText = '发送验证码'
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
        sendButtonText: buttonText,
        agree: false,
        valid1: false,
        valid2: false,
        valid3: false,
        obj: {
          mobile: '',
          password: '',
          verifyCode: '',
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
      getValid3() {
        this.valid3 = this.$refs.verifyCode.valid
      },
      sendCode() {
        if (!this.disabled) {
          this.$store
            .dispatch('sendVerifyCode', this.mobile)
          this.disabled = true
          this.time = 10
          this.timer()
        }
      },
      timer() {
        if (this.time > 0) {
          this.time--;
          this.sendButtonText = '请' + this.time + '秒后发送'
          setTimeout(this.timer, 1000);
        } else {
          this.sendButtonText = buttonText
          this.disabled = false;
        }
      },
      submit() {
        if (!this.agree) {
          this.$vux.toast.show({
            text: '请勾选已阅读并同意《超级借条借款条约》',
            type: 'warn'
          })
          return
        }
        this.getValid1()
        this.getValid2()
        this.getValid3()
        if (this.valid1 && this.valid2 && this.valid3) {
          this.obj.password = md5(this.obj.password)
          this.$store
            .dispatch('register', this.obj)
            .then(() => {
              this.$router.push({path: '/login'})
            })
            .catch(() => {
            })
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
