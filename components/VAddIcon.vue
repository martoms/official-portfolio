<template>
  <div
    v-if="editData"
    class="flex-xy z-10 h-full w-full aspect-square p-5 bg-slate-500/20 rounded-md transition-smooth"
    :class="getOpacity"
    @click.stop="emits('click')"
  >
    <div class="flex-xy bg-slate-50 h-4 w-4 rounded-full">
      <VIcon name="icon-plus" size="sm" class="text-primary-foreground" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const settings = useSettingsStore()
const { editData } = storeToRefs(settings)

const emits = defineEmits(['click'])

const getOpacity = computed(() => {
  return editData.value ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
})
</script>
