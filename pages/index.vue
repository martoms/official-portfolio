<template>
  <NuxtLayout name="landing" :currentBg>
    <template #header>
      <div class="flex-xy flex-col gap-2 w-full">
        <VImage src="/images/name-logo.svg" alt="name-logo" class="flex-x h-[60px] w-full" />
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
    <div class="relative flex flex-col h-full w-full">
      <!-- Topbar -->
      <div class="h-[60px]"></div>
      <!-- Content -->
      <div class="flex-xy flex-col flex-1 gap-5 h-full w-full">
        <!-- Greetings -->
        <div>
          <VText class="text-blue-dark text-center leading-5">
            Good {{ dayPeriod }},<br />
            have a happy {{ day }}!
          </VText>
        </div>
        <VImage src="/images/avatar.svg" alt="avatar" class="h-[300px] max-h-[40vh]" />
      </div>
    </div>
    <template #nav>
      <div class="relative top-[-50px] justify-center h-[inherit]">
        <div class="absolute-center-y h-[80px] w-full gradient-x-center"></div>
        <div class="absolute-center-y flex flex-col justify-center h-full w-full overflow-y-scroll">
          <ul class="text-center">
            <li class="nav-item text-5xl font-black py-[5px] mt-[250px]">Portfolio</li>
            <li class="nav-item text-5xl font-black py-[5px]">Profile</li>
            <li class="nav-item text-5xl font-black py-[5px] mb-[105px]">Contact</li>
          </ul>
        </div>
      </div>
    </template>
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
