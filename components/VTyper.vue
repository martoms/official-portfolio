<template>
  <VText tag="span" class="whitespace-nowrap">
    {{ currentText }}
    <VText tag="span" class="animate-blink font-normal"> |</VText>
  </VText>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useTimeoutFn } from '@vueuse/core'

interface Props {
  strings: string[]
  typingSpeed: number
  backspaceSpeed: number
  delayBeforeStart: number
  loop: boolean
}

const {
  strings,
  typingSpeed = 100,
  backspaceSpeed = 50,
  delayBeforeStart = 1000,
  loop = true
} = defineProps<Props>()

const emits = defineEmits<{
  (e: 'update', value: string): void
}>()

const currentText = ref('')
const currentIndex = ref(0)
const currentStringIndex = ref(0)

const { start: startDelay } = useTimeoutFn(() => {
  typeText()
}, delayBeforeStart)

const { start: startTyping } = useTimeoutFn(() => {
  typeText()
}, typingSpeed)

const { start: pauseBackspaceType } = useTimeoutFn(() => {
  backspaceText()
}, 2000)

const { start: startBackspaceTyping } = useTimeoutFn(() => {
  backspaceText()
}, backspaceSpeed)

function typeText() {
  if (currentIndex.value < strings[currentStringIndex.value].length) {
    currentText.value += strings[currentStringIndex.value].charAt(currentIndex.value)
    currentIndex.value++
    startTyping()
  } else {
    emits('update', currentText.value)
    pauseBackspaceType()
  }
}

function backspaceText() {
  if (currentIndex.value > 0) {
    currentText.value = currentText.value.slice(0, -1)
    currentIndex.value--
    startBackspaceTyping()
  } else {
    if (loop) {
      currentStringIndex.value = (currentStringIndex.value + 1) % strings.length
      startDelay()
    }
  }
}

watchEffect(() => startDelay())
</script>

<style scoped></style>
