<template>
  <div class="relative flex-xy h-[100px] w-full gradient-x-center">
    <VButton
      @click="handleClickArrow($event.target.classList[0].split('-')[1] as 'left' | 'right')"
      class="absolute z-10 top-1/2 -translate-y-1/2 left-1/4 translate-x-[120%] text-white"
      :disabled="currentItem === 0"
    >
      <VIcon name="icon-left" size="7xl" :class="{ 'hover:text-shadow': currentItem !== 0 }" />
    </VButton>
    <VButton
      @click="handleClickArrow($event.target.classList[0].split('-')[1] as 'left' | 'right')"
      class="absolute z-10 top-1/2 -translate-y-1/2 right-1/4 translate-x-[-120%] text-white"
      :disabled="currentItem === navItems.length - 1"
    >
      <VIcon
        name="icon-right"
        size="7xl"
        :class="{ 'hover:text-shadow': currentItem !== navItems.length - 1 }"
      />
    </VButton>
    <div class="relative h-[80%] w-1/3 text-center overflow-hidden">
      <ul class="absolute-center-x flex gap-[120px]">
        <li
          v-for="(item, i) in navItems"
          :key="item"
          class="nav-item w-[300px] text-7xl font-black"
          :class="[getVisibility(i), itemAnimation]"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTimeoutFn } from '@vueuse/core'

const navItems = ref(['Profile', 'Portfolio', 'Contact'])
const currentItem = ref(1)
const replacedItem = ref<number | undefined>(undefined)
const itemAnimation = ref('')

const { start } = useTimeoutFn(() => {
  itemAnimation.value = ''
  replacedItem.value = undefined
}, 500)

const getVisibility = (i: number) => {
  return currentItem.value === i || replacedItem.value === i ? 'block' : 'hidden'
}

const handleClickArrow = (dir: 'left' | 'right') => {
  replacedItem.value = currentItem.value

  if (dir === 'left') {
    currentItem.value--
    itemAnimation.value = 'animate-fly-right'
    start()
  } else {
    currentItem.value++
    itemAnimation.value = 'animate-fly-left'
    start()
  }
}
</script>
