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
          v-model.trim="form.email">
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
import openWindow from '@/utils/openWindow'

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
      form: {
        email: '',
        payType: null,
        money: null
      },
      paymentForm: {
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
        console.log(res)
        res.payments.forEach(item => {
          ret.push(item.name)
        })
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
            openWindow(bizParameters.wapPayUrl)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    openPaymentPage(url) {
      openWindow(url)
    },
    getEmailValid() {
      return this.$refs.email.valid
    },
    validFormInput() {
      if (this.needEmail) {
        return this.form.email && this.getEmailValid()
      } else {
        return true
      }
    },
    getRedirectUrl() {
      this.paymentForm.redirectUrl = window.location.origin
    },
    validForm() {
      return this.value.length > 0
    }
  }
}
</script>
<style lang="less">

</style>

