<template>
  <VModal centered>
    <div ref="containerEl" class="bg-primary-background p-5 rounded-md shadow-md">
      <VText class="text-primary-foreground font-semibold text-lg text-center mb-5">
        <slot name="title" />
      </VText>
      <form class="bg-inherit flex flex-col gap-4" @submit.prevent="emits('save')">
        <slot />
        <div class="flex gap-3">
          <VButton
            btn-style="full"
            class="bg-secondary hover:bg-secondary-hover text-primary-background"
            @click.prevent="emits('cancel')"
            >Cancel</VButton
          >
          <VButton
            btn-style="full"
            class="bg-primary hover:bg-primary-hover text-primary-background"
            @submit.prevent="emits('save')"
            >Save</VButton
          >
        </div>
      </form>
    </div>
  </VModal>
</template>

<script lang="ts" setup>
const emits = defineEmits(['save', 'cancel'])

const containerEl = ref()

onClickOutside(containerEl, () => emits('cancel'))
</script>
