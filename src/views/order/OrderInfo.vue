<template>
  <div class="loan-wrap">
    <div class="loan-body">
      <group class="loan-body_item">
        <cell :title="orderTitle">
          <i class="iconfont icon-msg" slot="icon"></i>
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
        <cell title="每月还款金额" is-link>
          <router-link class="text-danger" :to="{ name:'Installment', params: { orderId:borrowDetail.orderId } }">100元</router-link>
        </cell>
      </group>
    </template>
    <group class="loan-body_item">
      <template v-if="borrowDetail.needAuth">
        <cell title="信用报告" is-link>
          <!-- TODO 跳转信用报告 -->
          <router-link to="/authentication">
            <span v-if="borrowDetail.authStatus" class="text-success">查看</span>
            <span v-else class="text-danger">未认证</span>
          </router-link>
        </cell>
      </template>
      <cell title="放款人">
        {{borrowDetail.lenderUserName}}
      </cell>
      <template v-if="borrowDetail.grantStatus === 4 || borrowDetail.grantStatus === 5 || borrowDetail.grantStatus === 6">
        <cell title="出借条约" is-link>
          <router-link :to="{ name:'Treaty', params:{ orderId: borrowDetail.orderId } }" class="text-danger">立即查看</router-link>
        </cell>
      </template>
      <cell title="日志" is-link>日志</cell>
      <x-textarea :max="100" name="description" placeholder="补充说明" :value="borrowDetail.remarks" readonly></x-textarea>
    </group>
  </div>
</template>

<script>
import { XInput, Group, Cell, dateFormat, XTextarea } from 'vux'

export default {
  computed: {
    orderTitle() {
      let status = this.borrowDetail.grantStatus
      let repayDate = dateFormat(new Date(this.borrowDetail.agreedRepayTime), 'MM-DD')
      let days = Math.abs(this.borrowDetail.repayTimeDays)
      if (status === 5) {
        return '还款日' + repayDate + '   已逾期' + days + '天'
      }
      if (status === 4) {
        return '还款日' + repayDate + '   ' + days + '天后逾期'
      }
      return '订单状态'
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
</style>


