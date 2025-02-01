<template>
  <div>
    <img :src :alt class="h-full w-auto" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  src: string
  alt: string
  srcset?: string
}

defineProps<Props>()
</script>
