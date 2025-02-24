<template>
  <div></div>
</template>

<script lang="ts" setup>
const router = useRouter()
useValidateFetch('api/logout').then(() => {
  codeAlert('LOGGED_OUT')
  router.push('/')
})
</script>
