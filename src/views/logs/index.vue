<template>
    <div class="timeline">
        <timeline>
            <timeline-item v-for="(log, index) in logs" :key="index">
                <h4 :class="[index === 0 ? 'recent' : '']">{{log.logInfo}}</h4>
                <p>{{log.logTime}}</p>
                <span class="line vux-1px-b"></span>
            </timeline-item>
        </timeline>
    </div>
</template>
<script>
import { Timeline, TimelineItem } from 'vux'

export default {
  name: 'Log',
  components: {
    Timeline,
    TimelineItem
  },
  data() {
    return {
      logs: []
    }
  },
  created() {
    this.$store.dispatch('orderLog', this.$route.params.orderId).then(res => {
      this.logs = res
    })
  }
}
</script>
<style lang="less">
.timeline {
  background: #fff;
}
.vux-timeline-item-color {
  background-color: darken(#e2e2e2, 15%) !important;
}
.vux-timeline-item-head-first {
  background-color: #ff9c00 !important;
  width: 12px !important;
  height: 12px !important;
  left: 0 !important;
  > i {
    display: none;
  }
}
.vux-timeline-item-tail {
  background-color: #e2e2e2 !important;
}
.vux-timeline-item-head {
  width: 8px !important;
  height: 8px !important;
  left: 2px !important;
}
.vux-timeline-item-content {
  h4,
  p {
    color: darken(#e2e2e2, 50%);
  }
  h4 {
    font-weight: normal;
    &.recent {
      color: #000;
    }
  }
  p {
    font-size: 12px;
  }
}
.vux-timeline-item-content {
  padding: 0 0 1.5rem 1.8rem !important;
}
.line {
  padding-top: 10px;
  display: block;
}
</style>
#
