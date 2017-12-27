<template>
  <div class="loan-res">
    <div class="res-hd">
      <div class="hd">
        <p>借款金额 / 元</p>
        <h2>{{receive.loanAmount}}</h2>
      </div>
      <div class="bd">
        <div class="bd-item">
          <p>{{receive.payAmount}}元</p>
          <span>应还金额</span>
        </div>
        <div class="bd-item">
          <p>{{receive.interestAmount}}元</p>
          <span>借款利息</span>
          </div>
        <div class="bd-item">
          <p>{{receive.loanDay}}元</p>
          <span>借款期限</span>
        </div>
      </div>
    </div>
    <div class="res-bd">
      <div class="res-preview">
        <div class="preview-bd">
          <div class="preview_item">
              <label class="preview_label">出借时间</label>
              <span class="preview_value">{{receive.grantTime}}</span>
          </div>
          <div class="preview_item">
              <label class="preview_label">还款时间</label>
              <span class="preview_value">{{receive.agreedRepayTime}}</span>
          </div>
          <div class="preview_item">
              <label class="preview_label">逾期日利率</label>
              <span class="preview_value">{{receive.overdueRate}}%</span>
          </div>
          <div class="preview_item">
              <label class="preview_label">还款方式</label>
              <span class="preview_value">{{receive.repayTypeName}}</span>
          </div>
          <div class="preview_item">
              <label class="preview_label">每月应还</label>
              <span class="preview_value">{{receive.monthRepayMoney}}元</span>
          </div>
        </div>
        <div class="preview-ft">
          <div class="preview_item">
              <label class="preview_label">出借人</label>
              <span class="preview_value">{{receive.lenderUserName}}</span>
          </div>
        </div>
      </div>
      <div class="weui-cells__title">补充说明</div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <textarea class="weui-textarea" rows="1" readonly v-model="receive.remarks"></textarea>
            </div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <label class="weui-label">信用报告</label>
          </div>
          <div class="weui-cell__ft">{{receive.isNeedAuth == 1 ? '需要':'不需要'}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <label class="weui-label">借款人</label>
          </div>
          <div class="weui-cell__ft">{{receive.loanerUserName}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
          <div class="weui-cell__bd"><input type="tel" placeholder="输入验证码" class="weui-input" v-model="receiveData.verifyCode"></div>
          <div class="weui-cell__ft">
            <button type="button" class="weui-vcode-btn" :disabled="disabled" @click="sendCode">{{sendButtonText}}</button>
          </div>
        </div>
      </div>
      <p class="agreement">已阅读并同意《借款条约》</p>
    </div>
    <div class="res-ft">
      <button type="button" class="apply-btn btn-yellow" @click="receiveOrder">立即申请</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'resTemplate',
  props: {
    receive: Object
  },
  data() {
    return {
      disabled: false,
      time: 0,
      timer: '',
      sendButtonText: '获取验证码',
      receiveData: {
        loanerMobile: '',
        verifyCode: '',
        orderId: ''
      }
    }
  },
  watch: {
    receive() {
      this.receiveData.loanerMobile = this.receive.loanerUserName
      this.receiveData.orderId = this.receive.orderId
    }
  },
  methods: {
    sendCode() {
      if (!this.disabled) {
        clearTimeout(this.timer)
        this.disabled = true
        this.$store
          .dispatch('sendVerifyCode', this.receiveData.loanerMobile)
          .then(() => {
            this.$vux.toast.text('发送成功')
            this.time = 60
            this.countDown()
          })
          .catch(err => {
            this.disabled = false
            console.log(err)
            this.$vux.toast.text('系统异常')
          })
      }
    },
    countDown() {
      if (this.time > 0) {
        this.time--
        this.sendButtonText = `${this.time}秒后发送`
        this.timer = setTimeout(this.countDown, 1000)
      } else {
        this.disabled = false
        this.sendButtonText = '获取验证码'
        clearTimeout(this.timer)
      }
    },
    receiveOrder() {
      if (this.receiveData.loanerMobile && this.receiveData.verifyCode) {
        this.$emit('receive-order', this.receiveData)
      } else {
        this.$vux.toast.text('请填写必要信息')
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variable.less';

.res-hd {
  padding: 25px 0;
  background-color: @loan-red;
  color: #fff;
  .hd {
    text-align: center;
    margin-bottom: 25px;
    p {
      font-size: 12px;
    }
    h2 {
      font-size: 50px;
      line-height: 1.2;
      font-weight: normal;
    }
  }
  .bd {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    line-height: 15px;
    text-align: center;
    .bd-item {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      p {
        font-size: 18px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
.res-bd {
  padding-bottom: 50px;
}
.res-preview {
  margin-bottom: 6px;
  position: relative;
  background-color: #ffffff;
  font-size: 14px;
  &::before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  &::after {
    content: ' ';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .preview-bd {
    position: relative;
    padding: 10px 15px;
    font-size: 0.9em;
    text-align: right;
    line-height: 2;
    &::after {
      content: ' ';
      position: absolute;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 15px;
    }
    .preview_item {
      overflow: hidden;
    }
    .preview_label {
      float: left;
      margin-right: 1em;
      min-width: 4em;
      color: #999999;
      text-align: justify;
      text-align-last: justify;
    }
    .preview_value {
      display: block;
      overflow: hidden;
      word-break: normal;
      word-wrap: break-word;
    }
  }
  .preview-ft {
    position: relative;
    padding: 10px 15px;
    text-align: right;
    line-height: 1.5em;
    .preview_label {
      float: left;
      margin-right: 1em;
      min-width: 4em;
      color: #999999;
      text-align: justify;
      text-align-last: justify;
    }
    .preview_value {
      display: block;
      overflow: hidden;
      word-break: normal;
      word-wrap: break-word;
    }
  }
}
.weui-cells__title {
  margin-bottom: 0.3em;
  padding-left: 15px;
  padding-right: 15px;
  color: #999999;
  font-size: 14px;
}
.weui-cells_form {
  position: relative;
  margin-bottom: 6px;
  background-color: #ffffff;
  line-height: 1.47058824;
  font-size: 17px;
  overflow: hidden;
}
.weui-cells {
  background: #fff;
  &:before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
}
.weui-cell {
  padding: 10px 15px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  &::before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
  }
}
.weui-cell__bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.weui-textarea {
  display: block;
  border: 0;
  resize: none;
  width: 100%;
  color: inherit;
  line-height: inherit;
  outline: 0;
}
.weui-textarea-counter {
  color: #b2b2b2;
  text-align: right;
}
.weui-label {
  display: block;
  width: 105px;
  word-wrap: break-word;
  word-break: break-all;
  color: #7e7e7e;
}
.weui-vcode-btn {
  display: inline-block;
  padding: 0 0.6em 0 0.7em;
  min-width: 78px;
  height: 24px;
  line-height: 24px;
  color: #717171;
  font-size: 12px;
  border: 1px solid #717171;
  border-radius: 12px;
  vertical-align: middle;
  outline: 0;
  background-color: transparent;
  &:disabled {
    color: #bebebe;
    border: 1px solid #bebebe;
  }
}
.weui-input {
  width: 100%;
  border: 0;
  outline: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font-size: inherit;
  color: inherit;
  height: 1.47058824em;
  line-height: 1.47058824;
}
.agreement {
  height: 50px;
  line-height: 50px;
  font-size: 12px;
  text-align: center;
  color: #999999;
}
.res-ft {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}

.apply-btn {
  display: block;
  width: 100%;
  height: 47px;
  line-height: 47px;
  font-size: 18px;
  border: none;
}
</style>

