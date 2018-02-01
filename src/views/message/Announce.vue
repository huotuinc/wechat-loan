<template>
  <div class="loan-wrap">
    <div class="announce">
      <h4>{{announce.title}}</h4>
      <span class="date">{{announce.createTime}}</span>
      <div class="content">
        {{announce.content}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Announce',
  data() {
    return {
      announce: {}
    }
  },
  created() {
    let annId = this.$route.query.annId
    this.$store
      .dispatch('getAnnounce', {
        annId: annId
      })
      .then(res => {
        this.announce = res
      })
  }
}
</script>
<style scoped lang="less">
.loan-wrap {
  background: #fff;
}
.announce {
  padding: 20px 15px;
  h4 {
    font-size: 24px;
    text-align: center;
  }
  .date {
    font-size: 12px;
    color: #ababab;
  }
  .content {
    font-size: 14px;
    text-indent: 2em;
  }
}
</style>
