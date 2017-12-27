<template>
  <div class="loan-wrap">
    <receive-template :receive="orderInfo" :is-loan="isLoan" @receive-order="receiveOrder"></receive-template>
  </div>
</template>
<script>
import ReceiveTemplate from '@/components/receive'

export default {
  name: 'ReceiveOne',
  components: {
    ReceiveTemplate
  },
  data() {
    return {
      requestData: {},
      orderInfo: {},
      isLoan: false
    }
  },
  created() {
    if (this.$route.query.orderId) {
      this.requestData.orderId = this.$route.query.orderId
    } else {
      delete this.requestData.orderId
    }

    if (this.$route.query.loanId) {
      this.requestData.loanId = this.$route.query.loanId
      this.isLoan = true
    } else {
      delete this.requestData.loanId
    }
    let getShareUrl = this.requestData.orderId ? 'getShareOrder' : 'getLoansProductInfo'
    this.requestData.from = this.$route.query.from
    this.requestData.isappinstalled = this.$route.query.isappinstalled
    this.$store.dispatch(getShareUrl, this.requestData).then(res => {
      this.orderInfo = res
    })
  },
  methods: {
    receiveOrder(data) {
      console.log(data)
      this.$store.commit('UPDATE_LOADING', { isLoading: true, text: '领取中' })
      let receiveUrl = this.requestData.orderId ? 'receiveOrder' : 'receiveLoanOrder'
      this.$store
        .dispatch(receiveUrl, data)
        .then(res => {
          this.$store.commit('UPDATE_LOADING', { isLoading: false })
          this.$router.replace('/success')
        })
        .catch(err => {
          const vm = this
          this.$store.commit('UPDATE_LOADING', { isLoading: false })
          if (err.resultCode === 4123) {
            this.$vux.alert.show({
              title: '需要信用报告',
              content: '请先注册认证',
              onHide() {
                vm.$router.replace('/login')
              }
            })
          }
        })
    }
  }
}
</script>

