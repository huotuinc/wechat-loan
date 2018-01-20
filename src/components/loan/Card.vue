<template>
  <div class="card">
    <div class="card-hd">
      <div class="bd">
        <h6>可借额度</h6>
      </div>
      <div class="ft">
        <img src="http://resali.huobanplus.com/cdn/avatar.png" alt="头像">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoanerCard'
}
</script>
<style lang="less">
.card {
  position: relative;
  padding: 16px 16px 16px 24px;
  margin: 0 12px 16px;
  background-color: #fff;
  box-shadow: 0 5px 3px rgba(4, 0, 0, 0.11);
  border-radius: 2px;
  box-sizing: border-box;
}
.card-hd {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  .bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .ft {
    width: 42px;
    height: 42px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
}
</style>
