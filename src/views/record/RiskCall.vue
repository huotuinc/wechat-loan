<template>
  <x-table :cell-bordered="false" :content-bordered="false" class="record-table">
    <thead>
      <tr class="record-table_hd">
        <th></th>
        <th>通话数量</th>
        <th>通话次数</th>
        <th>通话时长</th>
        <th>短信次数</th>
      </tr>
    </thead>
    <tbody>
     <tr v-for="(risk, index) in riskList" :key="index">
        <td>{{risk.riskType}}</td>
        <td>{{risk.contactCount}}</td>
        <td>{{risk.callCount}}</td>
        <td>{{risk.callTime}}</td>
        <td>{{risk.msgCount}}</td>
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
    if(Object.keys(this.riskList).length === 0) {
      this.$store.dispatch('riskCallList')
    }
  },
  computed: {
    riskList() {
      return this.$store.getters.riskCallList
    }
  }
}
</script>
