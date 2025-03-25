<template>
  <VModal centered teleport="#edit-skills">
    <div ref="containerEl" class="modal-container">
      <div class="p-5">
        <slot></slot>
      </div>
      <div class="flex justify-center gap-5 mb-2 text-primary-background">
        <VButton btn-style="rounded" class="mt-5" @click="emits('close')">Cancel</VButton>
        <VButton
          btn-style="rounded"
          class="mt-5 !bg-primary hover:!bg-primary-hover"
          @click="emits('confirm')"
          >Confirm</VButton
        >
      </div>
    </div>
  </VModal>
</template>

<script lang="ts" setup>
const emits = defineEmits(['close', 'confirm'])

const containerEl = ref()

onClickOutside(containerEl, () => emits('close'))
</script>
