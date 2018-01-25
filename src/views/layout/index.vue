<template>
  <div class="loan-wrap">
    <router-view />
    <tabbar>
      <tabbar-item :selected="name === 'Loan'" link="/">
        <i slot="icon" class="iconfont icon-home"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/forend/project/list?userId=339">
        <i slot="icon" class="iconfont icon-loan-mk"></i>
        <span slot="label">贷款广场</span>
      </tabbar-item>
      <tabbar-item :selected="name === 'Publish'" link="/publish">
        <i slot="icon" class="iconfont icon-borrow"></i>
        <span slot="label">我要借款</span>
      </tabbar-item>
      <tabbar-item :selected="name === 'Personal'" link="/personal">
        <i slot="icon" class="iconfont icon-personal"></i>
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
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
