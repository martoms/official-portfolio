<template>
  <main class="flex flex-col items-center w-screen h-screen p-10 landing">
    <VImage src="/images/name-logo.svg" alt="marjohn" class="h-10 mb-20" />
    <form @submit.prevent="login" class="w-full">
      <VText tag="h2" class="text-center text-xl text-primary-foreground font-bold mb-5">
        Admin Login
      </VText>
      <VInput id="username" label="Username" v-model="credentials.username" />
      <VInput id="password" label="Password" v-model="credentials.password" type="password" />
      <VButton
        btn-style="full"
        class="mt-5 bg-primary hover:bg-primary-hover text-primary-background"
        >Login</VButton
      >
    </form>
  </main>
</template>

<script lang="ts" setup>
useHead({ title: 'Marjohn | Admin' })

const isPending = ref(false)
const router = useRouter()

const credentials = ref({
  username: '',
  password: ''
})

const login = async () => {
  isPending.value = true

  const { data, code } = await useValidateFetch('api/admin', credentials.value, {
    method: 'POST'
  })

  if (code === 'AUTHORIZED') router.push('/')
  else codeAlert(code)

  isPending.value = false
}
</script>
