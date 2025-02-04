<template>
  <VDialogue @close="emits('close')" :size="size">
    <LandingPopupQuotes :content="content" />
    <template #footer>
      <VText class="w-full p-3 text-right text-sm md:text-lg xl:text-sm text-secondary">
        {{ attribution.text }}
        <VText
          tag="a"
          :href="attribution.link"
          target="_blank"
          class="text-blue-500 font-semibold hover:underline"
        >
          {{ attribution.name }}
        </VText>
      </VText>
    </template>
  </VDialogue>
</template>

<script lang="ts" setup>
type Props = { size?: 'sm' | 'md' | 'auto' }
const { size = 'auto' } = defineProps<Props>()

const { attribution, content } = storeToRefs(useLandingContentsStore())

const emits = defineEmits(['close'])
</script>
