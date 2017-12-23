<template>
  <div class="loan-wrap">
    <group class="loan-publish">
      <x-input
        title="借款金额"
        ref="borrowMoney"
        type="number"
        :show-clear="false"
        name="obj.borrowMoney"
        v-model.number="obj.borrowMoney">
        <span slot="right">元</span>
      </x-input>
      <x-input
        title="借款时长"
        ref="borrowTime"
        name="borrowTime"
        :show-clear="false"
        type="number"
        v-model.number="obj.borrowTime">
        <span slot="right">天</span>
      </x-input>
      <popup-picker
        title="借款用途"
        :data="list"
        v-model="value"
        popup-title="借款用途">
      </popup-picker>
    </group>
    <group class="loan-publish">
      <cell title="信用报告" v-if="authNum === 3">
        <span class="text-success">{{authText}}</span>
      </cell>
      <cell title="信用报告" is-link v-else>
        <router-link to="/authenticationList">
          <span class="text-danger">{{authText}}</span>
        </router-link>
      </cell>
    </group>
    <div class="loan-publish_rule">
      <span>已阅读并同意《借款条约》</span>
    </div>
    <div class="loan-publish_btn">
      <x-button @click.native="submit" class="btn-yellow">确认发布</x-button>
    </div>
  </div>
</template>
<script>
import { XInput, Group, XButton, Cell, Picker, PopupPicker } from 'vux'
import { mapGetters } from 'vuex'
import { purpose, findCode } from '@/utils/enum'

export default {
  name: 'loanPublish',
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
        borrowTime: null,
        borrowMoney: null,
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
    validFormInput() {
      if (this.obj.borrowTime && this.obj.borrowMoney) {
        return true
      } else {
        return false
      }
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

      if (!this.validFormInput()) {
        this.$vux.toast.text('借款信息填写有误')
        return
      }
      this.obj.borrowUse = findCode(purpose, this.value[0])

      this.$store.dispatch('saveInfo', this.obj).then(() => {
        //todo 借款成功跳转页面
        this.$vux.toast.text('借款成功')
      })
    }
  }
}
</script>
<style lang="less">
@import '../../style/variable.less';

.loan-publish {
  .weui-cells {
    margin-top: 0 !important;
    margin-bottom: 6px;
    font-size: 14px;
  }

  .weui-cell__bd {
    input {
      text-align: right;
    }
  }
}
.loan-publish_rule {
  padding-top: 60px;
  text-align: center;
  color: #7c8496;
  font-size: 12px;
}

.loan-publish_btn {
  padding: 20px;
}
</style>
