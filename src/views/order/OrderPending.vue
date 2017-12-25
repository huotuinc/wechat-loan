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
        grantStatus: 2,
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
      this.$store.dispatch('getOrderList', this.requestData).then(newOrder => {
        this.orders = this.orders.concat(newOrder)
        if(newOrder.length > 0) this.isEmpty = false
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

