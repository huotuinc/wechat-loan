<template>
 <div class="loan-wrap">
    <div class="loan-body">
      <group class="loan-body_item">
        <!-- 身份证识别 -->
        <template v-if="status.idCardFlg === 3">
          <cell title="身份证识别">
            <i class="iconfont icon-id-front" slot="icon"></i>
             <span class="text-success">{{status.idCardFlgMsg}}</span>
          </cell>
        </template>
        <template v-else>
          <cell title="身份证识别" is-link link="/identity">
            <i class="iconfont icon-id-front" slot="icon"></i>
            <span class="text-danger">{{status.idCardFlgMsg}}</span>
          </cell>
        </template>
        <!-- 基本信息认证 -->
        <template v-if="status.uinfoFlg === 3">
          <cell title="基本信息认证">
            <i class="iconfont icon-user-o" slot="icon"></i>
            <span class="text-success">{{status.uinfoFlgMsg}}</span>
          </cell>
        </template>
        <template v-else>
           <cell title="基本信息认证" is-link link="/basicInfo">
             <i class="iconfont icon-user-o" slot="icon"></i>
            <span class="text-danger">{{status.uinfoFlgMsg}}</span>
           </cell>
        </template>
        <!-- 联系人信息 -->
        <template v-if="status.contactFlg === 3">
          <cell title="联系人信息">
            <i class="iconfont icon-contacts" slot="icon"></i>
            <span class="text-success">{{status.contactFlgMsg}}</span>
          </cell>
        </template>
        <template v-else>
          <cell title="联系人信息" is-link link="/contacts">
            <i class="iconfont icon-contacts" slot="icon"></i>
            <span class="text-danger">{{status.contactFlgMsg}}</span>
          </cell>
        </template>
        <!-- 运营商认证 -->
        <template v-if="status.carrierFlg === 3">
          <cell title="运营商认证">
            <i class="iconfont icon-mobile" slot="icon"></i>
            <span class="text-success">{{status.carrierFlgMsg}}</span>
          </cell>
        </template>
        <template v-else>
          <cell title="运营商认证" is-link @click="carrierHandleClick">
            <i class="iconfont icon-mobile" slot="icon"></i>
            <span class="text-danger">{{status.carrierFlgMsg}}</span>
          </cell>
        </template>
        <!-- 芝麻信用认证 -->
        <template v-if="status.zhimaFlg === 3">
          <cell title="芝麻信用认证">
            <i class="iconfont icon-zhi-ma" slot="icon"></i>
            <span class="text-success">{{status.zhimaFlgMsg}}</span>
          </cell>
        </template>
        <template v-else>
          <cell title="芝麻信用认证" is-link  @click="zhimaHandleClick">
            <i class="iconfont icon-zhi-ma" slot="icon"></i>
            <span class="text-danger">{{status.zhimaFlgMsg}}</span>
          </cell>
        </template>

      </group>
    </div>
 </div>
</template>

<script>
import { XInput, Group, Cell } from 'vux'
import openWindow from '@/utils/openWindow'

export default {
  components: {
    XInput,
    Group,
    Cell
  },
  data() {
    return {
      status: {},
      sesameUrl: '',
      carrierUrl: ''
    }
  },
  created() {
    this.$store.dispatch('certificationAll').then(res => {
      this.status = res
    })

    this.$store
      .dispatch('checkIsPay')
      .then(isPay => {
        if (!isPay) this.needPay()
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    carrierHandleClick() {
      this.$store
        .dispatch('authoperator')
        .then(res => {
          openWindow(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    zhimaHandleClick() {
      this.$store
        .dispatch('getSesameUrl')
        .then(res => {
          openWindow(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    needPay() {
      const vm = this
      this.$vux.confirm.show({
        title: '认证费',
        content: '你未支付认证费',
        onConfirm() {
          vm.$router.push({ path: '/payment/1' })
        }
      })
    }
  }
}
</script>
