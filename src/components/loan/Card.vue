<template>
  <div class="card">
    <div class="card-hd">
      <div class="bd">
        <h6>可借额度</h6>
        <p>{{lendInfo.lendAmount}}元</p>
      </div>
      <div class="ft">
        <img :src="lendInfo.lenderHeadimg ? lendInfo.lenderHeadimg : 'http://resali.huobanplus.com/cdn/avatar.png'" alt="头像">
      </div>
    </div>
    <div class="card-bd vux-1px-b">
      <div class="bd-item">
        <h6>{{lendInfo.lendDays}}</h6>
        <p>出借时长</p>
      </div>
      <div class="bd-item">
        <h6>{{lendInfo.interestRate}}%</h6>
        <p>年利率</p>
      </div>
      <div class="bd-item">
        <h6>{{lendInfo.repayType}}</h6>
        <p>还款方式</p>
      </div>
  </div>
    <div class="card-ft">
      <div class="bd"><span>{{lendInfo.receivedCount}}</span>人申请</div>
      <div class="ft">
        <a href="javascript:;" class="apply-btn">立即申请</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoanerCard',
  props: {
    lendInfo: Object
  }
}
</script>
<style lang="less">
.card {
  position: relative;
  padding: 16px 16px 8px 24px;
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
  .bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    h6 {
      font-size: 13px;
      font-weight: normal;
    }
    p {
      font-size: 20px;
      color: #ff9c00;
    }
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
.card-bd {
  padding: 15px 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  .bd-item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
    h6 {
      font-size: 15px;
      font-weight: normal;
    }
    p {
      font-size: 13px;
      color: #797979;
    }
  }
}
.card-ft {
  padding-top: 8px;
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
    span {
      font-size: 13px;
      color: red;
    }
  }
  .ft {
    .apply-btn {
      width: 75px;
      height: 33px;
      line-height: 33px;
      display: inline-block;
      color: #ff9c00;
      border: 1px solid #ff9c00;
      border-radius: 5px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
