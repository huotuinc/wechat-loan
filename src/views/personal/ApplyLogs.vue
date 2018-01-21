<template>
  <div class="loan-wrap">
    <scroll ref="scroll"
      :data="orders"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp"
    >
    <div class="loan-list">
      <div class="list-item">
        <template v-for="order in orders">
          <div class="loan-card" :key="order.id">
            <div class="loan-card_hd clearfix">
              <span class="loan-hd_title">申请对象：龙*天</span>
              <span class="loan-hd_user">已拒绝出借</span>
            </div>
            <div class="loan-card_bd vux-1px-b">
              <div class="loan-bd_img">
                <img :src="order.headimg ? order.headimg : 'http://resali.huobanplus.com/cdn/avatar.png'"  alt="">
              </div>
              <div class="loan-bd_content">
                <p>联系电话：<span>134****4318</span></p>
                <p>借款金额：<span>{{order.money}}元</span>&nbsp;&nbsp;&nbsp;&nbsp;借款时长：<span>{{order.interval}}天</span></p>
                <p>借款用途：<span>{{order.purpose}}</span></p>
              </div>
            </div>
            <div class="loan-card_ft loan-apply_ft">
              <div class="loan-ft_content loan-ft_button">
                <a href="javascript:;" class="btn btn-contact">联系TA</a>
                <a href="javascript:;" class="btn btn-add">加为好友</a>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
     <empty :empty="isEmpty"></empty>
  </scroll>
  </div>
</template>
<script>
import Scroll from '../../components/scroll/scroll'
import Empty from '@/components/empty'

export default {
  name: 'PublishList',
  components: {
    Scroll,
    Empty
  },
  data() {
    return {
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      orders: [],
      requestData: {
        pageIndex: 1,
        pageSize: 10
      },
      isEmpty: true
    }
  },
  mounted() {
    this.getOrderList()
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
      this.getOrderList()
    },
    getOrderList() {
      this.$store.dispatch('getBorrowList', this.requestData).then(newOrder => {
        this.orders = this.orders.concat(newOrder)
        if (newOrder.length > 0) this.isEmpty = false
        if (this.requestData.pageIndex === 1) this.requestData.pageIndex++
        if (newOrder.length < this.requestData.pageSize) {
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
.loan-list {
  padding: 10px 5px;
}
.loan-apply_ft {
  padding: 9px !important;
  height: auto !important;
}
.loan-ft_button {
  text-align: right;
  .btn {
    display: inline-block;
    width: 73px;
    height: 36px;
    line-height: 36px;
    color: #ce381f;
    font-size: 13px;
    border: 1px solid #ce381f;
    border-radius: 5px;
    text-align: center;
  }
  .btn-add {
    margin-left: 10px;
    background: #ce381f;
    color: #fff;
  }
}
</style>
