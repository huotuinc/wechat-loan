<template>
  <div class="loan-wrap">
    <div class="loan-body" style="margin-bottom: 60px;">
      <group class="loan-body_item">
        <cell title="关于我们" is-link></cell>
        <cell title="常见问题" is-link></cell>
        <cell title="平台协议" is-link></cell>
        <cell title="头像" is-link>
          <input type="file" name="img" accept="image/jpeg, image/jpg, image/gif, image/png" capture="camera" multiple @change="upload">
        </cell>
      </group>
    </div>
    <div class="loan-publish_btn" style="padding:20px;">
      <x-button @click.native="logout" class="btn-yellow">退出</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from 'vux'
import { mapGetters } from 'vuex'
import lrz from 'lrz'
import uploader from '@/utils/uploader'

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
        this.$router.push({ path: '/login' })
      })
    },
    upload(e) {
      if (!e.target.files[0]) return
      let vm = this
      lrz(e.target.files[0], { width: 1980 })
        .then(function(rst) {
          rst.formData.append('img', rst.file, rst.origin.name)
          uploader('/api/user/uploadHeadImg', rst.formData)
        })
        .catch(function(err) {})
    }
  }
}
</script>
