<template>
  <div class="js-scroll-wrap">
    <scroll ref="scroll"
          :data="lenderList"
          :pullUpLoad="pullUpLoadObj"
          @pullingUp="onPullingUp"
        >
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
    <div class="loan-msg vux-1px-b">
      <div class="loan-msg_item">
        <p><span class="loan-msg_num">10<span class="vux-badge vux-badge-single" v-show="page.offlineMsgCount > 10">&middot;&middot;&middot;</span></span></p>
        <span>好友消息</span>
      </div>
      <div class="loan-msg_item">
        <p>1</p>
        <span>借款次数</span>
      </div>
      <div class="loan-msg_item">
        <p>{{message}}</p>
        <span>通知</span>
      </div>
    </div>
    <div class="loan-body vux-1px-b">
      <div class="loan-square vux-1px-b">
        <i class="iconfont icon-list"></i>
        <span>出借广场</span>
        <transition name="slide-fade">
          <a v-if="show" href="javascript:;" @click="goToFollow" class="follow-btn">关注过海有信<span class="vux-close" @click.self.stop="closeFollow"></span></a>
        </transition>
      </div>
      <div class="loaner-list">
        <Loaner v-for="lender in lenderList" :lender="lender" :key="lender.lendId"/>
      </div>
    </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from '../../components/scroll/scroll'
import Loaner from '../../components/loan'
import { getFollow, setFollow } from '../../utils/auth'
import { parseTime } from '../../utils'

export default {
  name: 'Loan',
  components: {
    Scroll,
    Loaner
  },
  data() {
    return {
      page: {},
      message: 0,
      lenderList: [],
      show: true,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      requestData: {
        lenderId: 0,
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  watch: {
    pullUpLoadObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    }
  },
  computed: {
    pullUpLoadObj() {
      return {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: { more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt }
      }
    }
  },
  mounted() {
    this.getLenderList()
  },
  created() {
    let lastTime = localStorage.getItem('lastLogin') ? localStorage.getItem('lastLogin') : ''
    this.$store.dispatch('getIndex').then(res => {
      this.page = res
    })
    this.$store.dispatch('getMessage', lastTime).then(res => {
      this.message = res.countNum
      localStorage.setItem('lastLogin', parseTime(new Date()))
    })
    this.show = !getFollow()
  },
  methods: {
    closeFollow() {
      console.debug('Ok')
      this.show = !this.show
      setFollow()
    },
    goToFollow() {
      this.$router.push({ path: '/follow' })
    },
    onPullingUp() {
      this.getLenderList()
    },
    getLenderList() {
      this.$store.dispatch('getLenderList', this.requestData).then(res => {
        let newList = res.list
        this.lenderList = this.lenderList.concat(newList)
        if (this.requestData.pageIndex === 1) this.requestData.pageIndex++
        if (newList.length < this.requestData.pageSize) {
          this.$refs.scroll.forceUpdate()
        } else {
          this.requestData.pageIndex++
        }
      })
    }
  }
}
</script>
<style lang="less">
.js-scroll-wrap {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.list-wrapper {
  background: #fbf9fe !important;
}
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
  .loan-msg_num {
    position: relative;
    font-size: 16px;
    color: #010101;
    line-height: 1.2;
  }
  .vux-badge {
    text-align: center;
    position: absolute;
    right: -12px;
    top: -8px;
    font-size: 12px;
    font-weight: bold;
    padding: 0;
    width: 16px;
    background: #f74c31;
    color: #fff;
    height: 16px;
    line-height: 16px;
    border-radius: 8px;
    background-clip: padding-box;
  }
}
.loan-square {
  padding: 15px;
  height: 37px;
  line-height: 37px;
  background-color: #fbf9fe;
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
  min-height: ~'calc(100vh - 337px)';
  background: #fff;
}
</style>
