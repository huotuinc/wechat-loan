<template>
  <div class="borrowInfo-wrapper">
    <group>
      <cell :title="orderTitle">
        {{borrowDetail.orderStatus}}
      </cell>
    </group>
    <group>
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
        {{borrowDetail.interestAmount}}元
      </cell>
      <cell title="借款期限">
        {{borrowDetail.loanDay}}
      </cell>
      <cell title="逾期利率">
        {{borrowDetail.overdueRate}}%/天
      </cell>
      <cell title="逾期利息">
        {{borrowDetail.overdueAmount}}元
      </cell>
      <cell title="还款方式">
        {{borrowDetail.repayType}}
      </cell>
    </group>

    <div v-if="borrowDetail.repayTypeCode === 1">
      <group>
        <cell title="每月还款金额" is-link>
          <router-link to="{path:'borrowInfo',params:{id:borrowDetail.orderId}}">
            100元
          </router-link>
        </cell>
      </group>
    </div>

    <group>
      <div v-if="borrowDetail.needAuth">
        <cell title="信用报告" is-link>
          <div v-if="borrowDetail.authStatus">
            <router-link to="/login"><!--查看信用报告-->
              <span style="color: green">查看</span>
            </router-link>
          </div>
          <div v-else>
            <router-link to="/login"><!--跳转到认证页面-->
              <span style="color: red">未认证</span>
            </router-link>
          </div>
        </cell>
      </div>
      <cell title="放款人">
        {{borrowDetail.lenderUserName}}
      </cell>
      <div v-if="borrowDetail.grantStatus === 4
      || borrowDetail.grantStatus === 5
      || borrowDetail.grantStatus === 6">
      <cell title="出借条约" is-link @click.native="selectTreaty">
          立即查看
      </cell>
      </div>
      <cell title="日志" is-link>
        日志
      </cell>
      <cell title="补充说明">
        {{borrowDetail.remarks}}
      </cell>
    </group>
  </div>
</template>

<script>
import { XInput, Group, Cell, dateFormat } from 'vux'
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
    selectTreaty() {
      this.$router.push({
        path: '/loanTreatyPage',
        params: { orderId: 1 }
      })
    },
    _getBorrowDetail() {
      this.$store
        .dispatch('getOrderInfo', 1) //this.$route.params.id
        .then(res => {
          this.borrowDetail = res
        })
    }
  },
  components: {
    XInput,
    Group,
    Cell
  },
  data() {
    return {
      borrowDetail: {}
    }
  }
}
</script>
