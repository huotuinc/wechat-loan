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
          <p>我们是xxx互联网金融有限公司推出的p2p网贷平台。安全的P2P网贷平台,拥有专业的P2P理财专家为投资理财人士提供安全、高收益的投资理财产品,快速贷为中小企业...我们是xxx互联网金融有限公司推出的p2p网贷平台。益的投资理财产品,快速贷为中小企业.</p>
          <p>我们是xxx互联网金融有限公司推出的p2p网贷平台。安全的P2P网贷平台,拥有专业的P2P理财专家为投资理财人士提供安全、高收益的投资理财产品,快速贷为中小企业...</p>
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


