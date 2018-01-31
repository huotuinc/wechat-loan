<template>
    <scroll ref="scroll"
      :data="orders"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp"
    >
    <order-list :orders="orders"></order-list>
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
      pullUpLoadNoMoreTxt: '没有更多数据了',
      items: [],
      itemIndex: 0,
      orders: [],
      requestData: {
        orderType: 1,
        grantStatus: 4,
        pageIndex: 1,
        pageSize: 10
      },
      isEmpty: true,
      more: true
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
      if (this.more) {
        this.getOrderList()
      } else {
        this.$refs.scroll.forceUpdate()
      }
    },
    getOrderList() {
      this.$store.dispatch('getOrderList', this.requestData).then(newOrder => {
        this.orders = this.orders.concat(newOrder)
        if (newOrder.length > 0) this.isEmpty = false
        if (this.requestData.pageIndex === 1) this.requestData.pageIndex++
        if (newOrder.length < this.requestData.pageSize) {
          this.more = false
        } else {
          this.requestData.pageIndex++
        }
      })
    }
  }
}
</script>
