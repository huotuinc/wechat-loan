<template>
  <div class="loan-wrap">
    <div class="loan-body">
      <group class="loan-body_item">
        <cell :title="orderTitle" class="order-header">
          <i class="iconfont icon-order order-icon" slot="icon"></i>
          {{borrowDetail.orderStatus}}
        </cell>
      </group>
    </div>

    <group class="loan-body_item">
      <cell title="借款时间">
        {{borrowDetail.grantTime}}
      </cell>
      <cell title="借款金额">
        {{borrowDetail.loanAmount}}元
      </cell>
      <cell title="应还金额">
        {{borrowDetail.payAmount}}元
      </cell>
      <cell title="借款利息">
        <span class="text-danger">{{borrowDetail.interestAmount}}元</span>
      </cell>
      <cell title="借款期限">
        <span class="text-danger">{{borrowDetail.loanDayHtml}}</span>
      </cell>
      <cell title="逾期利率">
        {{borrowDetail.overdueRate}}%/天
      </cell>
      <cell title="逾期利息">
        <span class="text-danger">{{borrowDetail.overdueAmount}}元</span>
      </cell>
      <cell title="还款方式">
        {{borrowDetail.repayTypeName}}
      </cell>
    </group>

    <template v-if="borrowDetail.repayTypeCode === 1">
      <group class="loan-body_item">
        <cell title="每月还款金额" is-link :link="{ name:'Installment', params: { orderId:borrowDetail.orderId } }" >
          <span class="text-danger">100元</span>
        </cell>
      </group>
    </template>
    <group class="loan-body_item">
      <template v-if="borrowDetail.needAuth">
        <cell title="信用报告" is-link v-if="borrowDetail.authStatus" link="/credit">
          <span class="text-success">查看</span>
        </cell>
        <cell title="信用报告" is-link v-else link="/authentication">
          <span class="text-danger">未认证</span>
        </cell>
      </template>
      <cell title="放款人">
        {{borrowDetail.lenderUserName}}
      </cell>
      <template v-if="borrowDetail.grantStatus === 4 || borrowDetail.grantStatus === 5 || borrowDetail.grantStatus === 6">
        <cell title="借款条约" is-link :link="{ name:'Treaty', params:{ orderId: borrowDetail.orderId } }">
          <span class="text-danger">立即查看</span>
        </cell>
      </template>
      <cell title="日志" is-link v-if="borrowDetail.grantStatus === 4 || borrowDetail.grantStatus === 5 || borrowDetail.grantStatus === 6" link="/credit"></cell>
      <x-textarea :max="100" name="description" placeholder="补充说明" :value="borrowDetail.remarks" readonly></x-textarea>
    </group>
  </div>
</template>

<script>
import { XInput, Group, Cell, dateFormat, XTextarea } from 'vux'

export default {
  computed: {
    orderTitle() {
      return this.borrowDetail.repayTimeHtml || '订单状态'
    }
  },
  created() {
    this._getBorrowDetail()
  },
  methods: {
    _getBorrowDetail() {
      this.$store.dispatch('getOrderInfo', this.$route.params.orderId).then(res => {
        this.borrowDetail = res
      })
    }
  },
  components: {
    XInput,
    Group,
    Cell,
    XTextarea
  },
  data() {
    return {
      borrowDetail: {}
    }
  }
}
</script>
<style lang="less">
.loan-body_item {
  .weui-cells {
    margin-top: 6px;
  }
}
.order-icon {
  color: #ff9c00 !important;
  background: #fff !important;
  margin-right: 4px !important;
  font-size: 24px !important;
}
.order-header {
  .vux-label {
    font-size: 14px !important;
  }
}
</style>


