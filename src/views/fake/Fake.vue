<template>
    <div class="user-info">
      <h2>修改信息</h2>
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input title="姓名" v-model="form.username"></x-input>
        <x-input title="年龄" v-model="form.age"></x-input>
        <x-input title="电话" v-model="form.tel"></x-input>
        <x-input title="住址" v-model="form.address"></x-input>
        <!-- <x-button class="btn">提交</x-button> -->
        <router-link to="/fake/update" class="btn">提交</router-link>
      </group>
  </div>
</template>
<script>
import {Group,XButton,XInput} from 'vux'

export default {
  name: 'Fake',
  components: {
    Group,
    XInput,
    XButton
  },
  data() {
    return {
     form: {}
    }
  },
  created() {
    this.$store.dispatch('getFakes').then(res => {
      this.form = res
    })
  }
}
</script>
<style lang="less">
.user-info{
  text-align: center;
  >h2{
    width: 100%;
    height: 30px;
    margin-bottom: -10px;
  }
  .btn{
    display: block;
    width: 90%;
    height: 50px;
    margin: 0 auto;
    border-radius: 5px;
    background-color: yellowgreen;
    font-size:20px;
    line-height: 50px;
  }
}
</style>


