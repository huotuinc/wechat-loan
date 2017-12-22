<template>
  <div class="loan-wrap">
    <div style="overflow:hidden;">
      <group title="* 恶意填写会对您的借款额度造成负面影响">
        <x-address title="居住地区" v-model="value5" raw-value :list="addressData" value-text-align="center"></x-address>
        <x-input title="详细地址" ref="homeAddress" :show-clear="false" v-model="form.homeAddress" placeholder="请输入详细地址"></x-input>
        <popup-picker title="学历" :data="list1"
                      v-model="value1"
                      popup-title="学历"></popup-picker>
        <popup-picker title="婚姻状况" :data="list"
                      v-model="value"
                      popup-title="婚姻状况"></popup-picker>
        <popup-picker title="月薪范围" :data="list2"
                      v-model="value2"
                      popup-title="月薪范围"></popup-picker>
        <popup-picker title="工龄" :data="list3"
                      v-model="value3"
                      popup-title="本单位工龄"></popup-picker>
        <popup-picker title="房产状况" :data="list4"
                      v-model="value4"
                      popup-title="房产状况"></popup-picker>
        <x-input title="单位名称" ref="unitName"  :show-clear="false" v-model="form.unitName" placeholder="请输入单位名称"></x-input>
        <x-input title="单位地址" ref="unitAddress"  :show-clear="false" v-model="form.unitAddress" placeholder="请输入单位地址"></x-input>
       <x-input title="微信号" ref="wechatNumber"  :show-clear="false" v-model="form.wechatNumber"></x-input>
      </group>
    </div>
     <div class="loan-publish_btn" style="padding:20px;">
      <x-button @click.native="submit" class="btn-yellow">提交</x-button>
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
import { marry, findCode, education, workAge, income, realState } from '@/utils/enum'
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
        wechatNumber: '',
        homeArea: '',
        homeAddress: '',
        unitAddress: '',
        unitName: '',
        homeAreaCode: '',
        marry: null,
        realStateStatus: null,
        workTime: null,
        annualIncome: null,
        education: null
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
      this.form.homeAreaCode = this.value5.join(',')
      this.form.homeArea = this.getName(this.value5)
      this.form.marry = findCode(marry, this.value[0])
      this.form.realStateStatus = findCode(realState, this.value4[0])
      this.form.workTime = findCode(workAge, this.value3[0])
      this.form.annualIncome = findCode(income, this.value2[0])
      this.form.education = findCode(education, this.value1[0])
      this.$store.dispatch('userinfoedit', this.form).then(() => {
        //todo 提交成功跳转
        this.$vux.toast.text('提交成功')
      })
    },
    getName(value) {
      return value2name(value, ChinaAddressV4Data)
    },
    getWechatNumberValid() {
      return this.$refs.wechatNumber.valid
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
      if (this.form.wechatNumber && this.form.unitName && this.form.unitAddress && this.form.homeAddress) {
        if (
          this.getWechatNumberValid() &&
          this.getUnitNameValid() &&
          this.getUnitAddressValid() &&
          this.getUnitAddressValid() &&
          this.getHomeAddressValid()
        )
          return true
        return false
      } else {
        return false
      }
    },
    validForm() {
      if (
        this.value.length !== 1 ||
        this.value1.length !== 1 ||
        this.value2.length !== 1 ||
        this.value3.length !== 1 ||
        this.value4.length !== 1 ||
        this.value5 == ''
      ) {
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
