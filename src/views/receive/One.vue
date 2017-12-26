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
      orderId: '',
      orderInfo: {}
    }
  },
  created() {
    this.orderId = this.$route.query.orderId
    console.log(this.orderId)
    this.$store.dispatch('getOrderInfo', this.$route.params.orderId).then(res => {
      this.orderInfo = res
    })
  },
  methods: {
    receiveOrder(data) {
      this.$store.commit('UPDATE_LOADING', { isLoading: true, text: '领取中' })
      this.$store
        .dispatch('receiveOrder', data)
        .then(res => {
          console.log(res)
          this.$store.commit('UPDATE_LOADING', { isLoading: false })
        })
        .catch(err => {
          this.$store.commit('UPDATE_LOADING', { isLoading: false })
          this.$vux.toast.text(err)
        })
    }
  }
}
</script>

