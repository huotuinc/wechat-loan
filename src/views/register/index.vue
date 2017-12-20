<template>
  <form-register :type="pageType"></form-register>
</template>

<script>
import formRegister from '@/components/form/formRF'

export default {
  name: 'Register',
  data() {
    return {
      pageType: 'register'
    }
  },
  components: {
    'form-register': formRegister
  }
}
</script>
