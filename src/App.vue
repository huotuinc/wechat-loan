<template>
  <div id="app">
   <loading :show="isLoading"></loading>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
import { Loading, TransferDom } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  directives: {
    TransferDom
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/variable.less';
@import './style/index.less';
.vux-loading .weui-toast {
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
