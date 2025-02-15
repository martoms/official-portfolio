<template>
  <div>
    <img :src :alt class="h-full w-auto" :class="objectFit || 'object-cover'" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  src: string
  alt: string
  srcset?: string
  objectFit?: 'contain' | 'cover'
}

defineProps<Props>()
</script>
