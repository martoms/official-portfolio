<template>
  <div class="flex-x flex-col gap-2 text-primary mb-1">
    <VText tag="label" :for="id">{{ label }}</VText>
    <input
      :id="id"
      :type="!type ? 'text' : type"
      v-model="model"
      class="p-2 rounded-md border-none outline-none outline-0 focus:outline-1 outline-primary"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  id: string
  type?: 'text' | 'number' | 'password'
  label?: string
}
defineProps<Props>()

const model = defineModel<string | number>()
</script>
