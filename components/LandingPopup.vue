<template>
  <VDialogue @close="emits('close')" :size="size">
    <template #header v-if="contentMode === 'trivia'">
      <div class="flex-y gap-5 h-full w-full pl-5 text-primary">
        <div class="flex-y gap-2" @click="enableScoring = !enableScoring">
          <VSwitch :enabled="enableScoring" />
          <VText class="text-sm font-semibold">enable scoring</VText>
        </div>

        <VButton
          v-if="enableScoring"
          class="p-1 text-sm hover:bg-slate-100 border-solid border border-slate-200 rounded-md"
          @click="resetScore++"
        >
          Reset Score
        </VButton>
      </div>
    </template>
    <component
      :is="contentComponent[contentMode as keyof typeof contentComponent]"
      :content="content"
      :enable-scoring="enableScoring"
      :reset-score="resetScore"
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
import { useStorage } from '@vueuse/core'
import LandingPopupQuotes from '@/components/LandingPopupQuotes.vue'
import LandingPopupJokes from '@/components/LandingPopupJokes.vue'
import LandingPopupTrivia from '@/components/LandingPopupTrivia.vue'

type Props = { size?: 'sm' | 'md' | 'auto' }
const { size = 'auto' } = defineProps<Props>()

const emits = defineEmits(['close'])

const { attribution, content, contentMode } = storeToRefs(useLandingContentsStore())

const resetScore = ref(0)
const enableScoring = useStorage('enableScoring', false)

const contentComponent = {
  quotes: LandingPopupQuotes as Component,
  jokes: LandingPopupJokes as Component,
  trivia: LandingPopupTrivia as Component
}
</script>
