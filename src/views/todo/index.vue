<template>
  <div>
    <div class="loan-todo vux-1px-b" v-if="messageList.length > 0">
      <template v-for="message in messageList" >
        <router-link :to="{name: 'OrderInfo', params:{orderId: message.orderId}}" class="loan-todo_item vux-1px-t" :key="message.orderId" >
          <div class="loan-todo_hd">
            <i class="iconfont icon-msg"></i>
          </div>
          <div class="loan-todo_bd">
            <h4>{{message.noticeTitle}}</h4>
            <p>{{message.noticeContent}}</p>
            <span>{{message.noticeActTime}}</span>
          </div>
          <div class="loan-todo_ft">
              <button type="button">立即查看</button>
          </div>
        </router-link>
      </template>
    </div>
    <empty :empty="messageList.length === 0" text="暂无消息"></empty>
  </div>
</template>
<script>
import Empty from '@/components/empty'

export default {
  name: 'Todo',
  components: {
    Empty
  },
  data() {
    return {
      messageList: []
    }
  },
  created() {
    this.$store.dispatch('getOrderNotice').then(res => {
      this.messageList = []
    })
  }
}
</script>
<style lang="less">
@import '../../style/variable.less';

.loan-todo {
  background: #fff;
}
.loan-todo_item {
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

