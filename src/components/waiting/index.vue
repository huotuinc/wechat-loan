<template>
  <div class="v-loading-mask" v-show="show">
    <div class="v-loading-wrap">
      <vue-loading type="spin" color="#ff9c00" :size="{ width: '60px', height: '60px' }"></vue-loading>
      <span>{{ text || '加载中' }}</span>
    </div>
    <div class="weui-progress" v-show="progress">
      <div class="weui-progress__bar">
        <div class="weui-progress__inner-bar js_progress" :style="{width: percent + '%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
import vueLoading from 'vue-loading-template'

export default {
  name: 'waiting',
  components: {
    vueLoading
  },
  props: {
    show: {
      type: Boolean,
      default() {
        return false
      }
    },
    percent: {
      type: Number,
      default: 0
    },
    progress: Boolean,
    text: String
  }
}
</script>
<style lang="less" scoped>
.v-loading-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
}
.v-loading-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  color: #fff;
}
.weui-progress {
  position: absolute;
  left: 10%;
  right: 10%;
  top: 60%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.weui-progress__bar {
  background-color: #ebebeb;
  height: 3px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.weui-progress__inner-bar {
  width: 0;
  height: 100%;
  background-color: #ff9c00;
}
</style>
