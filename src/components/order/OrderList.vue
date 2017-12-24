<template>
  <div class="loan-list">
    <order-item :orders="orders"></order-item>
  </div>
</template>
<script>
import OrderItem from './OrderListItem'

export default {
  components: {
    OrderItem
  },
  props: {
    orders: Array
  }
}
</script>
<style lang="less">
.loan-list {
  padding: 10px 5px;
}
</style>
