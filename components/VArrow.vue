<template>
  <VButton
    class="flex-xy h-[50px] w-[50px] bg-primary opacity-10 hover:opacity-50 shadow-md transition-smooth-300 text-primary-background rounded-full"
  >
    <VIcon :name="`icon-${direction}`" :size="getIconSize" class="animate-bounce" />
  </VButton>
</template>

<script lang="ts" setup>
interface Props {
  size?: 'sm' | 'lg'
  direction: 'up' | 'down' | 'left' | 'right'
}
const props = defineProps<Props>()

const getIconSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'md'
    case 'lg':
      return '3xl'
    default:
      return 'xl'
  }
})
</script>
