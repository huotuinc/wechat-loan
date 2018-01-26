<template>
  <div class="loan-wrap">
    <img :src="isDefault ? require('../../assets/bannerjk.jpg' ):  require('../../assets/case.jpg')" width="100%">
  <p class="jk">
    <a @click="toIndex">我要借款</a>
  </p>

	<div style="width: 100%; text-align: center; margin: 0 auto; border-top: 1px dashed #ddd; height: 15px"></div>

  <div class="jk-box" v-for="(c, index) in cases" :key="index">
    <div style="float: left">
      <div class="img-tx"><img :src="c.headImg"></div>
      <div class="list-detil">
        <p class="jk-mz">{{c.dearName}}</p>
        <p>成功借款<i style="color: #FF0004">{{c.loanMoney}}</i>元</p>
      </div>
    </div>
    <div class="jk-time">{{c.loanDate}}</div>
    <p style="clear: both"></p>
  </div>
  <p style="height: 20px;"></p>
  </div>
</template>
<script>
import { getToken, setChannelId } from '@/utils/auth'

export default {
  name: 'Case',
  data() {
    return {
      cases: {},
      isDefault: true
    }
  },
  methods: {
    toIndex() {
      if (getToken()) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/register' })
      }
    }
  },
  created() {
    if (this.$route.query.channelId) {
      this.isDefault = false
      setChannelId(this.$route.query.channelId)
    } else {
      this.isDefault = true
      setChannelId('default')
    }
    this.$store.dispatch('getCases').then(res => {
      this.cases = res
    })
  }
}
</script>
<style lang="less" scoped>
i {
  font-style: normal;
}

.loan-wrap {
  background: #f4f4f4;
}
.jk a {
  text-decoration: none;
  height: 38px;
  line-height: 38px;
  display: block;
  color: #ffffff;
  background-color: #ffa50c;
  border: 1px solid #ff7100;
  border-radius: 4px;
  text-align: center;
  padding: 3px;
  width: 90%;
  margin: 0 auto;
  margin-top: 11px;
  font-size: 20px;
  margin-bottom: 15px;
}
.list-detil {
  float: right;
  margin-top: 4px;
  margin-left: 10px;
  line-height: 23px;
}
.jk-box {
  background-color: #ffffff;
  font-size: 14px;
  padding: 7px 13px;
  margin: 3px 10px;
}
.jk-time {
  float: right;
  color: #ddd;
  margin-top: 35px;
}
.img-tx {
  float: left;
  margin-top: 4px;
}

.img-tx img {
  border-radius: 6px;
  width: 45px;
}
.jk-mz {
  font-size: 16px;
  font-weight: 700;
}
</style>
