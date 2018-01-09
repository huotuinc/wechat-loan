<template>
  <div class="loan-wrap download-wrap">
    <div class="login-hd">
      <div class="logo-wrapper">
        <img class="logo" src="../../assets/logo.png" alt="有信">
        <h4>过海有信</h4>
      </div>
      <div class="download-content">
        <div class="download-btn_app">
          <a href="https://fir.im/jre5" class="btn"><i class="iconfont icon-ios"></i> apple下载</a>
          <a href="http://s.huobanmall.com/yxdownload.html " class="btn btn-android"><i class="iconfont icon-android"></i> android下载</a>
        </div>
      </div>
      <div class="install vux-1px-t">
        <h4>
          <span>iOS系统安装说明</span>
        </h4>
        <img src="../../assets/explain.jpg" alt="安装说明">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'download'
}
</script>
<style lang="less">
.download-wrap {
  height: 100%;
  background: #fff;
  h4 {
    font-size: 20px;
    font-weight: 400;
  }
  .logo-wrapper {
    margin-bottom: 20px;
  }
}
.download-content {
  margin: 0 auto 20px;
  width: 264px;
}
.download-btn_app {
  margin-bottom: 40px;
  overflow: hidden;
  .btn {
    display: inline-block;
    width: 120px;
    height: 35px;
    line-height: 35px;
    color: #000;
    text-align: center;
    background: #fff;
    border: 1px solid #000;
    border-radius: 18px;
  }
  .btn-android {
    float: right;
  }
}
.download-about {
  padding: 15px;
  background: #f2f2f2;
  border-radius: 5px;
  overflow: hidden;
  p {
    margin-bottom: 25px;
    font-size: 12px;
  }
}
.install {
  text-align: center;
  &::before {
    left: 20px;
    right: 20px;
  }
  h4 {
    position: relative;
    display: inline-block;
    top: -12px;
    padding: 0 0.55em;
    color: #999999;
    font-size: 14px;
    background: #fff;
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>


