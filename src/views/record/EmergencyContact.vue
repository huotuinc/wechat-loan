<template>
  <x-table :cell-bordered="false" :content-bordered="false" class="record-table">
    <thead>
      <tr class="record-table_hd">
        <th width="150"></th>
        <th>主要联系人</th>
        <th>其他联系人</th>
      </tr>
    </thead>
    <tbody>
     <tr>
        <td>电话号码</td>
        <td>{{important.mobile}}</td>
        <td>{{other.mobile}}</td>
    </tr>
    <tr>
        <td>关系</td>
        <td>{{important.relation}}</td>
        <td>{{other.relation}} </td>
    </tr>
    <tr>
        <td>归属地</td>
        <td>{{important.location}}</td>
        <td>{{other.location}}</td>
    </tr>
    <tr>
        <td>近3个月通话次数</td>
        <td>{{important.threeMonthCount}}</td>
        <td>{{other.threeMonthCount}}</td>
    </tr>
    <tr>
        <td>近3个月通话时长（秒）</td>
        <td>{{important.threeMonthTime}}</td>
        <td>{{other.threeMonthTime}}</td>
    </tr>
    <tr>
        <td>近6个月通话次数</td>
        <td>{{important.sixMonthCount}}</td>
        <td>{{other.sixMonthCount}}</td>
    </tr>
    <tr>
        <td>近6个月通话时长（秒）</td>
        <td>{{important.sixMonthTime}}</td>
        <td>{{other.sixMonthTime}}</td>
    </tr>
    <tr>
        <td>近6个月主叫通话次数</td>
        <td>{{important.activeCount}}</td>
        <td>{{other.activeCount}}</td>
    </tr>
    <tr>
        <td>近6个月被叫通话次数（秒） </td>
        <td>{{important.passiveCount}}</td>
        <td>{{other.passiveCount}}</td>
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
  data() {
    return {
      important: {},
      other: {}
    }
  },
  created() {
    if (this.emergencyList.length === 0) {
      this.$store.dispatch('emergencyContactList').then(res => {
        this.important = res.filter(function(p) {
          if (p.isImportant) return p
        })[0]
        this.other = res.filter(function(p) {
          if (!p.isImportant) return p
        })[0]
      })
    } else {
      this.important = this.emergencyList.filter(function(p) {
        if (p.isImportant) return p
      })[0]
      this.other = res.filter(function(p) {
        if (!p.isImportant) return p
      })[0]
    }
  },
  computed: {
    emergencyList() {
      return this.$store.getters.emergencyList
    }
  }
}
</script>
