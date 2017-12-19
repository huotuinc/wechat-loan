<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/index.less';
@import './style/variable.less';

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
body {
  background-color: #fbf9fe;
}
#app {
  height: 100%;
}
.loan-wrap {
  height: 100%;
}

.btn-yellow {
  background-color: @loan-yellow !important;
  color: #fff !important;
  &:active {
    background-color: darken(@loan-yellow, 5%) !important;
  }
}
.btn-white {
  background-color: #fff !important;
  color: #000 !important;
  &:active {
    background-color: darken(#fff, 5%) !important;
  }
}
</style>
