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
        <popup-picker title="支付方式" :data="list"
                      v-model="value"
                      popup-title="支付方式"></popup-picker>
        <cell title="实际支付">
            <span style="color: red" v-html="form.money + '元'"></span>
        </cell>
      </group>
    </div>
    <div style="padding:20px;">
      <x-button @click.native="submit" type="primary">确认</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Picker, PopupPicker } from 'vux'
export default {
  created() {
    this._checkout()
  },
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
      tmp: [],
      value: [],
      list: [],
      form: {
        treatyType: 3,
        email: '',
        payType: null,
        money: null
      }
    }
  },
  methods: {
    _checkout() {
      let requestParams = {}
      requestParams.treatyType = 3
      requestParams.loanOrderId = this.$route.params.orderId
      let ret = []
      this.$store.dispatch('checkout', requestParams).then(res => {
        res.payments.forEach(item => {
          ret.push(item.name)
        })
        this.list.push(ret)
        this.tmp = res.payments
        this.form.money = res.finalAmount
      })
    },
    submit() {
      if (!this.validFormInput() || !this.validForm) {
        this.$vux.toast.text('信息填写有误')
        return
      }

      this.$store.dispatch('', this.form).then(() => {
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
      if (this.value.length !== 1 || this.value1.length !== 1) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
