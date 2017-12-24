<template>
  <div class="loan-wrap" style="padding-bottom: 80px;">
    <iframe src="https://baidu.com" frameborder="0"></iframe>
    <div class="loan-treaty">
      <div class="loan-publish_btn">
        <x-button  class="loan-button btn-yellow" :link="{name: 'PaymentWithId', params: {tradeType:3, orderId: orderId}}">立即下载</x-button>
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
      orderId: ''
    }
  },
  methods: {
    submit() {
      this.$router.push({
        path: '/loanTreaty',
        params: { orderId: 1 }
      })
    }
  },
  created() {
    this.orderId = this.$route.params.orderId
  }
}
</script>
<style lang="less">
iframe {
  display: block;
  width: 100%;
  height: 100%;
}
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

