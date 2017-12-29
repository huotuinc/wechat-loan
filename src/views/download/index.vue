<template>
  <div class="loan-wrap download-wrap">
    <div class="login-hd">
      <div class="logo-wrapper">
        <img class="logo" src="../../assets/logo.png" alt="有信">
        <h4>过海有信</h4>
      </div>
      <div class="download-content">
        <div class="download-btn_app">
          <a href="javascritp:;" class="btn">apple下载</a>
          <a href="javascritp:;" class="btn btn-android">android下载</a>
        </div>
        <div class="download-about">
          <p>过海有信是集拓客、客户管理、风控支持等于一身的工具类软件，是杭州过海投资管理有限公司拥有所有权与经营权的产品。</p>
          <p>过海有信致力于帮助有信用的个人和企业解决资金问题，我们助力创建一个诚信的社会。</p>
        </div>
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
</style>


