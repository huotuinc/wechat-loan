<template>
  <div class="js-scroll-wrap">
    <scroll ref="scroll"
        :data="lenderList"
        :pullUpLoad="pullUpLoadObj"
        @pullingUp="onPullingUp"
      >
    <div class="loaner-head">
      <div class="background"></div>
      <div class="info">
        <div class="avatar">
          <img :src="userInfo.headimg ? userInfo.headimg : 'http://resali.huobanplus.com/cdn/avatar.png'" @error="onError" alt="头像">
        </div>
        <div class="desc vux-1px-b">
          <div class="item item-name">
            <i class="iconfont icon-personal-o"></i>
            <span>{{userInfo.realName}}</span>
            <!-- <a href="/" class="btn"><i class="iconfont icon-msg-more"></i>&nbsp;联系他</a> -->
          </div>
          <div class="item item-tel">
            <i class="iconfont icon-mobile"></i>
            <span>{{userInfo.mobile}}</span>
            <!-- <a href="/" class="btn" v-if="!userInfo.friend"><i class="iconfont icon-add-friends"></i>&nbsp;添加好友</a> -->
          </div>
        </div>
        <p class="success">成功借出<span>{{userInfo.nums}}</span>笔</p>
      </div>
    </div>
    <div class="loaner-active">
      <div class="contact-title">- TA的出借 -</div>
      <Card :lendInfo="oneLendInfo"/>
    </div>
     <div>
      <div class="contact-title">- TA的更多出借 -</div>
      <Card v-for="lendInfo in lenderList" :lendInfo="lendInfo" :key="lendInfo.lendId"/>
    </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from '../../components/scroll/scroll'
import Card from '../../components/loan/Card'
import { getUserInfo } from '../../utils/auth'

export default {
  name: 'LoanerDetail',
  components: {
    Card,
    Scroll
  },
  data() {
    return {
      userInfo: {},
      lenderList: [],
      newLenderList: [],
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      orders: [],
      requestData: {
        lenderId: 0,
        pageIndex: 1,
        pageSize: 10
      },
      oneLendInfo: {},
      lenderId: '',
      lendId: '',
      more: true
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
  created() {
    const { userName } = getUserInfo()
    const lenderId = this.$route.params.lenderId
    const lendId = this.$route.params.lendId

    this.lenderId = lenderId
    this.lendId = lendId

    this.$store
      .dispatch('getLenderById', {
        userName: userName,
        lenderId: lenderId
      })
      .then(res => {
        this.userInfo = res.userInfo
      })
      .catch(err => {
        console.log(err)
      })
    this.requestData.lenderId = lenderId
  },
  mounted() {
    this.$nextTick(() => {
      this.$store
        .dispatch('findOneLend', {
          lendId: this.lendId,
          lenderId: this.lenderId
        })
        .then(res => {
          this.oneLendInfo = res
          this.getLenderList()
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  methods: {
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
        let index = newList.findIndex(l => {
          return l.lendId === this.oneLendInfo.lendId
        })
        if (index !== -1) {
          newList.splice(index, 1)
        }
        this.lenderList = this.lenderList.concat(newList)
        if (this.requestData.pageIndex === 1) this.requestData.pageIndex++
        if (newList.length < this.requestData.pageSize) {
          this.more = false
        } else {
          this.requestData.pageIndex++
        }
      })
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
.loaner-head {
  overflow: hidden;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    background: #ff9c00;
  }
  .info {
    position: relative;
    padding: 16px;
    margin: 48px 16px 16px;
    min-height: 183px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 5px 3px rgba(4, 0, 0, 0.11);
    box-sizing: border-box;
    .avatar {
      position: absolute;
      top: -32px;
      left: 50%;
      padding: 2px;
      margin-left: -32px;
      width: 64px;
      height: 64px;
      overflow: hidden;
      border-radius: 100%;
      background: #fff;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .desc {
      padding-top: 24px;
      padding-bottom: 20px;
      .item {
        margin-bottom: 10px;
        height: 34px;
        line-height: 34px;
        overflow: hidden;
        > i {
          display: inline-block;
          width: 25px;
          height: 25px;
          line-height: 25px;
          color: #fff;
          border-radius: 100%;
          text-align: center;
          background: #ff9c00;
        }
      }
      span {
        font-size: 18px;
      }
      .btn {
        float: right;
        width: 108px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        border-radius: 5px;
        i {
          font-size: 20px;
          vertical-align: middle;
        }
        &:active {
          color: #fff;
        }
      }
      .item-name {
        .btn {
          background: #ff9c00;
        }
      }
      .item-tel {
        > i {
          background: #ff7200;
        }
        .btn {
          background: #ff7200;
        }
        span {
          color: #858585;
        }
      }
    }
    .success {
      padding-top: 16px;
      text-align: center;
      font-size: 13px;
      span {
        color: red;
      }
    }
  }
}
.contact-title {
  padding: 8px 0 16px;
  text-align: center;
  font-size: 14px;
  color: #727272;
}
</style>
