<template>
  <x-table :cell-bordered="false" :content-bordered="false" class="record-table">
    <thead>
      <tr class="record-table_hd">
        <th width="110">月份</th>
        <th>话费</th>
        <th>充值次数</th>
        <th>充值金额</th>
      </tr>
    </thead>
    <tbody>
     <tr v-for="(bill, index) in billList" :key="index">
      <td>{{bill.month}}</td>
      <td>{{bill.consumeAmount}}</td>
      <td>{{bill.rechargeCount}}</td>
      <td>{{bill.rechargeAmount}}</td>
    </tr>
    </tbody>
  </x-table>
</template>
<script>
import { XTable } from 'vux'

export default {
  components: {
    XTable
  },
  created() {
    if(Object.keys(this.billList).length === 0) {
      this.$store.dispatch('consumeBillList')
    }
  },
  computed: {
    billList() {
      return this.$store.getters.billList
    }
  }
}
</script>
