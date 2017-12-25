<template>
  <group class="loan-body_item credit-list" title="基本信息">
    <cell title="姓名">
      {{info.name}}
    </cell>
    <cell title="芝麻分">
      {{info.sesameScore}}
    </cell>
    <cell title="身份证">
      {{info.idNumber}}
    </cell>
    <cell title="手机号">
      {{info.mobile}}元
    </cell>
    <cell title="微信号">
      {{info.wechatAccount}}
    </cell>
    <cell
      title="现居地"
      is-link
      :class="homeAddress ? 'weui-cell_up': 'weui-cell_down'"
      @click.native="toggleClass('homeAddress')">
    </cell>
    <cell class="weui-cell__sub" :title="info.homeAddress" v-show="homeAddress">
    </cell>
    <cell title="设备型号">
      {{info.device}}
    </cell>
    <cell title="学历">
      {{info.education}}
    </cell>
    <cell title="房产状况">
      {{info.realState}}
    </cell>
    <cell title="婚姻状况">
      {{info.marry}}
    </cell>
    <cell
      title="单位名称"
      is-link
      :class="unitName ? 'weui-cell_up': 'weui-cell_down'"
      @click.native="toggleClass('unitName')">
    </cell>
    <cell class="weui-cell__sub" :title="info.unitName" v-show="unitName">
    </cell>
    <cell title="单位工龄">
      {{info.workTime}}
    </cell>
    <cell title="月薪范围">
      {{info.annualIncome}}元
    </cell>
    <cell
      title="单位地址"
      is-link
      :class="unitAddress ? 'weui-cell_up': 'weui-cell_down'"
      @click.native="toggleClass('unitAddress')">
    </cell>
    <cell class="weui-cell__sub" :title="info.unitAddress" v-show="unitAddress">
    </cell>
  </group>
</template>
<script>
import { Group, Cell } from 'vux'

export default {
  name: 'certificationInfo',
  components: {
    Group,
    Cell
  },
  data() {
    return {
      info: {},
      homeAddress: false,
      unitAddress: false,
      unitName: false
    }
  },
  created() {
    this.$store.dispatch('certificationInfo').then(res => {
      this.info = res
    })
  },
  methods: {
    toggleClass(type) {
      this[type] = !this[type]
    }
  }
}
</script>



