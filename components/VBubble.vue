<template>
  <div
    v-if="showBubble"
    ref="bubbleEl"
    :style="style"
    style="position: fixed; touch-action: none"
    class="flex-xy z-50 h-10 w-10 bg-slate-100 opacity-50 hover:opacity-100 shadow-sm rounded-full"
  >
    <div @click="handleClick" class="flex-xy">
      <VIcon :name="primaryActionIcon" size="xl" class="text-primary-foreground" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isClient } from '@vueuse/core'
import { set } from 'mongoose'

const settings = useSettingsStore()
const { isAdmin, editData } = storeToRefs(settings)

const bubbleEl = ref()
const showBubble = ref(false)

const { width } = useWindowSize(window)

const { style } = useDraggable(bubbleEl, {
  initialValue: { x: width.value - 60, y: 20 },
  preventDefault: true,
  stopPropagation: true
})

const primaryActionIcon = computed(() => {
  return editData.value ? 'icon-edit-solid' : 'icon-edit'
})

const handleClick = () => {
  if (editData.value) settings.setEditData(false)
  else settings.setEditData(true)
}

onMounted(() => {
  if (isClient) showBubble.value = isAdmin.value
})
</script>
