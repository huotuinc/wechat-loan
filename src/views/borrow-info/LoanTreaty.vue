<template>
  <div>
    <div>
      <group>
        <x-input
          name="email"
          title="接收邮箱"
          keyboard="number"
          is-type="email"
          ref="email"
          :show-clear="false"
          required
          v-model.trim="form.email">
        </x-input>
        <popup-picker title="支付方式" :data="list1"
                      v-model="value1"
                      popup-title="支付方式"></popup-picker>
        <cell title="实际支付">
            <span style="color: red">2元</span>
        </cell>
      </group>
    </div>
    <div style="padding:20px;">
      <x-button @click.native="submit" type="primary">确认</x-button>
    </div>
  </div>
</template>

<script>
  import {
    XInput,
    Group,
    XButton,
    Cell,
    Picker,
    PopupPicker
  } from 'vux'
  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      PopupPicker,
      Picker
    },
    data() {
      return {
        value: [],
        value1: [],
        list: [],
        list1: [],
        form: {
          treatyType: null,
          email: '',
          payType: null,
          money: 2
        }
      }
    },
    methods: {
      submit() {
        if (!this.validFormInput() || !this.validForm ){
          this.$vux.toast.text('信息填写有误')
          return
        }

        this.$store
          .dispatch('', this.form)
          .then(() => {
            //todo 提交成功跳转
            this.$vux.toast.text('提交成功')
          })
      },
      getEmailValid() {
        return this.$refs.email.valid
      },
      validFormInput() {
        if (this.form.email) {
          if (this.getEmailValid()) return true
          return false
        } else {
          return false
        }
      },
      validForm() {
        if (this.value.length !== 1 || this.value1.length !== 1){
          return false
        } else {
          return true
        }
      }
    }
  }

</script>

<style scoped>

</style>
