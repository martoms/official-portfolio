<template>
  <NuxtLayout name="landing" :currentBg>
    <template #header>
      <LandingHeader @changeBg="changeBg" />
    </template>
    <div class="relative flex flex-col h-full w-full">
      <!-- Topbar -->
      <section class="h-[60px] w-full xl:fixed xl:top-0 z-10"></section>
      <!-- Content -->
      <section class="flex-xy flex-col flex-1 gap-5 md:gap-10 h-full w-full">
        <!-- Greetings -->
        <div class="xl:fixed xl:top-[80px] xl:left-0 xl:right-0 xl:w-full">
          <VText class="text-blue-dark text-center md:text-xl xl:text-lg leading-5">
            Good {{ dayPeriod }},<br class="xl:hidden" />
            have a happy {{ day }}!
          </VText>
        </div>
        <!-- Avatar -->
        <div class="relative">
          <VImage
            src="/images/avatar.svg"
            alt="avatar"
            class="h-[300px] max-h-[40vh] md:h-[500px] md:max-h-[35vh] xl:h-[650px] xl:max-h-[60vh]"
          />
          <!-- Callout -->
          <div
            v-if="showCallout"
            class="absolute -top-2 -left-10 md:left-[-100px] drop-shadow-2 animate-callout"
            @click="showSecondMessage = !showSecondMessage"
          >
            <VImage src="/images/callout.svg" alt="callout" class="h-[100px] md:h-[200px]" />
            <VTyper
              v-if="!showSecondMessage"
              :strings="['Click Me!']"
              :loop="false"
              :cursor="false"
              :backspace="false"
              class="absolute top-7 md:top-[60px] left-4 md:left-7 w-full text-lg md:text-4xl font-semibold whitespace-nowrap"
            />
            <VTyper
              v-else
              :strings="['No, click my face!']"
              :delay-before-start="0"
              :loop="false"
              :cursor="false"
              :backspace="false"
              class="absolute top-6 left-4 md:left-6 text-lg md:text-4xl font-semibold text-wrap leading-5"
            />
          </div>
        </div>
      </section>
    </div>
    <template #nav>
      <component :is="navComponents[currentNavComponent]" />
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useDateFormat, useNow, useWindowSize, useTimeoutFn, isClient } from '@vueuse/core'
import LandingNavLandscape from '@/components/LandingNavLandscape.vue'
import LandingNav from '@/components/LandingNav.vue'
import type { Component } from 'vue'

const currentBg = ref('dev-bg')
const showCallout = ref(false)
const showSecondMessage = ref(false)
const navComponents = {
  mobile: LandingNav as Component,
  desktop: LandingNavLandscape as Component
}
const currentNavComponent = ref('mobile' as keyof typeof navComponents)

const hour = ref(0)
const day = useDateFormat(useNow(), 'dddd')
const { width } = useWindowSize()

const { start } = useTimeoutFn(() => {
  showCallout.value = true
}, 3000)

const dayPeriod = computed(() => {
  if (hour.value < 12) return 'morning'
  else if (hour.value === 12) return 'noon'
  else if (hour.value < 18) return 'afternoon'
  else return 'evening'
})

const changeBg = (text: 'Software Engineer' | 'Graphic Designer') => {
  return text === 'Software Engineer'
    ? (currentBg.value = 'dev-bg')
    : (currentBg.value = 'designer-bg')
}

onMounted(() => {
  if (!isClient) return
  hour.value = Number(useDateFormat(useNow(), 'HH').value)
  start()
  watch(
    width,
    () => {
      if (width.value > 1280) currentNavComponent.value = 'desktop'
      else currentNavComponent.value = 'mobile'
    },
    { immediate: true }
  )
})
</script>
