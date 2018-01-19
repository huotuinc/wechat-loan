<template>
  <div>
    <group title="认证问题反馈">
      <x-input title="联系方式" placeholder="（必要）微信号或者手机号" v-model.trim="form.contact"></x-input>
    </group>
    <group title="微信客户端">
      <radio :options="isWechat" v-model="form.wechat"></radio>
    </group>
    <group title="手机信息">
      <x-input title="品牌和型号" placeholder="（必要）如：苹果X" v-model.trim="form.info"></x-input>
    </group>
    <group title="问题描述">
      <x-textarea placeholder="（必要）如：照片无法上传，系统无反应，照片多次识别失败" v-model.trim="form.problem"></x-textarea>
    </group>
    <div style="padding:30px">
      <x-button type="primary" action-type="button" @click.native="submit">提交</x-button>
    </div>
  </div>
</template>
<script>
import { XInput, Group, XButton, XTextarea, Radio } from 'vux'

export default {
  name: 'Feedback',
  components: {
    XInput,
    XButton,
    Group,
    Radio,
    XTextarea
  },
  data() {
    return {
      isWechat: ['是', '不是'],
      form: {
        contact: '',
        info: '',
        wechat: '是',
        problem: ''
      }
    }
  },
  methods: {
    submit() {
      if (this.form.contact && this.form.info && this.form.problem) {
        console.log('submit:')
      } else {
        this.$vux.toast.text('缺少必要信息')
      }
    }
  }
}
</script>
