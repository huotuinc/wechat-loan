<template>
  <div class="repay-wrap">
    <flow orientation="vertical" :style="heightStyle">
      <template v-for="(item, index) in repayDetail">
        <flow-state :is-done="currentDate === item.repayDate" :key="index">
          <div slot="title">
            <p>{{item.repayDate}}</p>
            <p class="text-danger">{{item.payAmount}}元</p>
            <p>含本金<span v-html="item.amount"></span>元 + 利息<span v-html="item.interestAmount"></span>元</p>
          </div>
        </flow-state>
        <flow-line v-if="index < repayDetail.length - 1"></flow-line>
      </template>
    </flow>
  </div>
</template>

<script>
import { Flow, FlowState, FlowLine, dateFormat } from 'vux'
export default {
  computed: {
    currentDate() {
      return dateFormat(new Date(), 'YYYY-MM-DD')
    },
    heightStyle() {
      return `height:${this.repayDetail.length * 85}px`
    }
  },
  created() {
    this._getRepayDetail()
  },
  methods: {
    _getRepayDetail() {
      this.$store.dispatch('getRepayDetail', this.$route.params.id).then(res => {
        this.repayDetail = res
      })
    }
  },
  components: {
    Flow,
    FlowState,
    FlowLine
  },
  data() {
    return {
      repayDetail: []
    }
  }
}
</script>

<style lang="less">
@import '../../style/variable.less';

.repay-wrap {
  padding-bottom: 40px;
  background: #fff !important;
}
.weui-wepay-flow__bd {
  justify-content: left !important;
  -webkit-box-align: left !important;
  -ms-flex-align: left !important;
  align-items: left !important;
}
.weui-wepay-flow,
.weui-wepay-flow-auto {
  padding: 30px !important;
}
.weui-wepay-flow__li {
  width: 10px !important;
  height: 10px !important;
}
.weui-wepay-flow__li .weui-wepay-flow__state {
  left: -5px !important;
  width: 10px !important;
  height: 10px !important;
}
.weui-wepay-flow_vertical .weui-wepay-flow__line {
  width: 1px !important;
}
.weui-wepay-flow__li_done .weui-wepay-flow__state {
  background-color: @loan-yellow !important;
}
.weui-wepay-flow__title-right {
  margin-top: 20px;
}
</style>
