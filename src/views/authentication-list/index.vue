<template>
 <div>

   <group>
     <cell title="身份证识别" is-link>
       <div v-if="status.idCardFlg === 3">
           <span style="color: green">{{status.idCardFlgMsg}}</span>
       </div>
       <div v-else>
         <router-link to="/login"><!--跳转到认证页面-->
           <span style="color: red">{{status.idCardFlgMsg}}</span>
         </router-link>
       </div>
     </cell>
     <cell title="基本信息认证" is-link>
       <div v-if="status.uinfoFlg === 3">
         <span style="color: green">{{status.uinfoFlgMsg}}</span>
       </div>
       <div v-else>
         <router-link to="/login"><!--跳转到认证页面-->
           <span style="color: red">{{status.uinfoFlgMsg}}</span>
         </router-link>
       </div>
     </cell>
     <cell title="联系人信息" is-link>
       <div v-if="status.contactFlg === 3">
         <span style="color: green">{{status.contactFlgMsg}}</span>
       </div>
       <div v-else>
         <router-link to="/login"><!--跳转到认证页面-->
           <span style="color: red">{{status.contactFlgMsg}}</span>
         </router-link>
       </div>
     </cell>
     <cell title="运营商认证" is-link>
       <div v-if="status.carrierFlg === 3">
         <span style="color: green">{{status.carrierFlgMsg}}</span>
       </div>
       <div v-else>
         <router-link to="/login"><!--跳转到认证页面-->
           <span style="color: red">{{status.carrierFlgMsg}}</span>
         </router-link>
       </div>
     </cell>
     <cell title="芝麻信用认证" is-link>
       <div v-if="status.zhimaFlg === 3">
         <span style="color: green">{{status.zhimaFlgMsg}}</span>
       </div>
       <div v-else>
         <router-link to="/login"><!--跳转到认证页面-->
           <span style="color: red">{{status.zhimaFlgMsg}}</span>
         </router-link>
       </div>
     </cell>
   </group>

 </div>
</template>

<script>
  import {XInput, Group, Cell,} from 'vux'
  export default {
    created() {
      this._getAuthenticationStatus()
    },
    methods: {
      _getAuthenticationStatus() {
        this.$store
          .dispatch('certificationAll')
          .then((res) => {
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
