<template>
  <div class="loan-wrap">
    <router-view />
    <tabbar>
      <tabbar-item :selected="name === 'Loan'" link="/">
        <i slot="icon" class="iconfont icon-home"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="http://loanmarket.51morecash.com/forend/project/list">
        <i slot="icon" class="iconfont icon-loan-mk"></i>
        <span slot="label">贷款广场</span>
      </tabbar-item>
      <tabbar-item :selected="name === 'PublishList'" link="/publishList">
        <i slot="icon" class="iconfont icon-list"></i>
        <span slot="label">发布记录</span>
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
import { getUserId } from '../../utils/auth'
export default {
  name: 'Layout',
  components: {
    Tabbar,
    TabbarItem,
    ViewBox
  },
  data() {
    return {
      name: '',
      market: ''
    }
  },
  watch: {
    $route(route) {
      this.name = route.name
    }
  },
  created() {
    this.name = this.$route.name
    let userId = getUserId()
    switch (window.MODE_BRANCH) {
      // case 'master':
      //   this.market = `http://loanmarket.51morecash.com/forend/project/list`
      //   break
      case 'dev':
        this.market = `http://market.51huotao.com/forend/project/list`
        break
      default:
        this.market = 'http://loanmarket.51morecash.com/forend/project/list'
    }
  }
}
</script>
