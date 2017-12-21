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
        <cell is-link title="信用报告" :value="page.authMsg">
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
          <grid-item label="我的借条">
            <i class="iconfont icon-loan-o"></i>
          </grid-item>
          <grid-item label="我的借条">
            <i class="iconfont icon-todo"></i>
          </grid-item>
          <grid-item label="我的借条">
            <i class="iconfont icon-personal"></i>
          </grid-item>
        </grid>
      </div>
    </div>
    <div class="loan-footer">
        <x-button class="loan-button btn-yellow">我要出借</x-button>
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
      console.log(res)
      this.page = res
    })
  }
}
</script>
<style lang="less">
@import '../../style/variable.less';

.loan-head {
  padding: 30px 0;
  background: @loan-yellow;
  text-align: center;
  color: #fff;
  .loan-head_avatar {
    width: 75px;
    height: 75px;
    border: 2px solid #fff;
    border-radius: 50%;
  }
  .loan-head_debt {
    font-family: Arial, Helvetica, sans-serif;
    height: 60px;
    font-size: 50px;
    line-height: 1.2;
  }
  .loan-head_my {
    padding: 1px 12px;
    display: inline-block;
    font-size: 12px;
    background: #fff;
    color: @loan-yellow;
    border-radius: 22px;
  }
}
.loan-body {
  .loan-body_item {
    margin-bottom: 3px;
    color: #000;
    .weui-cells {
      margin-top: 0 !important;
    }
    .weui-cell {
      padding: 14px 15px;
    }
    .weui-cell__ft {
      color: @loan-yellow;
    }
    .iconfont {
      margin-right: 15px;
      display: inline-block;
      width: 26px;
      height: 26px;
      line-height: 26px;
      color: #fff;
      background: @loan-yellow;
      text-align: center;
      border-radius: 50%;
    }
  }
  .loan-body_grid {
    .weui-grids {
      &::before,
      &::after {
        border: none;
      }
    }
    .weui-grid {
      padding: 12px 5px;
      &:first-of-type {
        padding-left: 10px;
      }
      &:last-of-type {
        padding-right: 10px;
      }
      border: none;
      &::before,
      &::after {
        border: none;
      }
    }
    .weui-grid__label {
      padding: 10px 0;
      background: #fff;
      margin-bottom: 2px;
    }
    .iconfont {
      padding: 10px 0;
      display: block;
      font-size: 40px;
      color: @loan-yellow;
      background: #fff;
      text-align: center;
    }
  }
}
.loan-footer {
  .loan-button {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    border-radius: 0;
  }
}
</style>
