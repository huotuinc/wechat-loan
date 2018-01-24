<template>
  <div>
    <group title="认证问题反馈">
      <x-input title="联系方式" placeholder="（必要）微信号或者手机号" v-model.trim="form.contactWay"></x-input>
    </group>
    <group title="微信客户端">
      <radio :options="isWechat" v-model="form.isWeiXin"></radio>
    </group>
    <group title="手机信息">
      <x-input title="品牌和型号" placeholder="（必要）如：苹果X" v-model.trim="form.phoneModel"></x-input>
    </group>
    <group title="问题描述">
      <x-textarea placeholder="（必要）如：照片无法上传，系统无反应，照片多次识别失败" v-model.trim="form.remarks" :max="200"></x-textarea>
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
        contactWay: '',
        phoneModel: '',
        isWeiXin: '是',
        remarks: ''
      }
    }
  },
  methods: {
    submit() {
      if (this.form.contactWay && this.form.phoneModel && this.form.remarks) {
        this.$store
          .dispatch('saveFeedback', this.form)
          .then(() => {
            this.$vux.toast.text('感谢您的反馈')
            this.form = {
              contactWay: '',
              phoneModel: '',
              isWeiXin: '是',
              remarks: ''
            }
          })
          .catch(() => {
            this.$vux.toast.text('服务器错误')
            this.form = {
              contactWay: '',
              phoneModel: '',
              isWeiXin: '是',
              remarks: ''
            }
          })
      } else {
        this.$vux.toast.text('缺少必要信息')
      }
    }
  }
}
</script>
