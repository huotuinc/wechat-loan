<template>
  <div class="loan-wrap">
    <div style="overflow:hidden;">
    <group title="主要联系人信息(需直系亲属)">
      <popup-picker title="关系" :data="list"
                    v-model="value"
                    popup-title="关系"></popup-picker>
      <x-input title="姓名" ref="name"  :show-clear="false" v-model.trim="form[0].name"></x-input>
      <x-input
        title="手机号"
        name="mobile"
        keyboard="number"
        is-type="china-mobile"
        ref="mobile"
        :show-clear="false"
        v-model.trim="form[0].mobile">
      </x-input>
    </group>
    <group title="其他联系人信息">
      <popup-picker title="关系" :data="list"
                    v-model="value1"
                    popup-title="关系"></popup-picker>
      <x-input title="姓名" ref="name"  :show-clear="false" v-model.trim="form[1].name"></x-input>
      <x-input
        name="mobile"
        title="手机号"
        keyboard="number"
        is-type="china-mobile"
        ref="mobile"
        :show-clear="false"
        v-model.trim="form[1].mobile">
      </x-input>
    </group>
    </div>
    <div class="loan-publish_btn" style="padding:20px;">
      <x-button @click.native="submit" class="btn-yellow">提交</x-button>
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
      value: [],
      value1: [],
      list: [],
      form: [
        {
          contactId: 0,
          name: '',
          mobile: '',
          relation: null,
          isImportant: 1
        },
        {
          contactId: 0,
          name: '',
          mobile: '',
          relation: null,
          isImportant: 0
        }
      ]
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
      if (!this.validFormInput() || !this.validForm) {
        this.$vux.toast.text('信息填写有误')
        return
      }
      this.form[0].relation = findCode(relation, this.value[0])
      this.form[1].relation = findCode(relation, this.value1[0])

      let req = {
        requestData: JSON.stringify(this.form)
      }
      this.$store.dispatch('editcontacts', req).then(() => {
        //todo 提交成功跳转
        this.$vux.toast.text('提交成功')
      })
    },
    getNameValid() {
      return this.$refs.name.valid
    },
    getMobileValid() {
      return this.$refs.mobile.valid
    },
    validFormInput() {
      if (this.form[0].name && this.form[0].mobile && this.form[1].name && this.form[1].mobile) {
        if (this.getNameValid() && this.getMobileValid()) return true
        return false
      } else {
        return false
      }
    },
    validForm() {
      if (this.value.length !== 1 || this.value1.length !== 1) {
        return false
      } else {
        return true
      }
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
</style>
