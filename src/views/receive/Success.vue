<template>
  <div class="loan-wrap download-wrap">
    <div class="apply-header">
      <div class="apply-header-hd">
        <img src="../../assets/success.png" alt="Success">
      </div>
      <div class="apply-header-bd">
        <h4 class="apply-title">领取成功！</h4>
        <p class="apply-desc">请关注公众号“过海有信”，查看借条详情</p>
      </div>
    </div>
    <div class="login-hd">
      <div class="logo-wrapper">
        <img class="logo" src="../../assets/logo.png" alt="有信">
        <h4>过海有信</h4>
      </div>
      <div class="download-content">
        <div class="download-about">
          <img class="qc-code" src="../../assets/qrcode.jpg" alt="二维码">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReceiveSuccess'
}
</script>
<style lang="less">
.apply-header {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  height: 84px;
  color: #fff;
  background-color: #ff9c00;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.apply-header-hd {
  margin: 0 15px 0 25px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  img {
    width: 100%;
    height: 100%;
  }
}
.apply-header-bd .apply-title {
  font-size: 18px;
  font-weight: normal;
}
.apply-header-bd .apply-desc {
  font-size: 12px;
}
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
  margin: 0 auto;
  width: 264px;
}
.download-btn_app {
  margin-bottom: 20px;
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
.qc-code {
  width: 100%;
}
</style>
