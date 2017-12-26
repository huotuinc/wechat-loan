<template>
  <div class="load-wrap">
    <loan-iframe :src="src"></loan-iframe>
  </div>
</template>
<script>
import LoanIframe from '@/components/iframe'
import { getAbout } from '../../utils/init'

export default {
  components: {
    LoanIframe
  },
  data() {
    return {
      src: ''
    }
  },
  created() {
    this.src = getAbout()
  }
}
</script>
<style lang="less">
.load-wrap {
  height: 100%;
}
</style>


