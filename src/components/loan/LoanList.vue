<template>
  <div class="loan-list">
    <list-item></list-item>
  </div>
</template>
<script>
import ListItem from './LoanListItem'

export default {
  components: {
    ListItem
  },
  props: {
    item: String
  }
}
</script>
<style lang="less">
.loan-list {
  padding: 10px 5px;
}
</style>
