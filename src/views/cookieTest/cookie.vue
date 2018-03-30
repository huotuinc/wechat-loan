<template>
  <ul>
    <li>{{from.id}}</li>
    <li>{{from.token}}</li>
    <li>{{from.info}}</li>
  </ul>
</template>

<script>
import { getUserId, getUserInfo, getToken } from '../../utils/auth'

export default {
  data() {
    return {
      from: {
        id: '',
        info: '',
        token: ''
      }
    }
  },
  created() {
    this.from.id = getUserId()
    this.from.info = getUserInfo()
    this.from.token = getToken()
  },
  mounted() {}
}
</script>
