<template>
  <div>
    <group>
      <x-input title="借款金额" ref="borrowMoney" type="number" :show-clear="false" name="obj.borrowMoney" v-model.number="obj.borrowMoney">
        <span slot="right">元</span>
      </x-input>
      <x-input title="借款时长" ref="borrowTime" name="borrowTime" :show-clear="false" type="number" v-model.number="obj.borrowTime">
        <span slot="right">天</span>
      </x-input>
      <popup-picker title="借款用途" :data="list"
                    v-model="value"
                    popup-title="借款用途"></popup-picker>
    </group>
    <group>
      <cell title="信用报告" is-link>
        <div v-if="authNum === 3">
          <router-link to="/login"><!--跳转到查看信用报告页面-->
            <span style="color: green">{{authText}}</span>
          </router-link>
        </div>
        <div v-else>
          <router-link to="/login"><!--跳转到信用认证页面-->
            <span>{{authText}}</span>
          </router-link>
        </div>
      </cell>
    </group>
    <div style="text-align: center">
      <span style="font-size: 8px;vertical-align: bottom">已阅读并同意《超级借条借款条约》</span>
    </div>
    <div style="padding:20px;">
      <x-button @click.native="submit" type="primary">确认发布</x-button>
    </div>
  </div>
</template>
<script>
import { XInput, Group, XButton, Cell, Picker, PopupPicker } from 'vux'
import { mapGetters } from 'vuex'
import { purpose, findCode } from '@/utils/enum'

export default {
  created() {
    this._getPurposeList()
  },
  computed: {
    authText() {
      return this.authInfo.authMsg
    },
    authNum() {
      return this.authInfo.authCode
    },
    ...mapGetters(['authInfo'])
  },
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
      value: [],
      list: [],
      obj: {
        borrowTime: 1,
        borrowMoney: 1,
        borrowUse: 1,
        userType: 1
      }
    }
  },
  methods: {
    _getPurposeList() {
      let ret = []
      purpose.forEach(item => {
        ret.push(item.desc)
      })
      this.list.push(ret)
    },
    submit() {
      if (this.authNum !== 3) {
        this.$vux.toast.text('请先完成信用认证')
        return
      }
      if (this.value.length !== 1) {
        this.$vux.toast.text('请选择借款用途')
        return
      }
      this.obj.borrowUse = findCode(purpose, this.value[0])

      if (this.obj.borrowTime !== 0 && this.obj.borrowMoney !== 0) {
        this.$store.dispatch('saveInfo', this.obj).then(() => {
          //todo 借款成功跳转页面
          this.$vux.toast.text('借款成功')
        })
      } else {
        this.$vux.toast.text('借款金额或借款时长不能为0')
      }
    }
  }
}
</script>

