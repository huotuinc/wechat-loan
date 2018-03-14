<template>
  <div class="user-info">
      <h2>个人信息</h2>
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <!-- <x-input title="姓名" ></x-input>
        <x-input title="年龄" ></x-input>
        <x-input title="电话" ></x-input>
        <x-input title="住址" ></x-input> -->
				姓名：<p>{{ form.userName }}</p>
      </group>
  </div>
</template>

<script>
import { Group, XButton, XInput } from "vux";

export default {
  name: "FakeUpdate",
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
 
};
</script>

<style lang="less">
.user-info{
  text-align: center;
  >h2{
    width: 100%;
    height: 30px;
    margin-bottom: -10px;
  }
}
</style>
