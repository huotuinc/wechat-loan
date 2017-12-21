<template>
  <div>
    <timeline>
      <timeline-item>
        <p class="recent">2016-04-17</p>
        <h4 class="recent">300元</h4>
        <p class="recent">含本金250+利息50</p>
      </timeline-item>
      <timeline-item>
        <p>2016-04-16</p>
        <h4>300元</h4>
        <p>含本金250+利息50</p>
      </timeline-item>
      <timeline-item>
        <p>2016-04-15</p>
        <h4> 300元</h4>
        <p>含本金250+利息50</p>
      </timeline-item>
    </timeline>
  </div>
</template>

<script>
  import { Timeline, TimelineItem } from 'vux'
  export default {
    created() {
    },
    methods: {
    },
    components: {
      TimelineItem,
      Timeline
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped>

</style>
