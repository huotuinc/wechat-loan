<template>
  <div class="loan-wrap">
    <group class="loan-body_item identity-body_item">
      <cell title="上传身份证正面" is-link>
        <label for="J_front" class="upload-label">
          <input id="J_front" type="file" name="front" accept="image/jpeg, image/jpg, image/gif, image/png" capture="camera" @change="upload">
        </label>
      </cell>
      <cell title="上传身份证背面" is-link>
        <input type="file" name="back"  accept="image/jpeg, image/jpg, image/gif, image/png" capture="camera" @change="upload">
      </cell>
      <cell title="上传手持身份证照片" is-link>
        <input type="file" name="photoSelf" accept="image/jpeg, image/jpg, image/gif, image/png" capture="camera" @change="upload">
      </cell>
    </group>
    <div class="identity-demo">
      <img src="../../assets/demo.png" alt="">
    </div>
    <div class="loan-publish_btn" style="padding:20px;">
      <x-button @click.native="uploadAll" class="btn-yellow" :disabled="disabled">确定提交</x-button>
    </div>
  </div>
</template>
<script>
import { Group, Cell, XButton } from 'vux'
import lrz from 'lrz'
import uploader from '@/utils/uploader'

export default {
  name: 'identity',
  components: {
    Group,
    Cell,
    XButton
  },
  data() {
    return {
      formData: new FormData(),
      length: 0,
      disabled: true
    }
  },
  watch: {
    length(value) {
      if (value === 3) {
        this.disabled = false
      }
    }
  },
  methods: {
    upload(e) {
      let fileDOM = e.target
      if (!fileDOM.files[0]) return
      let vm = this
      lrz(fileDOM.files[0], { width: 1980 })
        .then(function(rst) {
          vm.formData.append(fileDOM.name, rst.file, rst.origin.name)
          fileDOM.value = ''
          vm.length++
        })
        .catch(function(err) {})
    },
    uploadAll() {
      uploader('/api/authentication/identityHtml', this.formData)
    }
  }
}
</script>
<style lang="less">
.identity-body_item {
  .weui-cells {
    margin-top: 0 !important;
  }
}

.identity-demo {
  img {
    width: 100%;
  }
}
// .upload-label {
//   input {
//     visibility: hidden;
//     height: 0;
//   }
// }
</style>

