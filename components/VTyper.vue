<template>
  <VText tag="span" class="whitespace-nowrap">
    {{ currentText }}
    <VText v-if="cursor" tag="span" class="animate-blink font-normal"> |</VText>
  </VText>
</template>

<script lang="ts" setup>
import { useTimeoutFn } from '@vueuse/core'

interface Props {
  strings: string[]
  typingSpeed?: number
  backspaceSpeed?: number
  delayBeforeStart?: number
  loop?: boolean
  cursor?: boolean
  backspace?: boolean
}

const {
  strings,
  typingSpeed = 100,
  backspaceSpeed = 50,
  delayBeforeStart = 1000,
  loop = true,
  cursor = true,
  backspace = true
} = defineProps<Props>()

const emits = defineEmits<{
  (e: 'update', value: string): void
}>()

const currentText = ref('')
const currentIndex = ref(0)
const currentStringIndex = ref(0)

// Timeout for the initial delay
const { start: startDelay, stop: stopDelay } = useTimeoutFn(
  () => {
    typeText()
  },
  delayBeforeStart,
  { immediate: false }
)

// Timeout for typing
const { start: startTyping, stop: stopTyping } = useTimeoutFn(
  () => {
    typeText()
  },
  typingSpeed,
  { immediate: false }
)

// Timeout for backspacing
const { start: startBackspace, stop: stopBackspace } = useTimeoutFn(
  () => {
    backspaceText()
  },
  backspaceSpeed,
  { immediate: false }
)

const { start: startPause, stop: stopPause } = useTimeoutFn(
  () => {
    backspaceText()
  },
  2000,
  { immediate: false }
)

function typeText() {
  if (currentIndex.value < strings[currentStringIndex.value].length) {
    currentText.value += strings[currentStringIndex.value].charAt(currentIndex.value)
    currentIndex.value++
    startTyping()
  } else {
    emits('update', currentText.value)
    startPause()
  }
}

function backspaceText() {
  if (!backspace) return
  if (currentIndex.value > 0) {
    currentText.value = currentText.value.slice(0, -1)
    currentIndex.value--
    startBackspace()
  } else {
    if (loop) {
      currentStringIndex.value = (currentStringIndex.value + 1) % strings.length
      startDelay()
    }
  }
}

onMounted(() => {
  startDelay()
})

onUnmounted(() => {
  stopDelay()
  stopTyping()
  stopBackspace()
  stopPause()
})
</script>
