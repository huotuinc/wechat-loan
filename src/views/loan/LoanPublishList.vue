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
          <router-link class="loan-card" :key="order.id" :to="{name:'OrderInfo', params: {orderId: order.orderId}}" >
            <div class="loan-card_hd clearfix">
              <span class="loan-hd_title">我的发布</span>
              <span class="loan-hd_user" @click="del">删除</span>
            </div>
            <div class="loan-card_bd vux-1px-b">
              <div class="loan-bd_img">
                <img :src="order.userHeadImg" alt="">
              </div>
              <div class="loan-bd_content">
                <p>借款金额：<span>1000元</span>&nbsp;&nbsp;&nbsp;&nbsp;借款金额：<span>10天</span></p>
                <p>借款用途：<span>消费</span></p>
              </div>
            </div>
            <div class="loan-card_ft loan-publish_ft">
              <div class="loan-ft_content">
                <span>发布时间：<span>2017-11-10 12:1212</span></span>
              </div>
            </div>
          </router-link>
        </template>
      </div>
    </div>
  </scroll>
  </div>
</template>
<script>
import Scroll from '../../components/scroll/scroll'

export default {
  name: 'PublishList',
  components: {
    Scroll
  },
  data() {
    return {
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      orders: [],
      requestData: {
        orderType: 1,
        grantStatus: -1,
        pageIndex: 1,
        pageSize: 10
      }
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
@import '../../style/variable.less';

.loan-list {
  padding: 10px 5px;
}
</style>
