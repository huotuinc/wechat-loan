<template>
  <div class="loan-wrap">
    <div class="loan-basic">
      <group title="基本信息">
        <x-address title="居住地区"
          v-model="address"
          raw-value
          :list="addressData"
          value-text-align="right">
        </x-address>
        <x-input
          title="详细地址"
          ref="homeAddress"
          required
          :show-clear="false"
          v-model="form.homeAddress"
          placeholder="请输入详细地址">
        </x-input>
        <popup-picker
          title="学历"
          :data="list1"
          v-model="education"
          @on-change="onEducationChange"
          popup-title="学历">
        </popup-picker>
        <popup-picker
          title="婚姻状况"
          :data="list"
          v-model="marry"
          @on-change="onMarryChange"
          popup-title="婚姻状况">
        </popup-picker>
        <popup-picker
          title="月薪范围"
          :data="list2"
          v-model="annualIncome"
          @on-change="onAnnualIncome"
          popup-title="月薪范围">
        </popup-picker>
        <popup-picker
          title="工龄"
          :data="list3"
          v-model="workTime"
          @on-change="onWorkTime"
          popup-title="本单位工龄">
        </popup-picker>
        <popup-picker
          title="房产状况"
          :data="list4"
          v-model="realState"
          @on-change="onRealState"
          popup-title="房产状况">
        </popup-picker>
        <x-input title="单位名称" ref="unitName" required :show-clear="false" v-model="form.unitName" placeholder="请输入单位名称"></x-input>
        <x-input title="单位地址" ref="unitAddress" required :show-clear="false" v-model="form.unitAddress" placeholder="请输入单位地址"></x-input>
       <x-input title="微信号" ref="wechatNumber" required :show-clear="false" v-model="form.wechatNumber" placeholder="请输入微信号"></x-input>
      </group>
    </div>
    <ul class="basic-tips">
      <li>1、恶意填写会对您的借款额度造成负面影响</li>
      <li>2、您的私人信息不会对外公开，请放心填写。例如：住址、单位名称、单位地址、联系方式等隐私信息，会脱敏后展示，如：150*****183。</li>
    </ul>
    <div class="loan-publish_btn" style="padding:20px;">
      <x-button @click.native="submit" class="btn-yellow" :disabled="isDisabled">提交</x-button>
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
      isDisabled: true,
      addressData: ChinaAddressV4Data,
      education: [],
      marry: [],
      annualIncome: [],
      workTime: [],
      realState: [],
      address: [],
      list: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      form: {
        homeAreaCode: '',
        homeArea: '',
        homeAddress: '',
        education: '',
        marry: '',
        realStateStatus: '',
        unitAddress: '',
        unitName: '',
        workTime: '',
        annualIncome: '',
        wechatNumber: ''
      }
    }
  },
  watch: {
    address() {
      this.validForm()
    },
    'form.wechatNumber'() {
      this.validForm()
    },
    'form.homeAddress'() {
      this.validForm()
    },
    'form.unitAddress'() {
      this.validForm()
    },
    'form.unitName'() {
      this.validForm()
    },
    'form.marry'() {
      this.validForm()
    },
    'form.realStateStatus'() {
      this.validForm()
    },
    'form.workTime'() {
      this.validForm()
    },
    'form.annualIncome'() {
      this.validForm()
    },
    'form.education'() {
      this.validForm()
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
      this.form.homeAreaCode = this.address.join(',')
      this.form.homeArea = this.getName(this.address)
      this.$store.commit('UPDATE_LOADING', { isLoading: true, text: '认证中' })
      this.$store
        .dispatch('userinfoedit', this.form)
        .then(() => {
          this.$store.commit('UPDATE_LOADING', { isLoading: false })
          this.$router.back()
        })
        .catch(err => {
          this.$store.commit('UPDATE_LOADING', { isLoading: false })
          console.log(err)
        })
    },
    getName(value) {
      return value2name(value, ChinaAddressV4Data)
    },
    onEducationChange(val) {
      this.form.education = findCode(education, val[0])
    },
    onMarryChange(val) {
      this.form.marry = findCode(marry, val[0])
    },
    onAnnualIncome(val) {
      this.form.annualIncome = findCode(income, val[0])
    },
    onWorkTime(val) {
      this.form.workTime = findCode(workAge, val[0])
    },
    onRealState(val) {
      this.form.realStateStatus = findCode(realState, val[0])
    },
    validForm() {
      if (this.address == '') {
        this.isDisabled = true
        return
      }
      if (this.form.homeAddress === '') {
        this.isDisabled = true
        return
      }
      if (this.form.wechatNumber === '') {
        this.isDisabled = true
        return
      }
      if (this.form.unitAddress === '') {
        this.isDisabled = true
        return
      }
      if (this.form.unitName === '') {
        this.isDisabled = true
        return
      }

      if (this.form.marry === '') {
        this.isDisabled = true
        return
      }
      if (this.form.realStateStatus === '') {
        this.isDisabled = true
        return
      }
      if (this.form.workTime === '') {
        this.isDisabled = true
        return
      }
      if (this.form.annualIncome === '') {
        this.isDisabled = true
        return
      }
      if (this.form.education === '') {
        this.isDisabled = true
        return
      }
      this.isDisabled = false
    }
  }
}
</script>
<style lang="less">
.loan-basic {
  overflow: hidden;
  // .weui-cells {
  //   margin-top: 0 !important;
  //   margin-bottom: 6px;
  //   font-size: 14px;
  // }

  .weui-cell__bd {
    input {
      text-align: right;
    }
  }
  // .weui-input::-webkit-input-placeholder {
  //   padding-right: 10px;
  //   color: #ccc !important;
  // }
  .weui-icon-warn {
    display: none !important;
  }
}
.basic-tips {
  padding: 20px;
  font-size: 13px;
  color: #999;
  list-style: none;
}
</style>
