<template>
  <div>
    <div class="loan-head vux-1px-b">
        <div class="loan-head_hd">
          <img :src="page.headimg ? page.headimg : 'http://resali.huobanplus.com/cdn/avatar.png'" alt="头像">
        </div>
        <div class="loan-head_bd">
          <p class="loan-head_title">我的负债</p>
          <h2 class="loan-head_debt">{{page.myLoanAmount}}</h2>
          <span class="loan-head_my"><i class="iconfont icon-zhi-ma"></i>&nbsp;信用认证：</span><span>{{page.authMsg}}</span>
        </div>
    </div>
    <div class="loan-msg">
      <div class="loan-msg_item">
        <p>10</p>
        <span>好友消息</span>
      </div>
      <div class="loan-msg_item">
        <p>1</p>
        <span>借款次数</span>
      </div>
      <div class="loan-msg_item">
        <p>10</p>
        <span>通知</span>
      </div>
    </div>
    <div class="loan-body vux-1px-tb">
      <div class="loan-square vux-1px-b">
        <i class="iconfont icon-list"></i>
        <span>出借广场</span>
        <transition name="slide-fade">
          <a v-if="show"  href="/" class="follow-btn">关注过海有信<span class="vux-close" @click.self.prevent="closeFollow"></span></a>
        </transition>
      </div>
      <div class="loaner-list">
        <Loaner/>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Grid, GridItem, XButton } from 'vux'
import Loaner from '../../components/loan'
export default {
  name: 'Loan',
  components: {
    Group,
    Cell,
    Grid,
    GridItem,
    XButton,
    Loaner
  },
  data() {
    return {
      page: {},
      show: true
    }
  },
  created() {
    this.$store.dispatch('getIndex').then(res => {
      this.page = res
    })
  },
  methods: {
    closeFollow() {
      this.show = !this.show
    }
  }
}
</script>
<style lang="less">
.loan-head {
  padding: 25px 10px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  background: #fff;
  min-height: 91px;
  .loan-head_hd {
    margin-right: 10px;
    width: 74px;
    height: 74px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  .loan-head_bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    > span {
      font-size: 12px;
      color: #ababab;
    }
  }
  .loan-head_title {
    font-size: 15px;
    color: #434343;
  }
  .loan-head_debt {
    font-size: 42px;
    color: #ff9c00;
    line-height: 1;
  }
  .loan-head_my {
    color: #ff9c00 !important;
  }
}
.loan-msg {
  padding: 10px 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  text-align: center;
  background: #fff;
  .loan-msg_item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  p {
    font-size: 16px;
    color: #010101;
    line-height: 1.2;
  }
  span {
    color: #ababab;
    font-size: 14px;
  }
}
.loan-square {
  padding: 15px;
  height: 37px;
  line-height: 37px;
  i {
    font-size: 16px;
    color: #ff9c00;
  }
  span {
    color: #727272;
    font-size: 14px;
  }
}
.follow-btn {
  position: relative;
  float: right;
  display: block;
  width: 117px;
  height: 37px;
  border-radius: 5px;
  color: #fff;
  background: #ff9c00;
  text-align: center;
  font-size: 14px;
  &:active {
    color: #fff;
  }
  .vux-close {
    position: absolute;
    top: -11px;
    color: #ff9c00;
    border: 2px solid #ff9c00;
    background: #fff;
    width: 22px;
    height: 22px;
    border-radius: 100%;
    cursor: pointer;
    &::before,
    &::after {
      width: 14px;
      height: 2px;
      left: 4px;
      top: 10px;
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.loaner-list {
  min-height: ~'calc(100vh - 347px)';
  background: #fff;
}
</style>
