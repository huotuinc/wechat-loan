<template>
  <div class="loan-wrap">
    <group class="loan-body_item identity-body_item">
      <a href="javascript:;" class="weui-cell loan-upload">
        <span>上传身份证正面</span>
        <span class="file-name">{{frontName}}</span>
        <input type="file" name="front" accept="image/*" @change="upload">
      </a>
      <a href="javascript:;" class="weui-cell loan-upload">
        <span>上传身份证背面</span>
        <span class="file-name">{{backName}}</span>
        <input type="file" name="back" accept="image/*" @change="upload">
      </a>
      <a href="javascript:;" class="weui-cell loan-upload">
        <span>上传手持身份证照片</span>
        <span class="file-name">{{photoSelfName}}</span>
        <input type="file" name="photoSelf" accept="image/*" @change="upload">
      </a>
    </group>
    <div class="identity-demo">
      <img src="../../assets/demo.png" alt="">
    </div>
    <div class="loan-publish_btn" style="padding:20px;">
      <x-button @click.native.prevent="uploadAll" class="btn-yellow" :disabled="disabled">确定提交</x-button>
    </div>
  </div>
</template>
<script>
import { Group, XButton } from 'vux'
import lrz from 'lrz'
import uploader from '@/utils/uploader'

export default {
  name: 'identity',
  components: {
    Group,
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
          console.log(vm.formData)
          // if (vm.formData.has(fileDOM.name)) vm.formData.delete(fileDOM.name)
          vm.formData.append(fileDOM.name, rst.file, rst.origin.name)
          vm[fileDOM.name] = true
          vm[`${fileDOM.name}Name`] = '等待验证'
        })
        .catch(err => {
          console.log(err)
        })
      fileDOM.value = ''
    },
    uploadAll() {
      uploader('/api/authentication/identityHtml', this.formData, this.success, this.error)
    },
    success(res) {
      const vm = this
      this.$vux.alert.show({
        title: '验证结果',
        content: res.resultMsg,
        onHide() {
          vm.$router.back()
        }
      })
    },
    error(err) {
      this.$vux.toast.text('上传失败')
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
  display: block;
  position: relative;
  input {
    position: absolute;
    top: -9999px;
    height: 0;
    width: 0;
  }
}

.loan-upload {
  display: block;
  padding: 10px 15px;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  color: #000;
  &::after {
    content: ' ';
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 18px;
  }
  .file-name {
    color: #c8c8cd;
    margin-left: 10px;
  }
  &:active {
    background-color: #ececec;
  }
}
.loan-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
