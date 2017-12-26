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
            <div class="loan-card_hd loan-publish_hd clearfix">
              <span class="loan-hd_title">我的发布</span>
              <span class="loan-hd_user" @click="del(order)" v-if="order.cancelable">删除</span>
            </div>
            <div class="loan-card_bd vux-1px-b">
              <div class="loan-bd_img">
                <img :src="order.headimg" alt="">
              </div>
              <div class="loan-bd_content">
                <p>借款金额：<span>{{order.money}}元</span>&nbsp;&nbsp;&nbsp;&nbsp;借款时长：<span>{{order.interval}}天</span></p>
                <p>借款用途：<span>{{order.purpose}}</span></p>
              </div>
            </div>
            <div class="loan-card_ft loan-publish_ft">
              <div class="loan-ft_content">
                <span>发布时间：<span>{{order.createTime}}</span></span>
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
        if (newOrder.length < this.requestData.pageSize) {
          this.$refs.scroll.forceUpdate()
        } else {
          this.requestData.pageIndex++
        }
      })
    },
    del(order) {
      const vm = this
      this.$vux.confirm.show({
        title: '取消借条',
        content: '你确定要取消该借条？',
        onConfirm() {
          vm.cancelOrder(order)
        }
      })
    },
    cancelOrder(order) {
      this.$store.dispatch('cancelBorrow', order.id).then(() => {
        this.$vux.toast.text('取消成功')
        this.deleteOrder(order)
      })
    },
    deleteOrder(order) {
      this.orders.splice(this.orders.indexOf(order), 1)
      if (this.orders.length === 0) this.isEmpty = true
    }
  }
}
</script>
<style lang="less">
@import '../../style/variable.less';

.loan-list {
  padding: 10px 5px;
}
</style>
