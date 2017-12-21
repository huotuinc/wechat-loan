<template>
  <div class="borrowInfo-wrapper">
    <group>
      <cell title="订单状态">
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
          <router-link to="/login">
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
      <cell title="出借条约" is-link>
        <router-link to="{path:'/borrowInfo',params:{id:borrowDetail.orderId}}">
          立即查看
        </router-link>
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
  import {XInput, Group, Cell,} from 'vux'
  export default {
    created() {
      this._getBorrowDetail()
    },
    methods: {
      _getBorrowDetail() {
        this.$store
          .dispatch('getOrderInfo', 1)
          //        this.$route.params.id
          .then((res) => {
            this.borrowDetail = res
            //todo 提交成功跳转
            this.$vux.toast.text('提交成功')
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
    },
  }
</script>

<style scoped>

</style>
