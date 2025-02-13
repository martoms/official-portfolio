<template>
  <div ref="profileEl" class="relative w-screen h-screen">
    <ProfileAboutme />
    <!-- container 2 -->
    <div ref="container2" class="fixed w-full h-full landing transition-smooth-300">
      <div class="absolute top-0 left-0 w-full h-[300px] bg-blue-300"></div>
      <div class="relative top-[300px] h-[calc(100vh-300px)] p-5 overflow-auto">
        <div class="h-[calc(100vh+300px)]"></div>
      </div>
    </div>
    <!-- container 3 -->
    <div ref="container3" class="fixed w-full h-full landing transition-smooth-300">
      <div class="absolute top-0 left-0 w-full h-[300px] bg-slate-300"></div>
      <div class="relative top-[300px] h-[calc(100vh-300px)] p-5 overflow-auto">
        <div class="h-[calc(100vh+300px)]"></div>
      </div>
    </div>
    <div class="relative top-[200vh] w-full h-full"></div>
    <VArrow
      v-if="scrollY >= height"
      direction="up"
      class="fixed left-1/2 -translate-x-1/2 top-5 animate-fade-in"
      @click="slidePrevious()"
    />
    <VArrow
      v-if="scrollY <= height"
      direction="down"
      class="fixed left-1/2 -translate-x-1/2 bottom-5 animate-fade-in"
      @click="slideNext()"
    />
  </div>
</template>

<script lang="ts" setup>
import { isClient, useScroll, useElementBounding } from '@vueuse/core'

const profileEl = ref()
const container2 = ref()
const container3 = ref()

const { y: scrollY, isScrolling } = useScroll(window)
const { height } = useElementBounding(profileEl)

const updateElTop = (el: HTMLElement | null, order: number) => {
  if (!el) return
  const top = height.value * order - scrollY.value
  if (top >= 0) {
    el.style.top = `${top}px`
  } else el.style.top = '0px'
}

const slidePrevious = () => (scrollY.value -= height.value)
const slideNext = () => (scrollY.value += height.value)

const snap = (el: HTMLElement | null) => {
  if (!el) return
  const elTop = Number(el.style.top.slice(0, -2))
  const threshold = height.value / 2

  if (elTop >= height.value) return
  if (elTop < threshold) el.style.top = '0px'
  else if (elTop > threshold && elTop < height.value) el.style.top = `${height.value}px`
}

onMounted(() => {
  if (isClient) {
    watch(
      scrollY,
      () => {
        if (!profileEl.value) return
        updateElTop(container2.value, 1)
        updateElTop(container3.value, 2)
      },
      { immediate: true }
    )

    watch(
      isScrolling,
      () => {
        if (!isScrolling.value) {
          snap(container2.value)
          snap(container3.value)
        }
      },
      { immediate: true }
    )
  }
})
</script>
