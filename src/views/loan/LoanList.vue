<template>
  <div class="loan-wrap">
    <tab :line-width=2 active-color='#ff9c00' v-model="index" custom-bar-width="40px">
      <tab-item class="vux-center" :selected="activeTab === item" v-for="(item, index) in tabList" @click="activeTab = item" :key="index">{{item}}</tab-item>
    </tab>
    <div class="loan-list-wrap">
       <loan-list></loan-list>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
import LoanList from '../../components/loan/LoanList'

const list = () => ['全部', '待审核', '待还款', '已逾期', '已完成']
export default {
  components: {
    Tab,
    TabItem,
    LoanList
  },
  data() {
    return {
      index01: 0,
      tabList: list(),
      activeTab: '全部',
      index: 0
    }
  },
  methods: {}
}
</script>
<style lang="less">
.vux-tab {
  position: fixed;
  width: 100%;
  z-index: 999;
}
.loan-list-wrap {
  padding-top: 44px;
  height: calc(~'100% - 44px');
}
</style>

