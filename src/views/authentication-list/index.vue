<template>
 <div class="loan-wrap">
    <div class="loan-body">
    <group class="loan-body_item">
      <cell title="身份证识别" :is-link="status.idCardFlg !== 3">
        <i class="iconfont icon-id-front" slot="icon"></i>
        <div v-if="status.idCardFlg === 3">
            <span class="text-success">{{status.idCardFlgMsg}}</span>
        </div>
        <div v-else>
          <router-link to="/login"><!--跳转到认证页面-->
            <span class="text-danger">{{status.idCardFlgMsg}}</span>
          </router-link>
        </div>
      </cell>
      <cell title="基本信息认证" :is-link="status.uinfoFlg !== 3">
        <i class="iconfont icon-user-o" slot="icon"></i>
        <div v-if="status.uinfoFlg === 3">
          <span class="text-success">{{status.uinfoFlgMsg}}</span>
        </div>
        <div v-else>
          <router-link to="/login"><!--跳转到认证页面-->
            <span class="text-danger">{{status.uinfoFlgMsg}}</span>
          </router-link>
        </div>
      </cell>
      <cell title="联系人信息" :is-link="status.contactFlg !== 3">
        <i class="iconfont icon-contacts" slot="icon"></i>
        <div v-if="status.contactFlg === 3">
          <span class="text-success">{{status.contactFlgMsg}}</span>
        </div>
        <div v-else>
          <router-link to="/login"><!--跳转到认证页面-->
            <span class="text-danger">{{status.contactFlgMsg}}</span>
          </router-link>
        </div>
      </cell>
      <cell title="运营商认证" :is-link="status.carrierFlg !== 3">
        <i class="iconfont icon-mobile" slot="icon"></i>
        <div v-if="status.carrierFlg === 3">
          <span class="text-success">{{status.carrierFlgMsg}}</span>
        </div>
        <div v-else>
          <router-link to="/login"><!--跳转到认证页面-->
            <span class="text-danger">{{status.carrierFlgMsg}}</span>
          </router-link>
        </div>
      </cell>
      <cell title="芝麻信用认证" :is-link="status.zhimaFlg !== 3">
        <i class="iconfont icon-zhi-ma" slot="icon"></i>
        <div v-if="status.zhimaFlg === 3">
          <span class="text-success">{{status.zhimaFlgMsg}}</span>
        </div>
        <div v-else>
          <router-link to="/login"><!--跳转到认证页面-->
            <span class="text-danger">{{status.zhimaFlgMsg}}</span>
          </router-link>
        </div>
      </cell>
    </group>
    </div>
 </div>
</template>

<script>
import { XInput, Group, Cell } from 'vux'
export default {
  created() {
    this._getAuthenticationStatus()
  },
  methods: {
    _getAuthenticationStatus() {
      this.$store.dispatch('certificationAll').then(res => {
        this.status = res
      })
    }
  },
  components: {
    XInput,
    Group,
    Cell
  },
  data() {
    return {
      status: {}
    }
  }
}
</script>

<style scoped>

</style>
