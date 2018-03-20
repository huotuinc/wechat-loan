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
          title="婚姻状况"
          :data="list"
          v-model="marry"
          @on-change="onMarryChange"
          popup-title="婚姻状况">
        </popup-picker>
        <x-input title="单位名称" ref="unitName" required :show-clear="false" v-model="form.unitName" placeholder="请输入单位名称"></x-input>
        <x-input title="微信号" ref="wechatNumber" required :show-clear="false" v-model="form.wechatNumber" placeholder="请输入微信号"></x-input>
        <!-- <x-input 
          placeholder="支付宝" 
          title="收款方式"
          v-model="form.gatheringType"
          disabled  
          direction="rtl" 
          :style="{color:'#000'}">
        </x-input> -->
        <selector placeholder="请选择收款账户" v-model="form.gatheringType" title="收款方式" :options="gatheringList" direction="rtl" readonly></selector>
        <x-input
          title="支付宝账号"
          required
          :show-clear="false"
          v-model="form.alipayNum" 
          placeholder="请输入支付宝账号">
        </x-input>
        <!-- <template v-if="form.gatheringType === 0">
          <x-input
            title="支付宝账号"
            required
            :show-clear="false"
            v-model="form.alipayNum"
            placeholder="请输入支付宝账号">
          </x-input>
        </template>
        <template v-if="form.gatheringType === 1">
          <x-input
            title="开户银行"
            required
            :show-clear="false"
            v-model="form.accountBank"
            placeholder="请输入开户银行">
          </x-input>
          <x-input
            title="银行卡号"
            type="number"
            required
            :show-clear="false"
            v-model="form.bankNum"
            placeholder="请输入银行卡号">
          </x-input>
          <x-address
            class="vux-1px-t vux-address"
            title="开户城市"
            v-model="bankCity"
            raw-value
            :list="addressData"
            value-text-align="right">
          </x-address>
          <x-input
            title="开户支行"
            required
            :show-clear="false"
            v-model="form.accountSubBranch"
            placeholder="请输入开户支行">
          </x-input>
        </template> -->
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
  Selector,
  XInput,
  Group,
  XButton,
  Cell,
  Picker,
  PopupPicker,
  XAddress,
  ChinaAddressV4Data,
  Value2nameFilter as value2name
} from "vux";
import { marry, findCode } from "@/utils/enum";

export default {
  created() {
    this._getMarryList();
  },
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    PopupPicker,
    Picker,
    XAddress,
    Selector
  },
  data() {
    return {
      isDisabled: true,
      addressData: ChinaAddressV4Data,
      marry: [],
      address: [],
      bankCity: [],
      list: [],
      form: {
        homeAreaCode: "",
        homeArea: "",
        homeAddress: "",
        marry: "",
        unitName: "",
        wechatNumber: "",
        gatheringType: 0,
        alipayNum: ""
        // accountBank: "",
        // bankNum: "",
        // accountSubBranch: "",
        // bankCity: ""
      },
      gatheringList: [{ key: 0, value: '支付宝 ' }]
    };
  },
  watch: {
    address() {
      this.validForm();
    },
    bankCity() {
      this.validForm();
    },
    "form.wechatNumber"() {
      this.validForm();
    },
    "form.homeAddress"() {
      this.validForm();
    },
    "form.unitName"() {
      this.validForm();
    },
    "form.marry"() {
      this.validForm();
    },
    "form.alipayNum"() {
      this.validForm();
    }
    // "form.accountBank"() {
    //   this.validForm();
    // },
    // "form.bankNum"() {
    //   this.validForm();
    // },
    // "form.accountSubBranch"() {
    //   this.validForm();
    // }
  },
  methods: {
    _getMarryList() {
      this._getDescList(this.list, marry);
    },
    _getDescList(list, enums) {
      let ret = [];
      enums.forEach(item => {
        ret.push(item.desc);
      });
      list.push(ret);
    },
    submit() {
      this.form.bankCity = this.getName(this.bankCity);
      this.form.homeAreaCode = this.address.join(",");
      this.form.homeArea = this.getName(this.address);
      this.$store.commit("UPDATE_LOADING", { isLoading: true, text: "认证中" });
      this.$store
        .dispatch("userinfoedit", this.form)
        .then(() => {
          this.$store.commit("UPDATE_LOADING", { isLoading: false });
          this.$router.back();
        })
        .catch(err => {
          this.$store.commit("UPDATE_LOADING", { isLoading: false });
          console.log(err);
        });
    },
    getName(value) {
      return value2name(value, ChinaAddressV4Data);
    },
    onMarryChange(val) {
      this.form.marry = findCode(marry, val[0]);
    },
    validForm() {
      if (this.address == "") {
        this.isDisabled = true;
        return;
      }
      if (this.form.homeAddress === "") {
        this.isDisabled = true;
        return;
      }
      if (this.form.wechatNumber === "") {
        this.isDisabled = true;
        return;
      }

      if (this.form.unitName === "") {
        this.isDisabled = true;
        return;
      }
      if (this.form.marry === "") {
        this.isDisabled = true;
        return;
      }
      if (this.form.alipayNum === "") {
          this.isDisabled = true;
          return;
      }
      if(this.form.gatheringType === 0){
        this.isDisabled = false;
        return;
      }
      // if (this.form.gatheringType === '支付宝') {
      //   if (this.form.alipayNum === "") {
      //     this.isDisabled = true;
      //     return;
      //   }
      // }
      // if (this.form.gatheringType === 1) {
      //   if (this.form.accountBank === "") {
      //     this.isDisabled = true;
      //     return;
      //   }
      //   if (this.form.bankNum === "") {
      //     this.isDisabled = true;
      //     return;
      //   }
      //   if (this.form.accountSubBranch === "") {
      //     this.isDisabled = true;
      //     return;
      //   }
      //   if (this.bankCity == "") {
      //     this.isDisabled = true;
      //     return;
      //   }
      // }
      // this.isDisabled = false;
    }
  }
};
</script>
<style lang="less">
.loan-basic {
  overflow: hidden;
  .weui-cell__bd {
    input {
      text-align: right;
    }
  }
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
.vux-address::before {
  left: 15px !important;
}
</style>
