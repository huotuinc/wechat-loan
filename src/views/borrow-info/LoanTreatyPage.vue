<template>
  <div>
    <div>
      <p v-for="i in 100">{{i}}</p>
    </div>
    <div style="position: fixed;top: 650px;text-align: center">
      <x-button @click.native="submit" type="primary">立即下载</x-button>
    </div>
  </div>

</template>

<script>
  import {
    XButton
  } from 'vux'
  export default {
    components: {
      XButton
    },
    data() {
      return {}
    },
    methods: {
      submit() {
        this.$router.push({
          path: '/loanTreaty',
          params:{orderId:1}
        })
      }
    }
  }
</script>

<style scoped>

</style>
