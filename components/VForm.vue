<template>
  <VModal centered>
    <div ref="containerEl" class="modal-container">
      <VText class="form-title">
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
            :disabled="isPending"
            @submit.prevent="emits('save')"
          >
            {{ !isPending ? submitText : '' }}
            <VImage
              v-if="isPending"
              src="/images/loading-circle.svg"
              alt="loading"
              class="animate-spin h-5 w-5 invert"
            />
          </VButton>
        </div>
      </form>
    </div>
  </VModal>
</template>

<script lang="ts" setup>
interface Props {
  action?: 'add'
  isPending: boolean
}
const props = defineProps<Props>()

const emits = defineEmits(['save', 'cancel'])

const containerEl = ref()

const submitText = computed(() => {
  return props.action === 'add' ? 'Add' : 'Save'
})

onClickOutside(containerEl, () => emits('cancel'))
</script>
