<template>
  <view-box>
    <tab :line-width="2" active-color="#ff9c00" v-model="index">
      <tab-item class="vux-center" :selected="activeTab === item" v-for="(item, index) in tabList" @on-item-click="pageChange" :key="index">{{item}}</tab-item>
    </tab>
    <div class="loan-list-wrap">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <tabbar>
      <tabbar-item link="/">
        <i slot="icon" class="iconfont icon-home"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/">
        <i slot="icon" class="iconfont icon-loan-mk"></i>
        <span slot="label">贷款广场</span>
      </tabbar-item>
      <tabbar-item link="/publish">
        <i slot="icon" class="iconfont icon-borrow"></i>
        <span slot="label">我要借款</span>
      </tabbar-item>
      <tabbar-item link="/personal">
        <i slot="icon" class="iconfont icon-personal"></i>
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>
<script>
import { Tabbar, TabbarItem, ViewBox, Tab, TabItem } from 'vux'

const list = () => ['待处理', '通知']

export default {
  name: 'Layout',
  components: {
    Tabbar,
    TabbarItem,
    ViewBox,
    Tab,
    TabItem
  },
  data() {
    return {
      index01: 0,
      tabList: list(),
      activeTab: '待处理',
      index: 0
    }
  },
  created() {
    this.changeTable()
  },
  methods: {
    pageChange(index) {
      switch (index) {
        case 0:
          this.$router.push({ path: '/message/todo' })
          break
        case 1:
          this.$router.push({ path: '/message/notice' })
          break
        default:
          break
      }
    },
    changeTable() {
      switch (this.$route.name) {
        case 'TODO':
          this.activeTab = '待处理'
          break
        case 'Notice':
          this.activeTab = '通知'
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less">
.loan-list-wrap {
  position: relative;
  width: 100%;
  height: calc(~'100vh - 100px');
  overflow: hidden;
  overflow-y: auto;
}
</style>


