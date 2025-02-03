<template>
  <component :is="tag" :class="[getStyles]">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  tag?: 'span' | 'label' | 'a' | 'h1' | 'h2' | 'h3' | 'strong'
}

const { tag = 'p' } = defineProps<Props>()

const getStyles = computed(() => {
  return tag === 'strong' ? 'font-bold' : ''
})
</script>
