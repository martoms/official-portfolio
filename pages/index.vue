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
      <div role="top-bar" class="relative z-10 h-[80px]"></div>
      <!-- Content -->
      <div role="content" class="relative z-10 flex-xy w-full h-[45%]">
        <VImage src="/images/avatar.svg" alt="avatar" class="h-[300px]" />
      </div>
    </div>
    <template #nav></template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentBg = ref('dev-bg')

const changeBg = (text: 'Software Engineer' | 'Graphic Designer') => {
  return text === 'Software Engineer'
    ? (currentBg.value = 'dev-bg')
    : (currentBg.value = 'designer-bg')
}
</script>
