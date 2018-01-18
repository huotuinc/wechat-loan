<template>
  <div>
    <div class="loan-head vux-1px-b">
        <div class="loan-head_hd">
          <img :src="page.headimg ? page.headimg : 'http://resali.huobanplus.com/cdn/avatar.png'" alt="头像">
        </div>
        <div class="loan-head_bd">
          <p class="loan-head_title">我的负债</p>
          <h2 class="loan-head_debt">{{page.myLoanAmount}}</h2>
          <span class="loan-head_my"><i class="iconfont icon-zhi-ma"></i>&nbsp;信用认证：</span><span>{{page.authMsg}}</span>
        </div>
    </div>
    <div class="loan-msg">
      <div class="loan-msg_item">
        <p>10</p>
        <span>好友消息</span>
      </div>
      <div class="loan-msg_item">
        <p>1</p>
        <span>借款次数</span>
      </div>
      <div class="loan-msg_item">
        <p>10</p>
        <span>通知</span>
      </div>
    </div>
    <div class="loan-body">
      <div class="loan-square">
        <i class="iconfont "></i>
      </div>
    </div>
    <!-- <div class="loan-footer">
        <x-button class="loan-button btn-yellow" link="/publish">我要借款</x-button>
    </div> -->
  </div>
</template>
<script>
import { Group, Cell, Grid, GridItem, XButton } from 'vux'

export default {
  name: 'Loan',
  components: {
    Group,
    Cell,
    Grid,
    GridItem,
    XButton
  },
  data() {
    return {
      page: {}
    }
  },
  created() {
    this.$store.dispatch('getIndex').then(res => {
      this.page = res
    })
  }
}
</script>
<style lang="less">
.loan-head {
  padding: 25px 10px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  background: #fff;
  .loan-head_hd {
    margin-right: 10px;
    width: 74px;
    height: 74px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  .loan-head_bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    > span {
      font-size: 12px;
      color: #ababab;
    }
  }
  .loan-head_title {
    font-size: 15px;
    color: #434343;
  }
  .loan-head_debt {
    font-size: 42px;
    color: #ff9c00;
    line-height: 1;
  }
  .loan-head_my {
    color: #ff9c00 !important;
  }
}
.loan-msg {
  padding: 10px 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  text-align: center;
  background: #fff;
  .loan-msg_item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  p {
    font-size: 16px;
    color: #010101;
    line-height: 1.2;
  }
  span {
    color: #ababab;
    font-size: 14px;
  }
}
</style>
