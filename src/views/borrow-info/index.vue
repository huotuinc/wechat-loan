<template>
  <div class="borrowInfo-wrapper">
    <group>
      <cell title="订单状态">
        待审核
      </cell>
    </group>
    <group>
      <cell title="借款时间">
        2017-08-29
      </cell>
      <cell title="借款金额">
        830元
      </cell>
      <cell title="应还金额">
        830元
      </cell>

      <cell title="借款利息">
        0元
      </cell>
      <cell title="借款期限">
        20天
      </cell>
      <cell title="逾期利率">
        0.1%/天
      </cell>
      <cell title="逾期利息">
        0元
      </cell>
      <cell title="还款方式">
        到期还本付息
      </cell>
    </group>

    <group>
      <cell title="每月还款金额" is-link>
        100元
      </cell>
    </group>

    <group>
      <cell title="信用报告" is-link>
        已提交
      </cell>
      <cell title="放款人" is-link>
        李四
      </cell>
      <cell title="出借条约" is-link>
        立即查看
      </cell>
      <cell title="日志">
        日志
      </cell>
      <cell title="补充说明">
        一些说明文字
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
      }
    },
    components: {
      XInput,
      Group,
      Cell
    },
    data() {
      return {}
    },
  }
</script>

<style scoped>

</style>
