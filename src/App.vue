<template>
  <div id="app">
   <waiting :show="isLoading" :text="text" :progress="isProgress" :percent="percent"></waiting>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
import Waiting from './components/waiting'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Waiting
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading,
      text: state => state.vux.text,
      isProgress: state => state.vux.isProgress,
      percent: state => state.vux.percent
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/variable.less';
@import './style/index.less';
</style>
