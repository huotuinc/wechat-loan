<template>
  <div class="personal">
    <div class="personal-header clearfix">
      <div class="personal-header_info">
        <h4 class="title">待还款金额 / 元</h4>
        <h2 class="total">{{personal.loanAmount}}</h2>
        <span class="tel">{{personal.userName}}</span>
      </div>
      <div class="personal-header_avatar">
        <img :src="personal.headimg" alt="头像">
      </div>
    </div>
    <div class="personal-grid">
      <div class="personal-grid_item">
        <router-link to="/orderList/pending">
          <i class="iconfont icon-apply"></i>
          <span class="label">待审核</span>
          <badge :text="personal.countNoComplete" v-if="personal.countNoComplete > 0"></badge>
        </router-link>
      </div>
      <div class="personal-grid_item">
        <router-link to="/orderList/repayment">
          <i class="iconfont icon-bank-card"></i>
          <span class="label">待还款</span>
          <badge :text="personal.countRepayment" v-if="personal.countRepayment > 0"></badge>
        </router-link>
      </div>
      <div class="personal-grid_item">
        <router-link to="/orderList/overdue">
          <i class="iconfont icon-over"></i>
          <span class="label">已逾期</span>
          <badge :text="personal.countLoanOverdue" v-if="personal.countLoanOverdue > 0"></badge>
        </router-link>
      </div>
      <div class="personal-grid_item personal-grid_border">
        <i class="iconfont icon-loan"></i>
        <span class="label">我的借款</span>
      </div>
    </div>
    <div class="loan-body">
      <group class="loan-body_item">
        <cell is-link title="系统消息">
          <i class="iconfont icon-msg" slot="icon"></i>
        </cell>
      </group>
      <group class="loan-body_item">
        <cell is-link title="发布记录">
          <i class="iconfont icon-add" slot="icon"></i>
        </cell>
      </group>
      <group class="loan-body_item">
        <cell is-link title="设置" link="/setting">
          <i class="iconfont icon-setting" slot="icon"></i>
        </cell>
      </group>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Badge } from 'vux'

export default {
  name: 'Personal',
  components: {
    Group,
    Cell,
    Badge
  },
  data() {
    return {
      personal: {}
    }
  },
  created() {
    this.$store.dispatch('personalIndex').then(res => {
      this.personal = res
    })
  }
}
</script>
<style lang="less">
.personal-grid_item {
  a {
    color: #000;
  }
}
</style>



