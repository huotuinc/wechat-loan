<template>
  <div class="loan-wrap" v-show="isLoading">
    <div class="auth-head">
      <div class="hd"><i class="iconfont icon-smile"></i></div>
      <div class="bd">
        <h6>{{mobile}}</h6>
        <p>申请查看您的信用报告，同意点击请前往认证</p>
      </div>
    </div>
    <div class="auth-list clearfix">
      <div class="auth-item">
        <a href="javascript:;" class="is-pay">
          <div class="icon">
            <i class="iconfont icon-photo"></i>
          </div>
          <p>身份信息识别</p>
        </a>
      </div>
      <div class="auth-item">
         <a href="javascript:;" class="is-pay">
          <div class="icon">
            <i class="iconfont icon-user-o"></i>
          </div>
          <p>基本信息认证</p>
        </a>
      </div>
      <div class="auth-item">
         <a href="javascript:;" class="is-pay">
          <div class="icon">
            <i class="iconfont icon-contacts"></i>
          </div>
          <p>联系人信息</p>
        </a>
      </div>
      <div class="auth-item">
        <a href="javascript:;" class="is-pay">
          <div class="icon">
            <i class="iconfont icon-mobile"></i>
          </div>
          <p>运营商认证</p>
        </a>
      </div>
      <div class="auth-item">
        <a href="javascript:;" class="is-pay">
          <div class="icon">
            <i class="iconfont icon-zhi-ma"></i>
          </div>
          <p>芝麻信用认证</p>
        </a>
      </div>
    </div>
    <div @click="toAuth" class="auth-btn">
      <p class="btn-yellow">立即认证</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Authentication',
  data() {
    return {
      inviter: '',
      mobile: '',
      isLoading: false
    }
  },
  created() {
    this.inviter = this.$route.query.i
    this.$store
      .dispatch('getLenderById', { lenderId: this.inviter })
      .then(res => {
        this.mobile = res.userInfo.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
        this.isLoading = true
      })
      .catch(err => {
        this.$router.replace('/404')
      })
  },
  methods: {
    toAuth() {
      if (!this.inviter) {
        this.$vux.toast.text('缺少必要参数')
        return
      }
      sessionStorage.setItem('inviter', this.inviter)
      this.$router.push('/register')
    }
  }
}
</script>
<style lang="less">
.auth-head {
  padding: 10px 30px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  background: #fff;
  .hd {
    margin-right: 10px;
    i {
      font-size: 40px;
    }
  }
  .bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    h6 {
      font-size: 15px;
      font-weight: normal;
    }
    p {
      font-size: 13px;
      color: #777;
    }
  }
}
.auth-list {
  position: relative;
  padding-top: 32px;
}
.auth-feedback {
  position: absolute;
  right: 10px;
  top: 0;
  a {
    display: inline-block;
    color: #ff9c00;
    font-size: 12px;
    border-radius: 5px;
    &:active {
      color: #ff9c00;
    }
  }
  i {
    vertical-align: middle;
  }
}
.auth-item {
  margin-bottom: 30px;
  float: left;
  width: 33.33%;
  text-align: center;
  a {
    display: block;
    color: #000;
    &:active {
      color: #000;
    }
  }
  .icon {
    position: relative;
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto 15px;
    font-size: 12px;
    color: #949494;
    border: 1px solid #949494;
    border-radius: 100%;
    overflow: hidden;
    .iconfont {
      font-size: 32px;
    }
    .result {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
    }
  }
  .is-pay {
    .icon-photo {
      color: #fecf43;
    }
    .icon-user-o {
      color: #ffa006;
    }
    .icon-contacts {
      color: #9fb3f0;
    }
    .icon-mobile {
      color: #fc5f02;
    }
    .icon-zhi-ma {
      color: #80cbb6;
    }
  }
  .is-success {
    .icon {
      border: 1px solid #28a745;
    }
    .result {
      background: #28a745;
    }
  }
  .is-failure {
    .icon {
      border: 1px solid #dc3545;
    }
    .result {
      background: #dc3545;
    }
  }
  p {
    font-size: 14px;
  }
}
.auth-btn {
  padding: 50px;
  p {
    padding: 10px 0;
    font-size: 18px;
    text-align: center;
    border-radius: 5px;
  }
}
</style>
