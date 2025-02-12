<template>
  <div ref="profileEl" class="relative w-screen h-screen">
    <ProfileAboutme />
    <!-- container 2 -->
    <div ref="container2" class="fixed w-full h-full landing">
      <div class="absolute top-0 left-0 w-full h-[300px] bg-blue-300"></div>
      <div class="relative top-[300px] h-[calc(100vh-300px)] p-5 overflow-auto">
        <div class="h-[calc(100vh+300px)]"></div>
      </div>
    </div>
    <!-- container 3 -->
    <div ref="container3" class="relative top-[200vh] w-full h-full landing">
      <div class="absolute top-0 left-0 w-full h-[300px] bg-slate-300"></div>
      <div class="relative top-[300px] h-[calc(100vh-300px)] p-5 overflow-auto">
        <div class="h-[calc(100vh+300px)]"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isClient, useScroll, useElementBounding } from '@vueuse/core'

const profileEl = ref()
const container2 = ref()
const container3 = ref()

const { y: scrollY } = useScroll(window)
const { height } = useElementBounding(profileEl)

onMounted(() => {
  if (isClient) {
    watch(
      scrollY,
      () => {
        if (!profileEl.value) return
        updateElTop(container2.value, scrollY.value, 1)
      },
      { immediate: true }
    )
  }
})

function updateElTop(el: HTMLElement | null, y: number, multiple: number) {
  if (!el) return
  const top = height.value * multiple - y
  if (top >= 0) {
    el.style.top = `${top}px`
  } else el.style.top = '0px'
}
</script>
