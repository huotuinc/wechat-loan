<template>
  <div class="is-empty" v-if="empty && once">
      <img src="../../assets/empty.png" alt="空数据">
      <p>{{text || '暂无数据'}}</p>
  </div>
</template>
<script>
export default {
  name: 'Empty',
  data() {
    return {
      once: true
    }
  },
  props: {
    empty: Boolean,
    text: String
  },
  watch: {
    empty(value) {
      this.once = value
    }
  }
}
</script>

