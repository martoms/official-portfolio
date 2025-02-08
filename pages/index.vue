<template>
  <NuxtLayout name="landing" :currentBg>
    <template #header>
      <LandingHeader @changeBg="changeBg" />
    </template>
    <div class="relative flex flex-col h-full w-full">
      <!-- Topbar -->
      <section class="flex-y justify-end h-[60px] w-full xl:fixed xl:top-0 z-20">
        <VButton class="flex-xy h-16 w-16 text-white" @click="showContentModeSelection = true">
          <VIcon name="icon-gear" size="3xl" class="text-shadow" />
        </VButton>
        <div
          v-if="showContentModeSelection"
          ref="contentModeEl"
          class="fixed top-2 p-5 w-[calc(100%-20px)] md:w-1/3 h-[150px] left-1/2 -translate-x-1/2 animate-dialogue bg-white/95 shadow-lg rounded-md"
        >
          <VText class="text-primary">Choose what you want me to say:</VText>
          <div class="flex gap-3 mt-5">
            <VButton
              v-for="mode in contentModes"
              :key="mode"
              btn-style="full"
              class="bg-secondary hover:bg-secondary-hover text-primary-background"
              :class="{ '!bg-primary hover:!bg-primary-hover': contentMode === mode }"
              @click="contentMode = mode"
            >
              {{ mode === 'quotes' ? 'Quotes' : mode === 'jokes' ? 'Jokes' : 'Trivia' }}
            </VButton>
          </div>
        </div>
      </section>
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
            class="h-[300px] max-h-[40vh] md:h-[500px] md:max-h-[35vh] xl:h-[650px] xl:max-h-[60vh] cursor-pointer"
            @click="handleClickAvatar()"
          />
          <!-- Callout -->
          <div
            v-if="showCallout && content === null"
            class="absolute -top-2 -left-10 md:left-[-100px] drop-shadow-2 animate-callout"
            @click="showSecondMessage = !showSecondMessage"
          >
            <VImage src="/images/callout.svg" alt="callout" class="h-[100px] md:h-[200px]" />
            <VTyper
              v-if="!showSecondMessage && !isPending"
              :strings="['Click Me!']"
              :loop="false"
              :cursor="false"
              :backspace="false"
              class="absolute top-7 md:top-[60px] left-4 md:left-7 w-full text-lg md:text-4xl font-semibold whitespace-nowrap"
            />
            <VTyper
              v-else-if="showSecondMessage && !isPending"
              :strings="['No, click my face!']"
              :delay-before-start="0"
              :loop="false"
              :cursor="false"
              :backspace="false"
              class="absolute top-6 left-4 md:left-6 text-lg md:text-4xl font-semibold text-wrap leading-5"
            />
            <VImage
              v-if="isPending"
              src="/images/ellipse-dots.gif"
              alt="loading"
              class="absolute top-0 md:top-10 left-5 md:left-[60px] h-[50px] md:h-[70px]"
            />
          </div>
          <!-- Popups -->
          <LandingPopup v-if="content && showContent" @close="showContent = false" />
        </div>
      </section>
    </div>
    <template #nav>
      <component :is="navComponents[currentNavComponent]" />
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import {
  useDateFormat,
  useNow,
  useWindowSize,
  useTimeoutFn,
  isClient,
  onClickOutside
} from '@vueuse/core'
import LandingNavLandscape from '@/components/LandingNavLandscape.vue'
import LandingNav from '@/components/LandingNav.vue'

useHead({ title: 'Marjohn | Home' })

const { isPending, content, contentMode } = storeToRefs(useLandingContentsStore())
const { getContent } = useLandingContentsStore()

const contentModeEl = ref()
const currentBg = ref('dev-bg')
const showCallout = ref(false)
const showSecondMessage = ref(false)
const showContent = ref(false)
const showContentModeSelection = ref(false)
const navComponents = {
  mobile: LandingNav as Component,
  desktop: LandingNavLandscape as Component
}
const currentNavComponent = ref('mobile' as keyof typeof navComponents)
const hour = ref(0)

const contentModes = ['quotes', 'jokes', 'trivia'] as const

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

const handleClickAvatar = () => {
  showContent.value = true
  getContent()
}

onClickOutside(contentModeEl, () => (showContentModeSelection.value = false))

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
