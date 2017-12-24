<template>
 <div class="loan-wrap">
    <div class="loan-body">
      <group class="loan-body_item">
        <cell title="身份证识别" :is-link="status.idCardFlg !== 3">
          <i class="iconfont icon-id-front" slot="icon"></i>
          <template v-if="status.idCardFlg === 3">
              <span class="text-success">{{status.idCardFlgMsg}}</span>
          </template>
          <template v-else>
            <router-link to="/login"><!--跳转到认证页面-->
              <span class="text-danger">{{status.idCardFlgMsg}}</span>
            </router-link>
          </template>
        </cell>
        <cell title="基本信息认证" :is-link="status.uinfoFlg !== 3">
          <i class="iconfont icon-user-o" slot="icon"></i>
          <template v-if="status.uinfoFlg === 3">
            <span class="text-success">{{status.uinfoFlgMsg}}</span>
          </template>
          <template v-else>
            <router-link to="/basicInfo">
              <span class="text-danger">{{status.uinfoFlgMsg}}</span>
            </router-link>
          </template>
        </cell>
        <cell title="联系人信息" :is-link="status.contactFlg !== 3">
          <i class="iconfont icon-contacts" slot="icon"></i>
          <template v-if="status.contactFlg === 3">
            <span class="text-success">{{status.contactFlgMsg}}</span>
          </template>
          <template v-else>
            <router-link to="/contacts">
              <span class="text-danger">{{status.contactFlgMsg}}</span>
            </router-link>
          </template>
        </cell>
        <cell title="运营商认证" :is-link="status.carrierFlg !== 3">
          <i class="iconfont icon-mobile" slot="icon"></i>
          <template v-if="status.carrierFlg === 3">
            <span class="text-success">{{status.carrierFlgMsg}}</span>
          </template>
          <template v-else>
            <span @click="carrierHandleClick"  class="text-danger">{{status.carrierFlgMsg}}</span>
          </template>
        </cell>
        <cell title="芝麻信用认证" :is-link="status.zhimaFlg !== 3">
          <i class="iconfont icon-zhi-ma" slot="icon"></i>
          <template v-if="status.zhimaFlg === 3">
            <span class="text-success">{{status.zhimaFlgMsg}}</span>
          </template>
          <template v-else>
            <span @click="zhimaHandleClick"  class="text-danger">{{status.zhimaFlgMsg}}</span>
          </template>
        </cell>
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
          console.log(res)
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
