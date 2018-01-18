<template>
  <div class="splash-wrap">
    <div class="splash-logo">
      <img src="../../assets/logo.png" alt="Logo">
    </div>
    <div class="splash-text">
      <p>查看更多低息出借信息，<br/>请关注公众号<span>“过海有信”</span></p>
    </div>
    <div class="splash-qrcode">
      <img src="../../assets/qrcode.jpg" alt="二维码">
    </div>
    <div class="splash-button">
      <a :href="to">跳过</a>
    </div>
    <div class="splash-footer">Copyright &copy; 杭州过海投资管理有限公司</div>
  </div>
</template>
<script>
export default {
  name: 'Splash',
  data() {
    return {
      to: ''
    }
  },
  created() {
    this.to = this.$route.query.to ? this.$route.query.to : '/'
  }
}
</script>
<style lang="less">
.splash-wrap {
  padding-top: 20px;
  min-height: 100%;
  background: #fff;
  box-sizing: border-box;
}
.splash-logo {
  margin-bottom: 20px;
  height: 75px;
  overflow: hidden;
  text-align: center;
  img {
    display: inline-block;
    width: 75px;
    height: 75px;
    border-radius: 10px;
  }
}
.splash-text {
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
  span {
    font-size: 24px;
    color: #ff9c00;
  }
}
.splash-qrcode {
  text-align: center;
  img {
    display: inline-block;
    width: 180px;
    height: 180px;
  }
}
.splash-button {
  padding: 20px 30px 0;
  text-align: center;
  a {
    padding: 4px 0;
    display: inline-block;
    width: 80px;
    border: 1px solid #000;
    color: #000;
    border-radius: 5px;
    font-size: 14px;
  }
  a:visited {
    color: #000;
  }
}
.splash-footer {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  font-size: 12px;
  color: #888;
  text-align: center;
}
@media only screen and (min-width: 320px) and (max-width: 568px) and (-webkit-device-pixel-ratio: 2) {
  .splash-text {
    margin-bottom: 5px;
  }
  .splash-button {
    padding: 10px 30px 0;
  }
  .splash-footer {
    bottom: 10px;
  }
}
</style>
