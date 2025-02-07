<template>
  <VDialogue @close="emits('close')" :size="size">
    <component
      :is="contentComponent[contentMode as keyof typeof contentComponent]"
      :content="content"
    />
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
import LandingPopupQuotes from '@/components/LandingPopupQuotes.vue'
import LandingPopupJokes from '@/components/LandingPopupJokes.vue'

type Props = { size?: 'sm' | 'md' | 'auto' }
const { size = 'auto' } = defineProps<Props>()

const { contentMode } = storeToRefs(useLandingContentsStore())

const contentComponent = {
  quotes: LandingPopupQuotes as Component,
  jokes: LandingPopupJokes as Component
}

const { attribution, content } = storeToRefs(useLandingContentsStore())

const emits = defineEmits(['close'])
</script>
