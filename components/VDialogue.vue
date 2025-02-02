<template>
  <VModal>
    <section
      ref="dialogueEl"
      class="relative left-1/2 -translate-x-1/2 bg-primary-background sm:max-w-full sm:min-w-full h-full rounded-lg overflow-hidden"
      :class="getSizes"
    >
      <!-- Header -->
      <div class="flex-y justify-between w-inherit h-[60px]">
        <VText tag="h3" class="flex-y p-3 h-full w-full">{{ title }}</VText>
        <!-- Close Btn -->
        <VButton class="flex-xy p-5 text-secondary" @click="emits('close')">
          <VIcon name="icon-close" size="xl" />
        </VButton>
      </div>
      <!-- Content -->
      <div class="w-inherit border-solid border-y border-slate-200 min-h-[100px]">
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
}
const { title, size = 'full' } = defineProps<Props>()

const emits = defineEmits(['close'])

const dialogueEl = ref<HTMLElement | null>(null)

const getSizes = computed(() => {
  switch (size) {
    case 'sm':
      return 'w-[500px]'
    case 'md':
      return 'w-1/2'
    case 'auto':
      return 'w-full md:w-1/2 xl:w-1/3'
    default:
      return 'w-full'
  }
})

onClickOutside(dialogueEl, () => emits('close'))
</script>
