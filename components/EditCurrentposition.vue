<template>
  <VForm @save="console.log('fdfsdfsd')" @cancel="emits('cancel')">
    <template #title>Current Position</template>
    <VInput id="title" label="Title" :style="2" />
    <VInput id="company" label="Company" :style="2" />
    <VInput id="start-date" label="Start Date" :style="2" />
  </VForm>
</template>

<script lang="ts" setup>
const emits = defineEmits(['cancel'])
</script>
