<template>
  <VModal centered>
    <div ref="containerEl" class="modal-container">
      <VText class="form-title"> Skills </VText>
      <div class="border-primary overflow-y-hidden"></div>
    </div>
  </VModal>
</template>

<script lang="ts" setup>
interface Props {
  skills: Skill[]
}
defineProps<Props>()

const emits = defineEmits(['close'])
const containerEl = ref()

onClickOutside(containerEl, () => emits('close'))
</script>
