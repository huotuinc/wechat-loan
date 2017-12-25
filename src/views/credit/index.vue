<template>
<div class="loan-wrap credit-wrap">
    <tab :line-width="2" active-color="#ff9c00" class="credit-tab">
      <tab-item class="vux-center" :selected="selected ==='CreditInfo'">认证信息</tab-item>
      <tab-item class="vux-center">信用信息</tab-item>
    </tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
</div>
</template>
<script>
import { Tab, TabItem } from 'vux'

export default {
  name: 'creditReport',
  data() {
    return {
      selected: ''
    }
  },
  components: {
    Tab,
    TabItem
  },
  created() {
    this.selected = this.$route.name
  }
}
</script>
<style lang="less">
.credit-wrap {
  padding-top: 44px;
}
.credit-tab {
  position: fixed !important;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
.weui-cell_up .weui-cell__ft:after {
  border-width: 2px 0 0 2px !important;
}
.weui-cell_down .weui-cell__ft:after {
  border-width: 0 2px 2px 0 !important;
}
.credit-list {
  padding-bottom: 20px;
  .weui-cell__sub {
    .vux-cell-bd {
      padding: 10px;
      background: #f5f5f5;
    }
  }
}
</style>


