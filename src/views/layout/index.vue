<template>
  <div class="loan-wrap">
    <view-box>
      <router-view />
      <tabbar>
        <tabbar-item link="/">
          <i slot="icon" class="iconfont icon-loan-o"></i>
          <span slot="label">借款</span>
        </tabbar-item>
        <tabbar-item :selected="path === '/todo'" link="/todo">
          <i slot="icon" class="iconfont icon-todo"></i>
          <span slot="label">待办事项</span>
        </tabbar-item>
        <tabbar-item :selected="path === '/personal'" link="/personal">
          <i slot="icon" class="iconfont icon-personal"></i>
          <span slot="label">个人中心</span>
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
      path: ''
    }
  },
  created() {
    this.path = this.$route.path
  }
}
</script>
