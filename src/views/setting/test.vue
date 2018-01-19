<template>
  <div class="loan-wrap">
    <div class="loan-body" style="margin-bottom: 60px;">
      <group class="loan-body_item">
        <cell title="关于我们" is-link link="/about"></cell>
        <cell title="常见问题" is-link link="/question"></cell>
        <cell title="平台协议" is-link link="/protocol"></cell>
        <cell title="头像" is-link>
          <label for="J_img" class="upload-label">
            <input id="J_img" type="file" name="img" accept="image/*" @change="upload">
          </label>
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
      const vm = this
      this.$vux.confirm.show({
        title: '退出',
        content: '确定退出系统？',
        onConfirm() {
          vm.$store.dispatch('logout').then(() => {
            vm.$router.replace({ path: '/login' })
          })
        }
      })
    },
    upload(e) {
      let fileDOM = e.target
      let file = fileDOM.files[0]
      if (!file) return
      console.log(file)
      let vm = this
      let formData = new FormData()
      formData.append('img', file, file.name)
      uploader('/api/user/uploadHeadImg', formData, vm.success, vm.error)
      fileDOM.value = ''
    },
    success() {
      this.$vux.toast.text('上传成功')
    },
    error(err) {
      this.$vux.toast.text('上传失败')
    }
  }
}
</script>
<style lang="less">
.upload-label {
  display: inline-block;
  text-align: left;
  input {
    visibility: hidden;
    height: 0;
    width: 0;
  }
}
</style>
