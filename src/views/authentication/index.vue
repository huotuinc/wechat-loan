<template>
  <div class="loan-wrap" v-show="isLoading">
    <div class="auth-list clearfix">
      <div class="auth-feedback">
        <router-link to="/feedback"><i class="iconfont icon-feedback"></i> 问题反馈</router-link>
      </div>
      <div class="auth-item" @click="payTips">
        <a :href="isPay && status.idCardFlg !== 3 ? '/identity' : 'javascript:;'" :class="classNames(status.idCardFlg)">
          <div class="icon">
            <i class="iconfont icon-photo"></i>
            <div class="result">{{status.idCardFlgMsg}}</div>
          </div>
          <p>身份信息识别</p>
        </a>
      </div>
      <div class="auth-item" @click="payTips">
        <a :href="isPay && status.uinfoFlg !== 3 ? '/basicInfo' : 'javascript:;'" :class="classNames(status.uinfoFlg)">
          <div class="icon">
            <i class="iconfont icon-user-o"></i>
            <div class="result">{{status.uinfoFlgMsg}}</div>
          </div>
          <p>基本信息认证</p>
        </a>
      </div>
      <div class="auth-item" @click="payTips">
        <a :href="isPay && status.contactFlg !== 3 ? '/contacts' : 'javascript:;'" :class="classNames(status.contactFlg)">
          <div class="icon">
            <i class="iconfont icon-contacts"></i>
            <div class="result">{{status.contactFlgMsg}}</div>
          </div>
          <p>联系人信息</p>
        </a>
      </div>
      <div class="auth-item" @click="payTips">
        <a href="javascript:;" @click.prevent="carrierHandleClick(isPay, status.carrierFlg)" :class="classNames(status.carrierFlg)">
          <div class="icon">
            <i class="iconfont icon-mobile"></i>
            <div class="result">{{status.carrierFlgMsg}}</div>
          </div>
          <p>运营商认证</p>
        </a>
      </div>
      <div class="auth-item" @click="payTips">
        <a href="javascript:;" @click.prevent="sesameHandleClick(isPay, status.zhimaFlg)" :class="classNames(status.zhimaFlg)">
          <div class="icon">
            <i class="iconfont icon-zhi-ma"></i>
            <div class="result">{{status.zhimaFlgMsg}}</div>
          </div>
          <p>芝麻信用认证</p>
        </a>
      </div>
       <!-- <div class="auth-item" @click="payTips">
        <a href="javascript:;" @click.prevent="blackListClick(isPay, status.zhimaIndustryFlg)" :class="classNames(status.zhimaIndustryFlg)">
          <div class="icon">
            <i class="iconfont icon-heimingdan"></i>
            <div class="result">{{status.zhimaIndustryMsg}}</div>
          </div>
          <p>行业黑名单</p>
        </a>
      </div> -->
    </div>
    <ul class="basic-tips" v-show="!isShowPay()">
      <li v-if="isSpecial"><strong style="color:#dc3545;">提示：</strong>点击图标进行认证。</li>
      <li v-else><strong style="color:#dc3545;">注意：</strong>每次付费认证共有三次失败机会，即任何一项认证失败三次视为本次认证失败，需要重新付费。</li>
    </ul>
    <div v-show="isShowPay()" @click="toPay" class="auth-btn">
      <p class="btn-yellow">付费认证</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Authentication',
  data() {
    return {
      status: {},
      sesameUrl: '',
      carrierUrl: '',
      isPay: true,
      isLoading: false,
      isSpecial: false,
      paymentForm: {
        tradeType: 1,
        payType: 2
      }
    }
  },
  created() {
    this.$store.dispatch('certificationAll').then(res => {
      this.status = res
      console.log(res)
    })

    /**
     * 第一步，判断是否是特殊用户
     * 第二部，判断有没有付款
     * 1、特，付 -> oK
     * 2、特，未付 -> 创建订单
     * 3、非特，付 -> OK
     * 4、非特，未付 -> 付款
     */
    this.$store.dispatch('checkFree').then(res => {
      this.isSpecial = res
      console.log(`IsWakaka: ${res}`)
      this.$store.dispatch('checkIsPay').then(res => {
        this.isPay = res
        console.log(`IsPay: ${res}`)
        if (!this.isPay) {
          if (this.isSpecial) {
            this.$store.dispatch('createOrder', this.paymentForm).then(() => {
              console.log('创建订单完成')
              this.isLoading = true
              this.isPay = true
            })
          } else {
            this.isLoading = true
          }
        } else {
          this.isLoading = true
        }
      })
    })
  },
  methods: {
    toPay() {
      this.$router.push({ path: '/payment/1' })
    },
    carrierHandleClick(isPay, flag) {
      if (isPay && flag !== 3) {
        this.$store.commit('UPDATE_LOADING', { isLoading: true, text: '跳转中' })
        this.$store
          .dispatch('authoperator')
          .then(res => {
            this.$store.commit('UPDATE_LOADING', { isLoading: false })
            window.location.href = res
          })
          .catch(err => {
            this.$store.commit('UPDATE_LOADING', { isLoading: false })
            console.log(err)
          })
      }
    },
    sesameHandleClick(isPay, flag) {
      if (isPay && flag !== 3) {
        this.$store.commit('UPDATE_LOADING', { isLoading: true, text: '跳转中' })
        this.$store
          .dispatch('getSesameUrl')
          .then(res => {
            this.$store.commit('UPDATE_LOADING', { isLoading: false })
            window.location.href = res
          })
          .catch(err => {
            this.$store.commit('UPDATE_LOADING', { isLoading: false })
            console.log(err)
          })
      }
    },
    blackListClick(isPay, flag) {
      if (isPay && flag !== 3) {
        this.$store.commit('UPDATE_LOADING', { isLoading: true, text: '跳转中' })
        this.$store
          .dispatch('getIndustryUrl')
          .then(res => {
            this.$store.commit('UPDATE_LOADING', { isLoading: false })
            window.location.href = res
          })
          .catch(err => {
            this.$store.commit('UPDATE_LOADING', { isLoading: false })
            console.log(err)
          })
      }
    },
    classNames(flag) {
      return {
        'is-pay': this.isPay,
        'is-success': flag === 3,
        'is-failure': flag === 2 || flag === 4
      }
    },
    isShowPay() {
      if (
        this.status.idCardFlg === 3 &&
        this.status.uinfoFlg === 3 &&
        this.status.contactFlg === 3 &&
        this.status.carrierFlg === 3 &&
        this.status.zhimaFlg === 3 &&
        this.status.zhimaIndustryFlg === 3
      ) {
        this.$router.replace({ path: '/authSuccess' })
        return false
      } else {
        return !this.isPay
      }
    },
    payTips() {
      if (this.isPay) return
      this.$vux.toast.text('请先付费')
    }
  }
}
</script>
<style lang="less">
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
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  }
}
.basic-tips {
  padding: 20px;
  font-size: 13px;
  color: #999;
  list-style: none;
}
</style>
