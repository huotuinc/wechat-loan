<template>
  <div class="loan-wrap">
    <view-box>
      <router-view />
      <tabbar>
        <tabbar-item selected link="/">
          <span slot="label">借款</span>
        </tabbar-item>
        <tabbar-item link="/todo">
          <span slot="label">待办事项</span>
        </tabbar-item>
        <tabbar-item link="/personal">
          <span slot="label">个人中心</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, ViewBox } from 'vux'

export default {
  name: 'Layout',
  components: {
    Tabbar,
    TabbarItem,
    ViewBox
  }
}
</script>
