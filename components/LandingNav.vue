<template>
  <div class="relative top-[-50px] justify-center h-[inherit]">
    <div
      ref="navSelectorEl"
      class="absolute-center-y h-[80px] md:h-[100px] w-full gradient-x-center"
    ></div>
    <div
      ref="navContainerEl"
      class="absolute-center-y flex flex-col justify-center h-full w-full no-scrollbar overflow-y-scroll"
    >
      <ul class="text-center">
        <li
          ref="portFolioEl"
          class="nav-item text-3xl md:text-4xl font-black py-[4px] md:py-[10px] mt-[230px] md:mt-[270px]"
        >
          Portfolio
        </li>
        <li ref="profileEl" class="nav-item text-3xl md:text-4xl font-black py-[4px] md:py-[10px]">
          Profile
        </li>
        <li
          ref="contactEl"
          class="nav-item text-3xl md:text-4xl font-black py-[4px] md:py-[10px] mb-[115px] md:mb-[100px]"
        >
          Contact
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useElementBounding, useScroll } from '@vueuse/core'
import { isClient } from '@vueuse/core'

const navSelectorEl = ref<HTMLElement | null>(null)
const navContainerEl = ref<HTMLElement | null>(null)
const portFolioEl = ref<HTMLElement | null>(null)
const profileEl = ref<HTMLElement | null>(null)
const contactEl = ref<HTMLElement | null>(null)

const { top: selectorTop, bottom: selectorBottom } = useElementBounding(navSelectorEl)
const { y: scrollY } = useScroll(navContainerEl, { behavior: 'smooth' })

onMounted(() => {
  if (isClient) {
    watch(
      scrollY,
      () => {
        if (!navContainerEl.value) return
        updateNavItemStyle(portFolioEl.value)
        updateNavItemStyle(profileEl.value)
        updateNavItemStyle(contactEl.value)
      },
      { immediate: true }
    )
  }
})

function updateNavItemStyle(el: HTMLElement | null) {
  if (!el) return
  const { top: elTop, bottom: elBottom } = el.getBoundingClientRect()
  const threshold = 50
  let diff = 0
  if (elTop < selectorTop.value) {
    diff = selectorTop.value - elTop
  } else if (elBottom > selectorBottom.value) {
    diff = elBottom - selectorBottom.value
  }
  const proximity = (threshold - diff) / threshold + 0.9
  const ratio = proximity > 0 ? proximity : 0
  el.style.transform = `scale(${ratio})`
  el.style.opacity = `${ratio}`
}
</script>
