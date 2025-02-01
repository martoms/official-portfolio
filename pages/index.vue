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
        <div ref="navSelectorEl" class="absolute-center-y h-[80px] w-full gradient-x-center"></div>
        <div
          ref="navContainerEl"
          class="absolute-center-y flex flex-col justify-center h-full w-full no-scrollbar overflow-y-scroll"
        >
          <ul class="text-center">
            <li ref="portFolioEl" class="nav-item text-3xl font-black py-[4px] mt-[230px]">
              Portfolio
            </li>
            <li ref="profileEl" class="nav-item text-3xl font-black py-[4px]">Profile</li>
            <li ref="contactEl" class="nav-item text-3xl font-black py-[4px] mb-[115px]">
              Contact
            </li>
          </ul>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useDateFormat, useNow, useElementBounding, useScroll } from '@vueuse/core'
import { isClient } from '@vueuse/core'

const currentBg = ref('dev-bg')
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
  const proximity = (threshold - diff) / threshold + 0.5
  const ratio = proximity > 0 ? proximity : 0
  el.style.transform = `scale(${ratio})`
  el.style.opacity = `${ratio}`
}

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
