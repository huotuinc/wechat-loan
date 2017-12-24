<template>
  <div class="loan-wrap">
    <div class="loan-head">
        <img class="loan-head_avatar" src="../../assets/avatar.png" alt="头像">
        <p class="loan-head_title">我的负债</p>
        <h2 class="loan-head_debt">{{page.loanAmount}}</h2>
        <span class="loan-head_my"><i class="iconfont icon-zhi-ma"></i>&nbsp;信用认证：{{page.authMsg}}</span>
    </div>
    <div class="loan-body">
      <group class="loan-body_item">
        <cell is-link title="借款次数" :value="page.loanNum">
          <i class="iconfont icon-my-loan" slot="icon"></i>
        </cell>
      </group>
      <group class="loan-body_item">
        <cell is-link title="信用报告" :value="page.authMsg" link="/authentication">
          <i class="iconfont icon-report" slot="icon"></i>
        </cell>
      </group>
      <group class="loan-body_item">
        <cell is-link title="发布记录">
          <i class="iconfont icon-add" slot="icon"></i>
        </cell>
      </group>
      <div class="loan-body_grid">
        <grid>
          <grid-item label="借条">
            <i class="iconfont icon-loan-o"></i>
          </grid-item>
          <grid-item label="待办事项" link="/todo">
            <i class="iconfont icon-todo"></i>
          </grid-item>
          <grid-item label="个人中心" link="/personal">
            <i class="iconfont icon-personal"></i>
          </grid-item>
        </grid>
      </div>
    </div>
    <div class="loan-footer">
        <x-button class="loan-button btn-yellow" link="/publish">我要借款</x-button>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Grid, GridItem, XButton } from 'vux'

export default {
  name: 'Loan',
  components: {
    Group,
    Cell,
    Grid,
    GridItem,
    XButton
  },
  data() {
    return {
      page: {}
    }
  },
  created() {
    this.$store.dispatch('getIndex').then(res => {
      this.page = res
    })
  }
}
</script>
