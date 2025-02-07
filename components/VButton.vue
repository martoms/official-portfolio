<template>
  <button :type="getType" :class="[btnStyle, disabled ? 'opacity-50' : '']" :disabled="disabled">
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
}

const props = defineProps<Props>()

const btnStyle = computed(() => {
  switch (props.btnStyle) {
    case 'full':
      return ['w-full', 'p-3', 'flex-xy', 'rounded-md']
    case 'rounded': {
      const bgColor = props.viariant ? `bg-${props.viariant}` : 'bg-slate-500 hover:bg-slate-400'
      return ['p-3', 'px-4', 'flex', 'items-center', 'justify-center', 'rounded-md', bgColor]
    }
    default:
      return ''
  }
})

const getType = () => {
  return props.type === 'submit' ? 'submit' : 'button'
}
</script>
