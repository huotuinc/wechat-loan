<template>
  <view-box>
    <tab :line-width="2" active-color="#ff9c00" v-model="index" custom-bar-width="40px">
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
      <tabbar-item link="/publishList">
        <i slot="icon" class="iconfont icon-list"></i>
        <span slot="label">发布记录</span>
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
import { getToken, getUserId, getUserInfo } from '../../utils/auth'

const list = () => ['全部', '待审核', '待还款', '已逾期', '已结清']

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
    getToken()
    getUserId()
    getUserInfo()
    this.changeTable()

    if (!getToken()) {
      window.location.href = 'http://zhengxinapplogin'
      return
    }
  },
  methods: {
    pageChange(index) {
      switch (index) {
        case 0:
          this.$router.replace({ path: '/orderList' })
          break
        case 1:
          this.$router.replace({ path: '/orderList/pending' })
          break
        case 2:
          this.$router.replace({ path: '/orderList/repayment' })
          break
        case 3:
          this.$router.replace({ path: '/orderList/overdue' })
          break
        case 4:
          this.$router.replace({ path: '/orderList/complete' })
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
          this.activeTab = '已结清'
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
