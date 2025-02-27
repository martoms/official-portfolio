<template>
  <div
    v-if="editData"
    class="absolute-center-xy flex-xy bg-slate-500/20 h-[calc(100%+10px)] w-[calc(100%+10px)] border-solid border border-primary rounded-md transition-smooth"
    :class="getOpacity"
  >
    <div class="flex-xy bg-slate-50 h-4 w-4 rounded-full">
      <VIcon name="icon-edit-solid" size="sm" class="text-primary-foreground" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const settings = useSettingsStore()
const { editData } = storeToRefs(settings)

const getOpacity = computed(() => {
  return editData.value ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
})
</script>
