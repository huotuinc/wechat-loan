<template>
  <div class="js-scroll-wrap">
    <scroll ref="scroll"
          :data="lenderList"
          :pullDownRefresh="pullDownRefreshObj"
          :pullUpLoad="pullUpLoadObj"
          @pullingDown="onPullingDown"
          @pullingUp="onPullingUp"
        >
    <div class="loan-head vux-1px-b">
      <div class="loan-btn-wrap">
        <x-button @click.native="goToPublish" class="btn-yellow">我要借款</x-button>
      </div>
    </div>
    <div class="loan-msg vux-1px-b">
      <!-- <div class="loan-msg_item">
        <p><span class="loan-msg_num">{{page.offlineMsgCount}}<span class="vux-badge vux-badge-single" v-show="page.offlineMsgCount > 10">&middot;&middot;&middot;</span></span></p>
        <span>好友消息</span>
      </div> -->
      <div class="loan-msg_item">
        <p>{{page.loanNum || 0}}</p>
        <span>借款次数</span>
      </div>
      <div class="loan-msg_item" @click="goToMessage">
        <p>{{(page.annceCount||0) + (page.orderNoticeCount||0)}}</p>
        <span>通知</span>
      </div>
      <div class="loan-msg_item" @click="goToAuth" v-if="page.authCode === 3">
        <p>{{page.authMsg || '未认证'}}</p>
        <span>信用报告</span>
      </div>
        <div class="loan-msg_item" @click="goToAuth" v-else>
        <p>{{page.authMsg || '未认证'}}</p>
        <span>信用认证</span>
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
import { XButton } from 'vux'
import Scroll from '../../components/scroll/scroll'
import Loaner from '../../components/loan'
import { getFollow, setFollow } from '../../utils/auth'
import { parseTime } from '../../utils'

export default {
  name: 'Loan',
  components: {
    Scroll,
    Loaner,
    XButton
  },
  data() {
    return {
      page: {},
      lenderList: [],
      show: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      requestData: {
        lenderId: 0,
        pageIndex: 1,
        pageSize: 10
      },
      more: true
    }
  },
  watch: {
    pullDownRefreshObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullUpLoadObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    }
  },
  computed: {
    pullDownRefreshObj: function() {
      return this.pullDownRefresh
        ? {
            threshold: parseInt(this.pullDownRefreshThreshold),
            stop: parseInt(this.pullDownRefreshStop)
          }
        : false
    },
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
    this.$store.dispatch('getIndex', lastTime).then(res => {
      this.page = res
      localStorage.setItem('lastLogin', parseTime(new Date()))
    })
    this.show = !getFollow()
  },
  methods: {
    closeFollow() {
      this.show = !this.show
      setFollow()
    },
    goToFollow() {
      this.$router.push({ path: '/follow' })
    },
    goToPublish() {
      this.$router.push({ path: '/publish' })
    },
    goToAuth() {
      if (this.page.authCode === 3) {
        this.$router.push({ path: '/credit' })
      } else {
        this.$router.push({ path: '/authentication' })
      }
    },
    onPullingDown() {
      this.requestData.pageIndex = 1
      this.$store.dispatch('getLenderList', this.requestData).then(res => {
        let newList = res.list
        this.lenderList = newList
        if (newList.length < this.requestData.pageSize) {
          this.more = false
        } else {
          this.more = true
          this.requestData.pageIndex++
        }
      })
    },
    onPullingUp() {
      if (this.more) {
        this.getLenderList()
      } else {
        this.$refs.scroll.forceUpdate()
      }
    },
    getLenderList() {
      this.$store.dispatch('getLenderList', this.requestData).then(res => {
        let newList = res.list
        this.lenderList = this.lenderList.concat(newList)
        if (this.requestData.pageIndex === 1) this.requestData.pageIndex++
        if (newList.length < this.requestData.pageSize) {
          this.more = false
        } else {
          this.requestData.pageIndex++
        }
      })
    },
    goToMessage() {
      this.$router.push({ path: '/message/todo' })
    },
    onError(e) {
      let defaultURL = 'http://resali.huobanplus.com/cdn/avatar.png'
      if (e.target.src !== defaultURL) {
        e.target.src = defaultURL
      }
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
  min-height: 60px;
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
  .loan-btn-wrap {
    margin: 12px auto 0;
    width: 300px;
    height: 46px;
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
