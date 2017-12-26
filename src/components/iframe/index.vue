<template>
  <iframe :src="src" frameborder="0"></iframe>
</template>
<script>
export default {
  name: 'loan-iframe',
  props: {
    src: String
  }
}
</script>
<style lang="less" scoped>
iframe {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
