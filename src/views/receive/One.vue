<template>
  <div class="loan-wrap">
    <receive-template :receive="orderInfo" @receive-order="receiveOrder"></receive-template>
  </div>
</template>
<script>
import ReceiveTemplate from '@/components/receive'

export default {
  name: 'Receive',
  components: {
    ReceiveTemplate
  },
  data() {
    return {
      requestData: {},
      orderInfo: {}
    }
  },
  created() {
    this.requestData.orderId = this.$route.query.orderId
    this.requestData.from = this.$route.query.from
    this.requestData.isappinstalled = this.$route.query.isappinstalled
    console.log(this.requestData)
    this.$store.dispatch('getShareOrder', this.requestData).then(res => {
      this.orderInfo = res
    })
  },
  methods: {
    receiveOrder(data) {
      this.$store.commit('UPDATE_LOADING', { isLoading: true, text: '领取中' })
      this.$store
        .dispatch('receiveOrder', data)
        .then(res => {
          this.$store.commit('UPDATE_LOADING', { isLoading: false })
          this.$router.replace('/orderList')
        })
        .catch(err => {
          this.$store.commit('UPDATE_LOADING', { isLoading: false })
          this.$vux.toast.text('领取失败')
        })
    }
  }
}
</script>

