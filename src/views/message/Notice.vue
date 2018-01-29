<template>
  <scroll ref="scroll"
    :data="notice"
    :pullUpLoad="pullUpLoadObj"
    @pullingUp="onPullingUp"
  >
    <template v-for="message in notice" >
      <div class="loan-todo_item vux-1px-t" :key="message.annId" @click="goPage(message.infoType, message.annId)">
        <div class="loan-todo_hd">
          <i class="iconfont icon-msg"></i>
        </div>
        <div class="loan-todo_bd">
          <h4>{{message.title + message.infoType}}</h4>
          <span>{{message.createTime}}</span>
        </div>
        <div class="loan-todo_ft">
            <button type="button">立即查看</button>
        </div>
      </div>
    </template>
    <empty :empty="isEmpty"></empty>
  </scroll>
</template>
<script>
import Scroll from '../../components/scroll/scroll'
import OrderList from '../../components/order/OrderList'
import Empty from '@/components/empty'

export default {
  components: {
    OrderList,
    Scroll,
    Empty
  },
  data() {
    return {
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多通知了',
      notice: [],
      requestData: {
        pageIndex: 1,
        pageSize: 10,
        startTime: localStorage.getItem('lastLogin')
      },
      isEmpty: true
    }
  },
  mounted() {
    this.getNoticeList()
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
  methods: {
    onPullingUp() {
      this.getNoticeList()
    },
    getNoticeList() {
      this.$store.dispatch('getNotice', this.requestData).then(newOrder => {
        this.notice = this.notice.concat(newOrder)
        if (newOrder.length > 0) this.isEmpty = false
        if (this.requestData.pageIndex === 1) this.requestData.pageIndex++
        if (newOrder.length < this.requestData.pageSize) {
          this.$refs.scroll.forceUpdate()
        } else {
          this.requestData.pageIndex++
        }
      })
    },
    goPage(type, id) {
      if (type === 6) {
        this.$router.push({ path: '/applyList' })
      }
      if (type === 8) {
        this.$router.push({ path: '/announce', query: { annId: id } })
      }
    }
  }
}
</script>
<style lang="less">
@import '../../style/variable.less';

.loan-todo_item {
  background: #fff;
  &:active {
    background-color: #ececec;
  }
  padding: 10px 15px;
  color: #000;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  .loan-todo_hd {
    margin-right: 0.8em;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: @loan-red;
    color: #fff;
    border-radius: 5px;
    i {
      font-size: 26px;
    }
  }
  .loan-todo_bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
    h4 {
      font-weight: 400;
      font-size: 15px;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      word-wrap: break-word;
      word-break: break-all;
    }
    p {
      padding-right: 5px;
      font-size: 14px;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }
  .loan-todo_ft {
    button {
      padding: 8px 15px;
      display: inline-block;
      background: #fff;
      color: @loan-red;
      border: 1px solid @loan-red;
      border-radius: 35px;
    }
  }
}
.loan-todo_item {
  &:first-of-type {
    &::before {
      border-top: none;
    }
  }
}
.loan-todo_item + .loan-todo_item {
  &::before {
    left: 15px;
  }
}
</style>
