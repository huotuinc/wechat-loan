<template>
  <div>
    <div>
      <group>
        <x-input title="借款金额" ref="borrowMoney" type="number" name="obj.borrowMoney" v-model.number="borrowMoney">
          <span slot="right">元</span>
        </x-input>
        <x-input title="借款时长" name="borrowTime" type="number" v-model.number="obj.borrowTime">
          <span slot="right">天</span>
        </x-input>
        <popup-picker title="借款用途" :data="list" v-model="value"></popup-picker>
      </group>
      <group>
        <cell title="信用报告" is-link>未认证</cell>
      </group>
    </div>

    <div style="text-align: center">
      <span style="font-size: 8px;vertical-align: bottom">已阅读并同意《超级借条借款条约》</span>
    </div>
    <div style="padding:20px;">
      <x-button @click.native="submit" type="primary">确认发布</x-button>
    </div>
  </div>
</template>
<script>
  import {XInput, Group, XButton, Cell, Picker, PopupPicker} from 'vux'
  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      PopupPicker,
      Picker
    },
    data() {
      return {
        borrowMoney: 0,
        value: [],
        list: [['个体经营', '消费', '助学', '创业', '租房', '旅游', '装修', '医疗', '其他']],
        valid1: false,
        valid2: false,
        obj: {
          borrowTime: 0,
          borrowMoney: 0,
          borrowUse: 1,
          userType: 1
        }
      }
    },
    methods: {
      submit() {
        this.getValid1()
        this.getValid2()
        if (this.valid1 && this.valid2) {
          this.obj.password = md5(this.obj.password)
          this.$store
            .dispatch('login', this.obj)
            .then(() => {
              this.$router.push({path: '/'})
            })
            .catch(() => {
            })
        } else {
          this.$vux.toast.show({
            text: '手机号或密码填写错误'
          })
        }
      }
    }
  }

</script>

