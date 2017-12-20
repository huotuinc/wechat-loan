<template>
  <form-forget></form-forget>
</template>

<script>
import formRegister from '@/components/form/formRF'

export default {
  name: 'Forget',
  data() {
    return {
      pageType: 'forget'
    }
  },
  components: {
    'form-forget': formRegister
  }
}
</script>
