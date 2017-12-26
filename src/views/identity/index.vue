<template>
  <div class="loan-wrap">
    <group class="loan-body_item identity-body_item">
      <cell title="上传身份证正面" is-link>
          <label for="J_front" class="upload-label">{{frontName}}
            <input id="J_front" type="file" name="front" accept="image/*"  @change="upload">
          </label>
      </cell>
      <cell title="上传身份证背面" is-link>
        <label for="J_back" class="upload-label">{{backName}}
          <input id="J_back" type="file" name="back" accept="image/*"  @change="upload">
        </label>
      </cell>
      <cell title="上传手持身份证照片" is-link>
        <label for="J_photoSelf" class="upload-label">{{photoSelfName}}
          <input id="J_photoSelf"  type="file" name="photoSelf" accept="image/*"  @change="upload">
        </label>
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
      front: false,
      back: false,
      photoSelf: false,
      disabled: true,
      frontName: '',
      backName: '',
      photoSelfName: ''
    }
  },
  watch: {
    front(value) {
      if (value && this.back && this.photoSelf) {
        this.disabled = false
      }
    },
    back(value) {
      if (value && this.front && this.photoSelf) {
        this.disabled = false
      }
    },
    photoSelf(value) {
      console.log(value)
      if (value && this.front && this.back) {
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
        .then(rst => {
          vm.formData.append(fileDOM.name, rst.file, rst.origin.name)
          vm[fileDOM.name] = true
          vm[`${fileDOM.name}Name`] = rst.origin.name
          fileDOM.value = ''
        })
        .catch(err => {})
    },
    uploadAll() {
      uploader('/api/authentication/identityHtml', this.formData).then(() => {
        vm.$router.back()
      })
    }
  }
}
</script>
<style lang="less">
.identity-body_item {
  .weui-cells {
    margin-top: 0 !important;
  }
  .weui-cell__ft {
    width: 230px;
  }
}

.identity-demo {
  img {
    width: 100%;
  }
}
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

