<template>
  <div>
    <msg title="恭喜你认证成功！" description="信息正在审核" icon="success">
      <div slot="buttons">
        <x-button mini link="/credit">查看信用报告</x-button>
      </div>
    </msg>
     <div class="qrcode">
      <img src="../../assets/qrcode.jpg" alt="过海有信">
      <p>请关注微信公众号</p>
      <p><span>“过海有信”</span>，进行更多操作</p>
    </div>
  </div>

</template>
<script>
import { Msg, XButton } from 'vux'

export default {
  components: {
    Msg,
    XButton
  }
}
</script>

<style lang="less">
.qrcode {
  margin: 0 auto;
  text-align: center;
  > img {
    width: 7em;
  }
  > p {
    > span {
      font-size: 24px;
      color: orange;
    }
  }
}
</style>

