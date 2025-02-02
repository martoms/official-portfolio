<template>
  <i :class="[name, getSizes]"></i>
</template>

<script lang="ts" setup>
interface Props {
  name: string
  size?: 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
}

const { size = 'md' } = defineProps<Props>()

const getSizes = computed(() => (size === 'md' ? 'text-base' : 'text-' + size))
</script>

<style>
@import url('/assets/styles/icons.css');
</style>
