<template>
  <main ref="profileEl" class="relative w-screen h-screen">
    <ProfileAboutme />
    <ProfileSkills @assign="skillsSectionEl = $event" />
    <ProfileAwards @assign="awardsSectionEl = $event" />
    <div class="relative top-[200vh] -z-10 w-full h-full"></div>
    <NavBurger @scrollY="scrollY = $event" />
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
  </main>
</template>

<script lang="ts" setup>
import { isClient, useScroll, useElementBounding } from '@vueuse/core'

const profileEl = ref()
const skillsSectionEl = ref()
const awardsSectionEl = ref()

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
        updateElTop(skillsSectionEl.value, 1)
        updateElTop(awardsSectionEl.value, 2)

        if (scrollY.value === 0) {
          useHead({ title: 'Marjohn | About Me' })
        } else if (scrollY.value === height.value) {
          useHead({ title: 'Marjohn | Skills' })
        } else if (scrollY.value === height.value * 2) {
          useHead({ title: 'Marjohn | Awards and Certificates' })
        }
      },
      { immediate: true }
    )

    watch(
      isScrolling,
      () => {
        if (!isScrolling.value) {
          snap(skillsSectionEl.value)
          snap(awardsSectionEl.value)
        }
      },
      { immediate: true }
    )
  }
})
</script>
