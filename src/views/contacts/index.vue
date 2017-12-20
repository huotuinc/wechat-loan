<template>
  <div>
    <group title="主要联系人信息(需直系亲属)">
      <popup-picker title="关系" :data="list"
                    v-model="value"
                    popup-title="关系"></popup-picker>
      <x-input title="姓名" ref="name" required :show-clear="false" v-model.trim="form.name"></x-input>
      <x-input
        title="手机号"
        name="mobile"
        keyboard="number"
        is-type="china-mobile"
        ref="mobile"
        :show-clear="false"
        required
        v-model.trim="form.mobile">
      </x-input>
    </group>
    <group title="其他联系人信息">
      <popup-picker title="关系" :data="list"
                    v-model="value1"
                    popup-title="关系"></popup-picker>
      <x-input title="姓名" ref="name" required :show-clear="false" v-model.trim="form.name"></x-input>
      <x-input
        name="mobile"
        title="手机号"
        keyboard="number"
        is-type="china-mobile"
        ref="mobile"
        :show-clear="false"
        required
        v-model.trim="form.mobile">
      </x-input>

    </group>
  </div>
</template>

<script>
  import {
    XInput,
    Group,
    Cell,
    Picker,
    PopupPicker,
  } from 'vux'
  import {relation, findCode} from '@/utils/enum'
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
    },
    data() {
      return {
        value: [],
        value1: [],
        list: [],
        form: {
          name: '',
          mobile: ''
        }
      }
    },
    methods: {
      _getRelationList() {
        this._getDescList(this.list, relation)
      },
      _getDescList(list, enums) {
        let ret = []
        enums.forEach((item) => {
          ret.push(item.desc)
        })
        list.push(ret)
      },
    }
  }
</script>

<style scoped>
</style>
