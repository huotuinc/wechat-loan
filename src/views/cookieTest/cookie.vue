<template>
  <ul>
    <li>{{from.id}}</li>
    <li>{{from.token}}</li>
    <li>{{from.info}}</li>
    <li>{{from.showmenu}}</li>
  </ul>
</template>

<script>
import { getUserId, getUserInfo, getToken, getShowMenu } from '../../utils/auth'

export default {
  data() {
    return {
      from: {
        id: '',
        info: '',
        token: '',
        showmenu: ''
      }
    }
  },
  created() {
    this.from.id = getUserId()
    this.from.info = getUserInfo()
    this.from.token = getToken()
    this.from.showmenu = getShowMenu()
  }
}
</script>
