<template>
  <NuxtLayout name="landing">
    <template #header>
      <div class="flex-xy flex-col gap-2">
        <VImage src="/images/name-logo.svg" alt="name-logo" class="h-[60px]" />
        <div class="mt-3">
          <VText class="text-primary text-lg font-semibold">
            Hi, I am a
            <VText tag="span">
              <VTyper
                :strings="['Software Engineer', 'Graphic Designer']"
                :typingSpeed="100"
                :backspaceSpeed="50"
                :delayBeforeStart="1000"
                :loop="true"
                @update="changeBg($event as 'Software Engineer' | 'Graphic Designer')"
                class="text-primary-foreground text-xl font-extrabold"
              />
            </VText>
          </VText>
        </div>
      </div>
    </template>
    <div class="relative h-full w-full landing">
      <!-- Background -->
      <div
        class="absolute h-[68%] w-full dev-bg transition-all duration-1000 ease-in-out"
        :class="currentBg === 'dev-bg' ? 'opacity-100' : 'opacity-0'"
      ></div>
      <div
        class="absolute h-[68%] w-full designer-bg transition-all duration-1000 ease-in-out"
        :class="currentBg === 'designer-bg' ? 'opacity-100' : 'opacity-0'"
      ></div>
      <!-- Topbar -->
      <div class="relative z-10 h-[60px]"></div>
      <!-- Content -->
      <div class="relative z-10 flex-xy flex-col gap-10 w-full h-[45%]">
        <!-- Greetings -->
        <div>
          <VText class="text-blue-dark text-center leading-5">
            Good {{ dayPeriod }},<br />
            have a happy {{ day }}!
          </VText>
        </div>
        <VImage src="/images/avatar.svg" alt="avatar" class="h-[300px]" />
      </div>
    </div>
    <template #nav></template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
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
