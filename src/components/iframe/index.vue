<template>
    <div v-transfer-dom>
      <popup v-model="popupShow" position="bottom" height="100vh">
        <iframe :src="src" frameborder="0"  scrolling="auto"></iframe>
      </popup>
    </div>
</template>
<script>
import { TransferDom, Popup } from 'vux'

export default {
  name: 'loan-iframe',
  directives: {
    TransferDom
  },
  components: {
    Popup
  },
  props: {
    src: String
  },
  data() {
    return {
      popupShow: true
    }
  }
}
</script>
<style lang="less" scoped>
iframe {
  display: block;
  width: 100%;
  height: 100vh;
}
</style>
