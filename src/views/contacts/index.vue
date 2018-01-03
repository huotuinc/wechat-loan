<template>
  <div class="loan-wrap loan-contact">
    <div style="overflow:hidden;">
    <group title="主要联系人信息(需直系亲属)">
      <popup-picker
        title="关系"
        :data="list"
        v-model="value"
        @on-change="onMainChange"
        popup-title="关系">
      </popup-picker>
      <x-input
        title="姓名"
        :show-clear="false"
        required
        v-model.trim="form[0].name">
      </x-input>
      <x-input
        title="手机号"
        name="mobile"
        keyboard="number"
        is-type="china-mobile"
        ref="mobile1"
        :show-clear="false"
        required
        v-model.trim="form[0].mobile">
      </x-input>
    </group>
    <group title="其他联系人信息">
      <popup-picker
        title="关系"
        :data="list"
        v-model="value1"
        @on-change="onOtherChange"
        popup-title="关系">
      </popup-picker>
      <x-input
        title="姓名"
        :show-clear="false"
        required
        v-model.trim="form[1].name">
      </x-input>
      <x-input
        name="mobile2"
        title="手机号"
        keyboard="number"
        is-type="china-mobile"
        ref="mobile2"
        :show-clear="false"
        required
        v-model.trim="form[1].mobile">
      </x-input>
    </group>
    </div>
    <div class="loan-publish_btn" style="padding:20px;">
      <x-button @click.native="submit" class="btn-yellow" :disabled="isDisabled">提交</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, Cell, Picker, PopupPicker, XButton } from 'vux'
import { relation, findCode } from '@/utils/enum'
export default {
  created() {
    this._getRelationList()
  },
  components: {
    XInput,
    Group,
    Cell,
    PopupPicker,
    Picker,
    XButton
  },
  data() {
    return {
      isDisabled: true,
      value: [],
      value1: [],
      list: [],
      form: [
        {
          contactId: 0,
          name: '',
          mobile: '',
          relation: '',
          isImportant: 1
        },
        {
          contactId: 0,
          name: '',
          mobile: '',
          relation: '',
          isImportant: 0
        }
      ]
    }
  },
  watch: {
    form: {
      handler: function(val, oldVal) {
        this.validForm()
      },
      deep: true
    }
  },
  methods: {
    _getRelationList() {
      this._getDescList(this.list, relation)
    },
    _getDescList(list, enums) {
      let ret = []
      enums.forEach(item => {
        ret.push(item.desc)
      })
      list.push(ret)
    },
    submit() {
      if (this.form[0].mobile === this.form[1].mobile) {
        this.$vux.toast.text('手机号码重复')
        return
      }

      let req = {
        requestData: JSON.stringify(this.form)
      }
      this.$store.dispatch('editcontacts', req).then(() => {
        this.$vux.toast.text('提交成功')
        this.$router.back()
      })
    },
    getMobile1Valid() {
      return this.$refs.mobile1.valid
    },
    getMobile2Valid() {
      return this.$refs.mobile2.valid
    },
    onMainChange(val) {
      this.form[0].relation = findCode(relation, val[0])
    },
    onOtherChange(val) {
      this.form[1].relation = findCode(relation, val[0])
    },
    validForm() {
      if (
        !(
          this.form[0].name &&
          this.form[0].mobile &&
          this.form[0].relation &&
          this.form[1].name &&
          this.form[1].mobile &&
          this.form[1].relation
        )
      ) {
        this.isDisabled = true
        return
      }
      if (!(this.getMobile1Valid() && this.getMobile2Valid())) {
        this.isDisabled = true
        return
      }
      this.isDisabled = false
    }
  }
}
</script>

<style lang="less">
.weui-cell_warn {
  .weui-cell__ft {
    .weui-icon-warn {
      display: none;
    }
  }
}
.loan-contact {
  .weui-input {
    text-align: right !important;
  }
}
</style>
