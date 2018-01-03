<template>
  <div class="list-item">
    <template v-for="order in orders">
      <router-link class="loan-card" :key="order.orderId" :to="{name:'OrderInfo', params: {orderId: order.orderId}}" >
        <div class="loan-card_hd clearfix">
          <span class="loan-hd_title">订单</span>
          <span class="loan-hd_user">借款人：{{order.userRealName}}</span>
        </div>
        <div class="loan-card_bd vux-1px-b">
          <div class="loan-bd_img">
            <img :src="order.headImgURL ? order.headImgURL : 'http://resali.huobanplus.com/cdn/avatar.png'" alt="">
          </div>
          <div class="loan-bd_content">
            <h4>{{order.userName}}</h4>
            <p>借款金额：<span>{{order.loanAmount}}元</span></p>
            <p>逾期利率：<span>{{order.overdueRate}}%</span></p>
          </div>
        </div>
        <div class="loan-card_ft vux-1px-b">
          <div class="loan-ft_content">
            <p class="loan-time">出借时间：{{order.grantTime}}</p>
            <p class="loan-time">还款日：{{order.agreedRepayTime}}</p>
          </div>
          <div class="loan-ft_status">
            <p class="text-danger">{{order.grantStatusMsg}}</p>
          </div>
        </div>
        <div class="loan-card_ft" v-if="order.grantStatus === 4 || order.grantStatus === 5 || order.grantStatus === 6">
          <div class="loan-ft_content">
            <span>逾期日期：<i class="text-danger">{{order.overdueDay}}天</i></span>
            <span>逾期利息：<i class="text-danger">{{order.overdueAmount}}元</i></span>
          </div>
        </div>
      </router-link>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    orders: Array
  }
}
</script>

