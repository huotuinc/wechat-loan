<template>
  <msg title="恭喜你认证成功！" description="信息正在审核，请等待客服与您联系" icon="success">
    <div slot="buttons">
      <x-button mini link="/credit">查看信用报告</x-button>
    </div>
  </msg>
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
