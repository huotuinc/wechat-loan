<template>
  <div>
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
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  name: 'Layout',
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>
