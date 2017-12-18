<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
    <x-button type="primary" action-type="button" @click.native="submitFrom">submit</x-button>
  </div>
</template>

<script>
import { Group, Cell, XButton } from 'vux'

export default {
  components: {
    Group,
    Cell,
    XButton
  },
  data() {
    return {
      msg: 'Hello World!'
    }
  },
  methods: {
    submitFrom() {
      let obj = {
        username: 'xxxx',
        input: 'xxx',
        loginType: 0,
        userType: 1
      }
      this.$store.dispatch('login', obj)
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
