<template>
  <router-link class="loaner-item" to="/lender/x45645f46464">
    <div class="hd">
      <img src="http://resali.huobanplus.com/cdn/avatar.png" alt="头像">
    </div>
    <div class="bd">
      <h4>王**</h4>
      <p>3000-5000元</p>
    </div>
    <div class="ft">
      <a href="/" class="contact-btn">找TA借</a>
      <span><i class="num">10</i>人申请</span>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'Lender'
}
</script>
<style lang="less">
.loaner-item {
  padding: 10px 15px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  .hd {
    margin-right: 8px;
    width: 45px;
    height: 45px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  .bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    font-size: 14px;
    h4 {
      color: #727272;
      font-weight: bold;
    }
    p {
      color: #ff0000;
    }
  }
  .ft {
    text-align: center;
    .contact-btn {
      display: block;
      width: 60px;
      height: 32px;
      line-height: 32px;
      border: 1px solid #ff9c00;
      color: #ff9c00;
      font-size: 12px;
      border-radius: 3px;
    }
    span {
      font-size: 11px;
      color: #000;
    }
    .num {
      font-style: normal;
      color: #ff0000;
    }
  }
}
.loaner-item + .loaner-item {
  &::before {
    content: ' ';
    position: absolute;
    left: 15px;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d3d3d3;
    color: #d3d3d3;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
}
</style>
