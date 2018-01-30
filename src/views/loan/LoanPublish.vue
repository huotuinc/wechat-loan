<template>
  <div class="loan-wrap">
    <group class="loan-publish">
      <x-input
        title="借款金额"
        ref="borrowMoney"
        type="number"
        :show-clear="false"
        name="obj.borrowMoney"
        :is-type="integer"
        :placeholder="borrowMoneyPlace"
        required
        v-model.number="obj.borrowMoney">
        <span slot="right">元</span>
      </x-input>
      <x-input
        title="借款时长"
        ref="borrowTime"
        name="borrowTime"
        :show-clear="false"
        :is-type="integer"
        type="number"
        :placeholder="borrowTimePlace"
        required
        v-model.number="obj.borrowTime">
        <span slot="right">天</span>
      </x-input>
      <popup-picker
        title="借款用途"
        :data="list"
        v-model="useArray"
        @on-change="onChange"
        popup-title="借款用途">
      </popup-picker>
    </group>
    <group class="loan-publish">
      <cell title="信用报告" is-link v-if="authNum === 3" link="/credit">
        <span class="text-success">{{authText}}</span>
      </cell>
      <cell title="信用报告" is-link v-else link="/authentication">
        <span :class="authNum === 1 ? 'text-primary' : 'text-danger'" >{{authText}}</span>
      </cell>
    </group>
    <div class="loan-publish_rule">
      <check-icon :value.sync="hasChecked"><span>我已阅读并同意</span></check-icon><span>《<ins @click="open">借款条约</ins>》</span>
    </div>
    <div class="loan-publish_btn">
      <x-button @click.native="submit" class="btn-yellow" :disabled="isDisabled">{{obj.lendId !== 0 ? '确认申请' : '确认发布'}}</x-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="popupShow" position="bottom" max-height="50%">
        <template-data :page="page"></template-data>
      </popup>
    </div>
  </div>
</template>
<script>
import { TransferDom, Popup, XInput, Group, XButton, Cell, Picker, PopupPicker, CheckIcon } from 'vux'
import TemplateData from '../../components/template'
import { mapGetters } from 'vuex'
import { purpose, findCode } from '@/utils/enum'

export default {
  name: 'loanPublish',
  directives: {
    TransferDom
  },
  created() {
    this._getPurposeList()
    //页面刷新，需要再次获取
    if (!this.authText) {
      this.$store.dispatch('getIndex').then(() => {
        this.validForm()
      })
    }
    if (this.$route.name === 'Subscribe') {
      this.obj.lendId = this.$route.params.lendId || 0
      this.obj.lendUserId = this.$route.params.lenderId || 0
      this.$store
        .dispatch('findOneLend', {
          lendId: this.obj.lendId,
          lenderId: this.obj.lendUserId
        })
        .then(res => {
          this.oneLendInfo = res
          this._valve(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (sessionStorage.getItem('use')) this.useArray = [sessionStorage.getItem('use')]
    if (sessionStorage.getItem('borrowMoney')) this.obj.borrowMoney = sessionStorage.getItem('borrowMoney')
    if (sessionStorage.getItem('borrowTime')) this.obj.borrowTime = sessionStorage.getItem('borrowTime')
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
    Picker,
    Popup,
    TemplateData,
    CheckIcon
  },
  data() {
    return {
      hasChecked: true,
      list: [],
      useArray: [],
      obj: {
        borrowMoney: '',
        borrowTime: '',
        borrowUse: '',
        userType: 1,
        lendId: 0,
        lendUserId: 0
      },
      page: {},
      popupShow: false,
      isDisabled: true,
      integer: function(value) {
        return {
          valid: /^[1-9]\d*$/.test(value),
          msg: 'Error'
        }
      },
      validData: {
        minAmount: -1,
        maxAmount: -1,
        minDays: -1,
        maxDays: -1
      },
      borrowMoneyPlace: '请填写大于0的整数金额',
      borrowTimePlace: '请填写大于0的整数天数'
    }
  },
  watch: {
    'obj.borrowMoney'(val) {
      sessionStorage.setItem('borrowMoney', val)
      this.validForm()
    },
    'obj.borrowTime'(val) {
      sessionStorage.setItem('borrowTime', val)
      this.validForm()
    },
    'obj.borrowUse'() {
      this.validForm()
    },
    hasChecked() {
      this.validForm()
    },
    useArray(val) {
      this.onChange(val)
      sessionStorage.setItem('use', val)
    },
    $route(val) {
      if (val.name === 'Publish') {
        this.obj.lendId = 0
        this.obj.lendUserId = 0
      }
      if (val.name === 'Subscribe') {
        this.obj.lendId = this.$route.params.lendId || 0
        this.obj.lendUserId = this.$route.params.lenderId || 0
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
      this.$store.commit('UPDATE_LOADING', { isLoading: true, text: '发布中' })
      this.$store
        .dispatch('saveInfo', this.obj)
        .then(() => {
          this.$store.commit('UPDATE_LOADING', { isLoading: false })
          if (this.obj.lendUserId !== 0) {
            this.$router.push({ path: '/applyList' })
          } else {
            this.$router.push({ path: '/publishList' })
          }
          sessionStorage.clear()
        })
        .catch(err => {
          this.$store.commit('UPDATE_LOADING', { isLoading: false })
          this.$vux.toast.text(err.resultMsg)
        })
    },
    open() {
      this.popupShow = true
    },
    onChange(val) {
      this.obj.borrowUse = findCode(purpose, val[0])
    },
    validForm() {
      if (this.authNum !== 3) {
        this.isDisabled = true
        return
      }
      if (!/^[1-9]\d*$/.test(this.obj.borrowMoney)) {
        this.isDisabled = true
        return
      }
      if (!/^[1-9]\d*$/.test(this.obj.borrowTime)) {
        this.isDisabled = true
        return
      }
      if (this.obj.borrowUse === '') {
        this.isDisabled = true
        return
      }
      if (!this.hasChecked) {
        this.isDisabled = true
        return
      }
      this.isDisabled = false
    },
    _valve(data) {
      let amount = data.lendAmount.split('-')
      this.validData.minAmount = amount[0]
      this.validData.maxAmount = amount[1]
      this.borrowMoneyPlace = `请填写${this.validData.minAmount}-${this.validData.maxAmount}的整数金额`
      this._transformDay(data.lendDays)
    },
    _transformDay(day) {
      let dayArr = day.split('-')
      let minDay = parseInt(dayArr[0])
      let maxDay = parseInt(dayArr[1])
      let unit
      if (dayArr[1].indexOf('年') !== -1) {
        unit = '年'
        maxDay = parseInt(dayArr[1]) * 365
      }
      if (dayArr[1].indexOf('月') !== -1) {
        unit = '月'
        maxDay = parseInt(dayArr[1]) * 30
      }
      if (dayArr[1].indexOf('天') !== -1) {
        unit = '天'
        maxDay = parseInt(dayArr[1])
      }
      console.log(+dayArr[0])
      if (isNaN(+dayArr[0])) {
        if (dayArr[1].indexOf('年') !== -1) {
          unit = '年'
          maxDay = parseInt(dayArr[1]) * 365
        }
        if (dayArr[1].indexOf('月') !== -1) {
          unit = '月'
          maxDay = parseInt(dayArr[1]) * 30
        }
        if (dayArr[1].indexOf('天') !== -1) {
          unit = '天'
          maxDay = parseInt(dayArr[1])
        }
      } else {
        console.log('同样的数据')
      }
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
  .weui-input::-webkit-input-placeholder {
    padding-right: 10px;
    color: #ccc !important;
  }
  .weui-icon-warn {
    display: none !important;
  }
}
.loan-publish_rule {
  padding-top: 60px;
  text-align: center;
  color: #7c8496;
  font-size: 12px;
  .vux-check-icon {
    > .weui-icon-success {
      font-size: 14px !important;
    }
    > .weui-icon-circle {
      font-size: 14px !important;
    }
  }
  .vux-check-icon > .weui-icon-success:before,
  .vux-check-icon > .weui-icon-success-circle:before {
    color: #ff9c00 !important;
  }
}

.loan-publish_btn {
  padding: 20px;
}
</style>
