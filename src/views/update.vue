<template>
  <div class="error-page">
    <img src="../assets/update.png" alt="">
    <p>页面升级中，请稍候再试</p>
    <x-button mini @click.native="goBack">返回</x-button>
  </div>
</template>
<script>
import { XButton } from 'vux'

export default {
  name: 'error404',
  components: {
    XButton
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
.error-page {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  text-align: center;
}
.error-page p {
  margin-bottom: 20px;
}
</style>
