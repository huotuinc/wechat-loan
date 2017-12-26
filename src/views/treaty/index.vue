<template>
  <div class="loan-wrap" style="padding-bottom: 80px;">
    <div>{{html}}</div>
    <div class="loan-treaty">
      <div class="loan-publish_btn">
        <x-button  class="loan-button btn-yellow" @click.native="submit">立即下载</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux'

export default {
  components: {
    XButton
  },
  data() {
    return {
      orderId: '',
      hasPayed: false,
      receiveEmail: '',
      show: false,
      html: ''
    }
  },
  methods: {
    submit() {
      if (this.hasPayed) {
        this.$store.dispatch('sendEsign', { orderId: this.orderId, receiveEmail: this.receiveEmail }).then(() => {
          this.$vux.alert.show({
            title: '发送成功',
            content: '已发送到你的邮箱，请注册查收'
          })
        })
      } else {
        this.$router.push({
          name: 'PaymentWithId',
          params: { tradeType: 3, orderId: this.orderId }
        })
      }
    }
  },
  created() {
    this.orderId = this.$route.params.orderId
    this.$store.dispatch('getEsign', this.orderId).then(res => {
      this.html = res
    })
    this.$store.dispatch('checkPayment', this.orderId).then(res => {
      this.hasPayed = res.hasPayed
      this.receiveEmail = res.receiveEmail
    })
  }
}
</script>
<style lang="less">
.loan-treaty {
  padding: 20px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: #fff;
  box-sizing: border-box;
}
</style>

