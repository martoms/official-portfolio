<template>
  <NuxtLayout name="landing" :currentBg>
    <template #header>
      <LandingHeader @changeBg="changeBg" />
    </template>
    <div class="relative flex flex-col h-full w-full">
      <!-- Topbar -->
      <div class="h-[60px] w-full xl:fixed xl:top-0 z-10"></div>
      <!-- Content -->
      <div class="flex-xy flex-col flex-1 gap-5 md:gap-10 h-full w-full">
        <!-- Greetings -->
        <div class="xl:fixed xl:top-[80px] xl:left-0 xl:right-0 xl:w-full">
          <VText class="text-blue-dark text-center md:text-xl xl:text-lg leading-5">
            Good {{ dayPeriod }},<br class="xl:hidden" />
            have a happy {{ day }}!
          </VText>
        </div>
        <VImage
          src="/images/avatar.svg"
          alt="avatar"
          class="h-[300px] max-h-[40vh] md:h-[500px] md:max-h-[35vh] xl:h-[650px] xl:max-h-[60vh]"
        />
      </div>
    </div>
    <template #nav>
      <LandingNav />
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useDateFormat, useNow } from '@vueuse/core'

const currentBg = ref('dev-bg')

const hour = useDateFormat(useNow(), 'HH')
const day = useDateFormat(useNow(), 'dddd')

const dayPeriod = computed(() => {
  const hrs = Number.parseInt(hour.value)
  if (hrs < 12) return 'morning'
  else if (hrs === 12) return 'noon'
  else if (hrs < 18) return 'afternoon'
  else return 'evening'
})

const changeBg = (text: 'Software Engineer' | 'Graphic Designer') => {
  return text === 'Software Engineer'
    ? (currentBg.value = 'dev-bg')
    : (currentBg.value = 'designer-bg')
}
</script>
