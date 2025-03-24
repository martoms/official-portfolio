<template>
  <div ref="containerEl" class="bg-primary-background pt-10" @click="isActive = true">
    <div @mouseenter="trashIsHovered = true" @mouseleave="trashIsHovered = false">
      <VIcon
        :name="`icon-trash${trashIsHovered ? '-solid' : ''}`"
        size="xl"
        class="absolute z-10 top-0 right-0 text-primary hover:text-primary-foreground"
      />
    </div>
    <form class="bg-inherit flex flex-col gap-4" @submit.prevent="emits('save')">
      <slot />
      <div v-if="isActive" class="flex gap-3">
        <VButton
          btn-style="full"
          class="bg-secondary hover:bg-secondary-hover text-primary-background"
          @click.stop.prevent="handleCancel"
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
</template>

<script lang="ts" setup>
interface Props {
  action?: 'add'
  isPending: boolean
}
const props = defineProps<Props>()

const emits = defineEmits(['save', 'cancel'])

const containerEl = ref()
const trashIsHovered = ref(false)
const isActive = ref(false)

const submitText = computed(() => {
  return props.action === 'add' ? 'Add' : 'Save'
})

const handleCancel = () => {
  isActive.value = false
  emits('cancel')
}

onClickOutside(containerEl, () => handleCancel())
</script>
