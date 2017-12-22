<template>
  <div class="list-item">
    <div class="loan-card">
      <div class="loan-card_hd clearfix">
        <span class="loan-hd_title">订单</span>
        <span class="loan-hd_user">出借人：李XX</span>
      </div>
      <div class="loan-card_bd vux-1px-b">
        <div class="loan-bd_img">
          <img src="../../assets/avatar.png" alt="">
        </div>
        <div class="loan-bd_content">
          <h4>15670004646</h4>
          <p>借款金额：<span>31313元</span></p>
          <p>逾期利率：<span>0.1%</span></p>
        </div>
      </div>
      <div class="loan-card_ft">
        <div class="loan-ft_content">
          <p class="loan-time">出借时间：2017-08-11 10:24:44</p>
          <p class="loan-time">还款日：2017-08-11</p>
        </div>
        <div class="loan-ft_status">
          <p class="text-danger">待审核</p>
        </div>
      </div>
    </div>
    <div class="loan-card">
      <div class="loan-card_hd clearfix">
        <span class="loan-hd_title">订单</span>
        <span class="loan-hd_user">出借人：李XX</span>
      </div>
      <div class="loan-card_bd vux-1px-b">
        <div class="loan-bd_img">
          <img src="../../assets/avatar.png" alt="">
        </div>
        <div class="loan-bd_content">
          <h4>15670004646</h4>
          <p>借款金额：<span>31313元</span></p>
          <p>逾期利率：<span>0.1%</span></p>
        </div>
      </div>
      <div class="loan-card_ft vux-1px-b">
        <div class="loan-ft_content">
          <p class="loan-time">出借时间：2017-08-11 10:24:44</p>
          <p class="loan-time">还款日：2017-08-11</p>
        </div>
        <div class="loan-ft_status">
          <p class="text-danger">待审核</p>
        </div>
      </div>
      <div class="loan-card_ft">
        <div class="loan-ft_content">
          <span>逾期日期：<i class="text-danger">10天</i></span>
          <span>逾期利息：<i class="text-danger">120元</i></span>
          <span>已还金额：<i class="text-danger">1000元</i></span>
        </div>
      </div>
    </div>
    <div class="loan-card">
      <div class="loan-card_hd clearfix">
        <span class="loan-hd_title">订单</span>
        <span class="loan-hd_user">出借人：李XX</span>
      </div>
      <div class="loan-card_bd vux-1px-b">
        <div class="loan-bd_img">
          <img src="../../assets/avatar.png" alt="">
        </div>
        <div class="loan-bd_content">
          <h4>15670004646</h4>
          <p>借款金额：<span>31313元</span></p>
          <p>逾期利率：<span>0.1%</span></p>
        </div>
      </div>
      <div class="loan-card_ft vux-1px-b">
        <div class="loan-ft_content">
          <p class="loan-time">出借时间：2017-08-11 10:24:44</p>
          <p class="loan-time">还款日：2017-08-11</p>
        </div>
        <div class="loan-ft_status">
          <p class="text-danger">待审核</p>
        </div>
      </div>
      <div class="loan-card_ft">
        <div class="loan-ft_content">
          <span>逾期日期：<i class="text-danger">10天</i></span>
          <span>逾期利息：<i class="text-danger">120元</i></span>
          <span>已还金额：<i class="text-danger">1000元</i></span>
        </div>
      </div>
    </div>
    <div class="loan-card">
      <div class="loan-card_hd clearfix">
        <span class="loan-hd_title">订单</span>
        <span class="loan-hd_user">出借人：李XX</span>
      </div>
      <div class="loan-card_bd vux-1px-b">
        <div class="loan-bd_img">
          <img src="../../assets/avatar.png" alt="">
        </div>
        <div class="loan-bd_content">
          <h4>15670004646</h4>
          <p>借款金额：<span>31313元</span></p>
          <p>逾期利率：<span>0.1%</span></p>
        </div>
      </div>
      <div class="loan-card_ft vux-1px-b">
        <div class="loan-ft_content">
          <p class="loan-time">出借时间：2017-08-11 10:24:44</p>
          <p class="loan-time">还款日：2017-08-11</p>
        </div>
        <div class="loan-ft_status">
          <p class="text-danger">待审核</p>
        </div>
      </div>
      <div class="loan-card_ft">
        <div class="loan-ft_content">
          <span>逾期日期：<i class="text-danger">10天</i></span>
          <span>逾期利息：<i class="text-danger">120元</i></span>
          <span>已还金额：<i class="text-danger">1000元</i></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
@import '../../style/variable.less';

.loan-card {
  margin-bottom: 14px;
  font-size: 14px;
  box-shadow: 0 5px 0 0 rgba(4, 0, 0, 0.16);
  border-radius: 5px;
  overflow: hidden;
  .loan-card_hd {
    padding: 0 12px;
    height: 30px;
    line-height: 30px;
    background: @loan-red;
    color: #fff;
    .loan-hd_title {
      float: left;
    }
    .loan-hd_user {
      float: right;
    }
  }
  .loan-card_bd {
    padding: 15px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 50px;
    background: #fff;
    .loan-bd_img {
      width: 50px;
      height: 50px;
      margin-right: 0.8em;
      img {
        width: 100%;
        height: 100%;
        border: 5px;
      }
    }
    .loan-bd_content {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      color: #000;
      h4 {
        font-weight: 400;
      }
      span {
        color: #797979;
      }
    }
  }
  .loan-card_ft {
    padding: 15px;
    height: 20px;
    background: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    .loan-ft_content {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      color: #000;
      span {
        font-size: 11px;
        margin-right: 6px;
      }
      i {
        font-style: normal;
      }
    }
    .loan-time {
      color: #797979;
      font-size: 11px;
    }
  }
}
</style>
