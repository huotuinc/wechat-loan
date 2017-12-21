<template>
  <div>
    <flow orientation="vertical" :style="heightStyle">
      <template  v-for="(item,index) in repayDetail">
      <flow-state :state="repayDetail.length - index" :is-done="currentDate === item.repayDate">
        <span slot="title">
        <p v-html="item.repayDate"></p>
        <p v-html="item.payAmount + '元'"></p>
          <p>含本金<span v-html="item.amount"></span>元+利息<span v-html="item.interestAmount"></span>元</p>
        </span>
      </flow-state>
      <flow-line v-if="index < repayDetail.length - 1"></flow-line>
      </template>
    </flow>
  </div>
</template>

<script>
  import { Flow, FlowState, FlowLine ,dateFormat} from 'vux'
  export default {
    computed: {
      currentDate() {
        return dateFormat(new Date(),'YYYY-MM-DD')
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
        this.$store
          .dispatch('getRepayDetail', 1)//        this.$route.params.id
          .then((res) => {
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

<style scoped>

</style>
