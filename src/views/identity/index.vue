<template>
  <div class="loan-wrap">
    <group class="loan-body_item">
      <cell title="上传身份证正面" is-link>
        <input type="file" accept="image/jpeg, image/jpg, image/gif, image/png" capture="camera" @change="upload">
      </cell>
      <cell title="上传身份证背面" is-link></cell>
      <cell title="上传手持身份证照片" is-link></cell>
    </group>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
import lrz from 'lrz'
import uploader from '@/utils/uploader'

export default {
  name: 'identity',
  components: {
    Group,
    Cell
  },
  methods: {
    upload(e) {
      if (!e.target.files[0]) return
      let vm = this
      lrz(e.target.files[0], { width: 1980 })
        .then(function(rst) {
          rst.formData.append('name', 'img')
          uploader('/api/user/uploadHeadImg', rst.formData)
        })
        .catch(function(err) {})
    }
  }
}
</script>
<style lang="less" scoped>
.loan-body_item {
  .weui-cells {
    margin-top: 0 !important;
  }
}
</style>

