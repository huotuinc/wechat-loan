<template>
  <div class="loan-wrap">
    <div class="loan-body" style="margin-bottom: 60px;">
      <group class="loan-body_item">
        <cell title="关于我们" is-link></cell>
        <cell title="常见问题" is-link></cell>
        <cell title="平台协议" is-link></cell>
        <cell title="头像" is-link></cell>
      </group>
    </div>
    <div class="loan-publish_btn" style="padding:20px;">
      <x-button @click.native="logout" class="btn-yellow">提交</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from 'vux'
import { mapGetters } from 'vuex'

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        location.reload()
      })
    }
  }
}
</script>
