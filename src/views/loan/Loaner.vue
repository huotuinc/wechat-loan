<template>
  <div class="loan-wrap">
    <div class="loaner-head">
      <div class="background"></div>
      <div class="info"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoanerDetail'
}
</script>
<style lang="less">
.loaner-head {
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    background: #ff9c00;
  }
  .info {
    position: relative;
    margin: 48px 16px 16px;
    min-height: 183px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 5px 3px rgba(4, 0, 0, 0.11);
  }
}
</style>
