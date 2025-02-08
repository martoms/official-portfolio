<template>
  <div class="flex-xy w-[30px] cursor-pointer">
    <div class="relative w-full h-[10px] rounded-full bg-slate-300">
      <div
        class="absolute left-0 top-1/2 -translate-y-1/2 w-[15px] h-[15px] rounded-full transition-smooth !duration-300"
        :class="enabled ? 'translate-x-0 bg-primary' : 'translate-x-[15px] bg-secondary'"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = { enabled: boolean }
defineProps<Props>()
</script>
