<template>
 <div class="loan-wrap">
    <div class="loan-body">
      <group class="loan-body_item">
        <!-- 身份证识别 -->
        <template v-if="status.idCardFlg === 3 || !isPay">
          <cell title="身份证识别">
            <i class="iconfont icon-id-front" slot="icon"></i>
             <span class="text-success">{{status.idCardFlgMsg}}</span>
          </cell>
        </template>
        <template v-else>
          <cell title="身份证识别" is-link link="/identity" v-if="isPay">
            <i class="iconfont icon-id-front" slot="icon"></i>
            <span class="text-danger">{{status.idCardFlgMsg}}</span>
          </cell>
          <cell title="身份证识别" v-else>
            <i class="iconfont icon-id-front" slot="icon"></i>
            <span class="text-danger">{{status.idCardFlgMsg}}</span>
          </cell>
        </template>
        <!-- 基本信息认证 -->
        <template v-if="status.uinfoFlg === 3 || !isPay">
          <cell title="基本信息认证">
            <i class="iconfont icon-user-o" slot="icon"></i>
            <span class="text-success">{{status.uinfoFlgMsg}}</span>
          </cell>
        </template>
        <template v-else>
          <cell title="基本信息认证" is-link link="/basicInfo" v-if="isPay">
            <i class="iconfont icon-user-o" slot="icon"></i>
            <span class="text-danger">{{status.uinfoFlgMsg}}</span>
          </cell>
          <cell title="基本信息认证" v-else>
            <i class="iconfont icon-user-o" slot="icon"></i>
            <span class="text-danger">{{status.uinfoFlgMsg}}</span>
          </cell>
        </template>
        <!-- 联系人信息 -->
        <template v-if="status.contactFlg === 3 || !isPay">
          <cell title="联系人信息">
            <i class="iconfont icon-contacts" slot="icon"></i>
            <span class="text-success">{{status.contactFlgMsg}}</span>
          </cell>
        </template>
        <template v-else>
          <cell title="联系人信息" is-link link="/contacts" v-if="isPay">
            <i class="iconfont icon-contacts" slot="icon"></i>
            <span class="text-danger">{{status.contactFlgMsg}}</span>
          </cell>
          <cell title="联系人信息" v-else>
            <i class="iconfont icon-contacts" slot="icon"></i>
            <span class="text-danger">{{status.contactFlgMsg}}</span>
          </cell>
        </template>
        <!-- 运营商认证 -->
        <template v-if="status.carrierFlg === 3 || !isPay">
          <cell title="运营商认证">
            <i class="iconfont icon-mobile" slot="icon"></i>
            <span class="text-success">{{status.carrierFlgMsg}}</span>
          </cell>
        </template>
        <template v-else>
          <cell title="运营商认证" is-link @click.native="carrierHandleClick" v-if="isPay">
            <i class="iconfont icon-mobile" slot="icon"></i>
            <span class="text-danger">{{status.carrierFlgMsg}}</span>
          </cell>
          <cell title="运营商认证" v-else>
            <i class="iconfont icon-mobile" slot="icon"></i>
            <span class="text-danger">{{status.carrierFlgMsg}}</span>
          </cell>
        </template>
        <!-- 芝麻信用认证 -->
        <template v-if="status.zhimaFlg === 3 || !isPay">
          <cell title="芝麻信用认证">
            <i class="iconfont icon-zhi-ma" slot="icon"></i>
            <span class="text-success">{{status.zhimaFlgMsg}}</span>
          </cell>
        </template>
        <template v-else>
          <cell title="芝麻信用认证" is-link  @click.native="zhimaHandleClick"  v-if="isPay">
            <i class="iconfont icon-zhi-ma" slot="icon"></i>
            <span class="text-danger">{{status.zhimaFlgMsg}}</span>
          </cell>
          <cell title="芝麻信用认证" v-else>
            <i class="iconfont icon-zhi-ma" slot="icon"></i>
            <span class="text-danger">{{status.zhimaFlgMsg}}</span>
          </cell>
        </template>
      </group>

      <div v-if="!isPay" @click="toPay" class="btn-yellow" style="text-align: center;width: 100%;position: absolute;bottom: 0;">
          <div style="font-size: 20px">付费认证</div>
          <div>(新用户需要进行信用认证)</div>
      </div>
    </div>
 </div>
</template>

<script>
import { XInput, Group, Cell,XButton } from 'vux'
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
      carrierUrl: '',
      isPay: false
    }
  },
  created() {
    this.$store.dispatch('certificationAll').then(res => {
      this.status = res
    })

    this.$store
      .dispatch('checkIsPay')
      .then(res => {
        this.isPay = res
//        if (!res) this.needPay()
//        if (!res) {
//          this.$router.push({ path: '/payment/1' })
//        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    toPay() {
      this.$router.push({ path: '/payment/1' })
    },
    carrierHandleClick() {
      this.$store
        .dispatch('authoperator')
        .then(res => {
          window.location.href = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    zhimaHandleClick() {
      this.$store
        .dispatch('getSesameUrl')
        .then(res => {
          window.location.href = res
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
        onCancel() {
          vm.$router.back()
        },
        onConfirm() {
          vm.$router.push({ path: '/payment/1' })
        }
      })
    }
  }
}
</script>
