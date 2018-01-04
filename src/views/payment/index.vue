<template>
  <div class="loan-wrap">
    <div class="loan-body">
       <group class="loan-body_item">
        <x-input
          v-if="needEmail"
          name="email"
          title="接收邮箱"
          keyboard="number"
          is-type="email"
          ref="email"
          required
          :show-clear="false"
          v-model.trim="paymentForm.receiveEmail">
        </x-input>
        <popup-picker
          title="支付方式"
          :data="pickList"
          v-model="value"
          popup-title="支付方式">
        </popup-picker>
        <cell title="实际支付">
            <span class="text-danger">{{paymentMoney}}元</span>
        </cell>
      </group>
    </div>
    <div class="loan-publish_btn" style="padding:20px;">
      <x-button @click.native="submit" class="btn-yellow">确认</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Picker, PopupPicker } from 'vux'

export default {
  created() {
    this._checkout()
    this.getRedirectUrl()
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
      pickList: [],
      paymentForm: {
        receiveEmail: '',
        tradeType: '',
        payType: '',
        redirectUrl: ''
      },
      needEmail: false,
      paymentMoney: 0
    }
  },
  watch: {
    value(value) {
      this.tmp.forEach(v => {
        if (v.name === value[0]) {
          this.paymentForm.payType = v.payType
        }
      })
    }
  },
  methods: {
    _checkout() {
      const requestParams = {}
      this.paymentForm.tradeType = this.$route.params.tradeType
      requestParams.tradeType = this.$route.params.tradeType
      if (this.$route.params.orderId) {
        this.needEmail = true
        requestParams.loanOrderId = this.$route.params.orderId
        this.paymentForm.loanOrderId = this.$route.params.orderId
      }
      let ret = []
      this.$store.dispatch('checkout', requestParams).then(res => {
        res.payments.forEach(item => {
          if (item.payType === 2) {
            this.value.push(item.name)
          }
          ret.push(item.name)
        })
        if (this.value) this.value.push(res.payments[0].name)
        this.pickList.push(ret)
        this.tmp = res.payments
        this.paymentMoney = res.finalAmount
      })
    },
    submit() {
      const vm = this
      if (!this.validFormInput() || !this.validForm()) {
        this.$vux.toast.text('信息填写有误')
        return
      }
      this.$store
        .dispatch('createOrder', this.paymentForm)
        .then(res => {
          if (res.surplusAmount === 0) {
            this.$vux.alert.show({
              title: '支付完成',
              content: '已用积分抵扣',
              onHide() {
                vm.push({ path: '/' })
              }
            })
          } else {
            window.location.href = res.bizParameters.wapPayUrl
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getEmailValid() {
      return this.$refs.email.valid
    },
    validFormInput() {
      if (this.needEmail) {
        return this.paymentForm.receiveEmail && this.getEmailValid()
      } else {
        return true
      }
    },
    getRedirectUrl() {
      switch (Number(this.$route.params.tradeType)) {
        case 1:
          this.paymentForm.redirectUrl = `${window.location.origin}/authentication`
          break
        case 3:
          this.paymentForm.redirectUrl = `${window.location.origin}/treaty/${this.$route.params.orderId}`
          break
        default:
          this.paymentForm.redirectUrl = window.location.origin
      }
    },
    validForm() {
      return this.value.length > 0
    }
  }
}
</script>
<style lang="less">

</style>

