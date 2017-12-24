<template>
  <div class="loan-wrap">
    <view-box>
      <tab :line-width=2 active-color='#ff9c00' v-model="index" custom-bar-width="40px">
        <tab-item class="vux-center" :selected="activeTab === item" v-for="(item, index) in tabList" @on-item-click="pageChange" :key="index">{{item}}</tab-item>
      </tab>
      <div class="loan-list-wrap">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <tabbar>
        <tabbar-item link="/">
          <i slot="icon" class="iconfont icon-loan-o"></i>
          <span slot="label">借款</span>
        </tabbar-item>
        <tabbar-item link="/todo">
          <i slot="icon" class="iconfont icon-todo"></i>
          <span slot="label">待办事项</span>
        </tabbar-item>
        <tabbar-item link="/personal">
          <i slot="icon" class="iconfont icon-personal"></i>
          <span slot="label">个人中心</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, ViewBox, Tab, TabItem } from 'vux'

const list = () => ['全部', '待审核', '待还款', '已逾期', '已完成']

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
      activeTab: '全部',
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
          this.$router.push({ path: '/orderList' })
          break
        case 1:
          this.$router.push({ path: '/orderList/pending' })
          break
        case 2:
          this.$router.push({ path: '/orderList/repayment' })
          break
        case 3:
          this.$router.push({ path: '/orderList/overdue' })
          break
        case 4:
          this.$router.push({ path: '/orderList/complete' })
          break
        default:
          break
      }
    },
    changeTable() {
      switch (this.$route.name) {
        case 'ALL':
          this.activeTab = '全部'
          break
        case 'Pending':
          this.activeTab = '待审核'
          break
        case 'Repayment':
          this.activeTab = '待还款'
          break
        case 'Overdue':
          this.activeTab = '已逾期'
          break
        case 'Complete':
          this.activeTab = '已完成'
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
  height: calc(~'100% - 44px');
  overflow: hidden;
  overflow-y: auto;
}
</style>


