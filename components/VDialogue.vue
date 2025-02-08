<template>
  <VModal>
    <section
      ref="dialogueEl"
      class="relative left-1/2 -translate-x-1/2 bg-primary-background h-full animate-dialogue rounded-lg overflow-hidden"
      :class="getSizes"
    >
      <!-- Header -->
      <div class="flex-y justify-between w-inherit h-[60px]">
        <VText v-if="title" tag="h3" class="flex-y p-3 h-full w-full">{{ title }}</VText>
        <slot name="header" />
        <!-- Close Btn -->
        <VButton class="flex-xy p-5 text-secondary" @click="emits('close')">
          <VIcon name="icon-close" size="xl" />
        </VButton>
      </div>
      <!-- Content -->
      <div
        class="w-inherit border-solid border-y border-slate-200 min-h-[100px]"
        :class="{ 'flex-xy': centered }"
      >
        <slot />
      </div>
      <!-- Footer -->
      <div class="flex-y w-inherit h-[60px]">
        <slot name="footer" />
      </div>
    </section>
  </VModal>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'

interface Props {
  title?: string
  size?: 'sm' | 'md' | 'auto'
  centered?: boolean
}
const { title, size = 'full', centered = true } = defineProps<Props>()

const emits = defineEmits(['close'])

const dialogueEl = ref<HTMLElement | null>(null)

const getSizes = computed(() => {
  switch (size) {
    case 'sm':
      return 'w-[500px]'
    case 'md':
      return 'w-1/2'
    case 'auto':
      return 'w-full md:w-2/3 xl:w-1/3'
    default:
      return 'w-full'
  }
})

onClickOutside(dialogueEl, () => emits('close'))
</script>
