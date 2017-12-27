<template>
  <div class="credit-list">
    <group class="loan-body_item" title="风控信息">
      <cell title="法院失信">
        {{risk.courtLoseFaith == 1 ? '是' : '否'}}
      </cell>
      <cell title="法院执行">
        {{risk.courtLoseFaith == 1 ? '是' : '否'}}
      </cell>
      <cell title="法院结案">
        {{risk.courtCase == 1 ? '是' : '否'}}
      </cell>
      <cell title="信贷逾期">
        {{risk.discredit == 1 ? '是' : '否'}}
      </cell>
      <cell
        title="模糊名单名字"
        is-link
        :class="fuzzyName ? 'weui-cell_up': 'weui-cell_down'"
        @click.native="toggleClass('fuzzyName')">
      </cell>
      <cell class="weui-cell__sub" v-if="fuzzyName" :title="risk.fuzzyNameHits.join('，')"> </cell>
      <cell
        title="手机号风险"
        is-link
        :class="phoneNumber ? 'weui-cell_up': 'weui-cell_down'"
        @click.native="toggleClass('phoneNumber')">
      </cell>
      <cell class="weui-cell__sub" v-if="phoneNumber" :title="risk.phoneNumberRisks.join('，')">
      </cell>
      <cell title="7天内小贷平台申请个数">
        {{risk.platformApply7}}
      </cell>
      <cell title="1个月内小贷平台申请个数">
        {{risk.platformApply30}}
      </cell>
    </group>
    <group title="运营商信息">
      <cell title="授权手机号">
        {{carrier.authMobile}}
      </cell>
      <cell title="运营商登记身份证">
        {{carrier.idNumber}}
      </cell>
      <cell title="运营商登记姓名">
        {{carrier.realName}}
      </cell>
      <cell title="当前状态">
        {{carrier.status}}
      </cell>
      <cell title="入网时长 / 月">
        {{carrier.totalTime}}
      </cell>
      <cell title="互通手机号个数">
        {{carrier.mutualCount}}
      </cell>
      <cell title="月均话费 / 元">
        {{carrier.avgMonthlyCost}}
      </cell>
      <cell title="月均通话次数">
        {{carrier.avgMonthlyCount}}
      </cell>
      <cell title="缴费记录" is-link link="/consume"></cell>
      <cell title="紧急联系人通话" is-link link="/emergency"></cell>
      <cell title="风险通话记录" is-link link="/riskCall"></cell>
    </group>
    <group title="本平台借款记录">
      <cell title="当前借入">
        {{loan.borrowIng.num}}笔，{{loan.borrowIng.amount}}元
      </cell>
      <cell title="历史借入">
        累计{{loan.totalBorrow.num}}笔，累计{{loan.totalBorrow.amount}}元
      </cell>
    </group>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'

export default {
  name: 'certificationReport',
  components: {
    Group,
    Cell
  },
  data() {
    return {
      risk: {},
      carrier: {},
      loan: {
        borrowIng: {},
        lendIng: {},
        totalBorrow: {},
        totalLend: {},
        totalOverdue: {}
      },
      fuzzyName: false,
      phoneNumber: false
    }
  },
  created() {
    this.$store.dispatch('creditReport').then(res => {
      this.risk = res.risk
      this.carrier = res.carrier
      this.loan = res.loan
    })
  },
  methods: {
    toggleClass(type) {
      this[type] = !this[type]
    }
  }
}
</script>

