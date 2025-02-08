<template>
  <button
    :type="getType"
    :class="[btnStyle, getHoverStyle, disabled ? 'opacity-50' : '']"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  type?: string
  btnStyle?: 'full' | 'rounded'
  disabled?: boolean
  viariant?: 'success' | 'warning' | 'error'
  size?: 'sm'
}

const props = defineProps<Props>()

const getSize = computed(() => {
  if (!props.size) return 'p-3 px-4'
  else if (props.size === 'sm') return 'p-1 px-2 text-sm'
  else return ''
})

const btnStyle = computed(() => {
  switch (props.btnStyle) {
    case 'full':
      return ['w-full', 'p-3', 'flex-xy', 'rounded-md']
    case 'rounded': {
      const bgColor = props.viariant ? `bg-${props.viariant}` : 'bg-slate-500'
      return [getSize.value, 'flex', 'items-center', 'justify-center', 'rounded-md', bgColor]
    }
    default:
      return ''
  }
})

const getHoverStyle = computed(() => {
  return props.btnStyle === 'rounded' && !props.disabled ? 'hover:bg-slate-400' : ''
})

const getType = () => {
  return props.type === 'submit' ? 'submit' : 'button'
}
</script>
