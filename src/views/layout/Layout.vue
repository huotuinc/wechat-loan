<template>
  <div class="loan-wrap">
    <view-box>
      <router-view />
      <tabbar>
        <tabbar-item :selected="name === 'Loan'" link="/">
          <i slot="icon" class="iconfont icon-home"></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :selected="name === 'Publish'" link="/publish">
          <i slot="icon" class="iconfont icon-borrow"></i>
          <span slot="label">我要借款</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, ViewBox } from 'vux'

export default {
  name: 'Layout',
  components: {
    Tabbar,
    TabbarItem,
    ViewBox
  },
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.name = this.$route.name
  }
}
</script>
