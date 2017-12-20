<template>
  <div>
    <div>
      <group title="* 恶意填写会对您的借款额度造成负面影响">
        <x-input title="姓名" ref="realName" required :show-clear="false"></x-input>
        <popup-picker title="婚姻状况" :data="list"
                      v-model="value"
                      popup-title="婚姻状况"></popup-picker>
        <popup-picker title="学历" :data="list1"
                      v-model="value1"
                      popup-title="学历"></popup-picker>
        <popup-picker title="月薪范围" :data="list2"
                      v-model="value2"
                      popup-title="月薪范围"></popup-picker>
        <popup-picker title="工龄" :data="list3"
                      v-model="value3"
                      popup-title="本单位工龄"></popup-picker>
        <popup-picker title="房产状况" :data="list4"
                      v-model="value4"
                      popup-title="本单位工龄"></popup-picker>
        <x-input title="单位名称" ref="unitName" required :show-clear="false" placeholder="请输入单位名称"></x-input>
        <x-input title="单位地址" ref="unitAddress" required :show-clear="false" placeholder="请输入单位地址"></x-input>
        <x-address title="居住地区" v-model="value5" raw-value :list="addressData" value-text-align="center"></x-address>
        <x-input title="详细地址" ref="homeAddress" required :show-clear="false" placeholder="请输入详细地址"></x-input>
      </group>
    </div>
    <div style="padding:20px;">
      <x-button @click.native="submit" type="primary">提交</x-button>
    </div>
  </div>
</template>

<script>
  import {
    XInput,
    Group,
    XButton,
    Cell,
    Picker,
    PopupPicker,
    XAddress,
    ChinaAddressV4Data,
    Value2nameFilter as value2name
  } from 'vux'
  import {marry, findCode, education, workAge, income, realState} from '@/utils/enum'
  export default {
    created() {
      this._getMarryList()
      this._getEducationList()
      this._getWorkAgeList()
      this._getIncomeList()
      this._getRealStateList()
    },
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      PopupPicker,
      Picker,
      XAddress
    },
    data() {
      return {
        addressData: ChinaAddressV4Data,
        value: [],
        value1: [],
        value2: [],
        value3: [],
        value4: [],
        value5: [],
        list: [],
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        form: {
          homeAreaCode: '',
          homeArea: '',
          homeAddress: '',
          marry: null,
          unitName: ''
        }
      }
    },
    methods: {
      _getRealStateList() {
        this._getDescList(this.list4, realState)
      },
      _getWorkAgeList() {
        this._getDescList(this.list3, workAge)
      },
      _getIncomeList() {
        this._getDescList(this.list2, income)
      },
      _getEducationList() {
        this._getDescList(this.list1, education)
      },
      _getMarryList() {
        this._getDescList(this.list, marry)
      },
      _getDescList(list, enums) {
        let ret = []
        enums.forEach((item) => {
          ret.push(item.desc)
        })
        list.push(ret)
      },
      submit() {
        if (this.value.length !== 1){
          this.$vux.toast.text('请选择借款用途')
          return
        }
        alert(this.value1.join(','))
      },
      getName (value) {
        return value2name(value, ChinaAddressV4Data)
      },
      getRealNameValid() {
        return this.$refs.realName.valid
      },
      getUnitNameValid() {
        return this.$refs.unitName.valid
      },
      getUnitAddressValid() {
        return this.$refs.unitAddress.valid
      },
      getHomeAddressValid() {
        return this.$refs.homeAddress.valid
      },
      validFormInput() {
        if (this.form.mobile && this.form.password) {
          if (this.getRealNameValid() && this.getUnitNameValid()
          && this.getUnitAddressValid() && this.getUnitAddressValid()
          && this.getHomeAddressValid()) return true
          return false
        } else {
          return false
        }
      },
      validForm() {
        if (this.value.length !== 1 || this.value1.length !== 1
        || this.value2.length !== 1 || this.value3.length !== 1
          || this.value4.length !== 1 || this.value5 == ''){
          return false
        } else {
            return true
        }
      }
    }
  }

</script>

<style scoped>

</style>
