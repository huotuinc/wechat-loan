<template>
  <div class="loan-wrap">
    <div class="loaner-head">
      <div class="background"></div>
      <div class="info">
        <div class="avatar">
          <img src="http://resali.huobanplus.com/cdn/avatar.png" alt="头像">
        </div>
        <div class="desc vux-1px-b">
          <div class="item item-name">
            <i class="iconfont icon-personal-o"></i>
            <span>叶*天</span>
            <a href="/" class="btn"><i class="iconfont icon-msg-more"></i>&nbsp;联系他</a>
          </div>
          <div class="item item-tel">
            <i class="iconfont icon-mobile"></i>
            <span>157****7845</span>
            <a href="/" class="btn"><i class="iconfont icon-add-friends"></i>&nbsp;添加好友</a>
          </div>
        </div>
        <p class="success">成功借出<span>10</span>笔</p>
      </div>
    </div>
    <div class="loaner-active">
      <div class="contact-title">- TA的出借 -</div>
      <Card />
    </div>
     <div class="loaner-list">
      <div class="contact-title">- TA的更多出借 -</div>
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</template>
<script>
import Card from '../../components/loan/Card'

export default {
  name: 'LoanerDetail',
  components: {
    Card
  }
}
</script>
<style lang="less">
.loaner-head {
  overflow: hidden;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    background: #ff9c00;
  }
  .info {
    position: relative;
    padding: 16px;
    margin: 48px 16px 16px;
    min-height: 183px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 5px 3px rgba(4, 0, 0, 0.11);
    box-sizing: border-box;
    .avatar {
      position: absolute;
      top: -32px;
      left: 50%;
      padding: 2px;
      margin-left: -32px;
      width: 64px;
      height: 64px;
      overflow: hidden;
      border-radius: 100%;
      background: #fff;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .desc {
      padding-top: 24px;
      padding-bottom: 20px;
      .item {
        margin-bottom: 10px;
        height: 34px;
        line-height: 34px;
        overflow: hidden;
        > i {
          display: inline-block;
          width: 25px;
          height: 25px;
          line-height: 25px;
          color: #fff;
          border-radius: 100%;
          text-align: center;
          background: #ff9c00;
        }
      }
      span {
        font-size: 18px;
      }
      .btn {
        float: right;
        width: 108px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        border-radius: 5px;
        i {
          font-size: 20px;
          vertical-align: middle;
        }
        &:active {
          color: #fff;
        }
      }
      .item-name {
        .btn {
          background: #ff9c00;
        }
      }
      .item-tel {
        > i {
          background: #ff7200;
        }
        .btn {
          background: #ff7200;
        }
        span {
          color: #858585;
        }
      }
    }
    .success {
      padding-top: 16px;
      text-align: center;
      font-size: 13px;
      span {
        color: red;
      }
    }
  }
}
.contact-title {
  padding: 8px 0 16px;
  text-align: center;
  font-size: 14px;
  color: #727272;
}
</style>
