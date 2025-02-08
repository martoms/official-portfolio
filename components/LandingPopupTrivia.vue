<template>
  <div class="relative p-5 md:p-12 w-full">
    <VText
      v-if="showPoint && enableScoring"
      class="absolute-center-xy text-5xl font-bold drop-shadow-md animate-points"
      :class="sign === '+' ? 'text-success' : 'text-danger'"
    >
      {{ `${sign}${point}` }}
    </VText>

    <VButton
      v-if="hasAnswered && enableScoring"
      btn-style="rounded"
      size="sm"
      class="absolute bottom-3 left-1/2 -translate-x-1/2 w-[100px] text-primary-background !bg-primary hover:!bg-primary-hover animate-fade-in"
      @click="handleNextQuestion()"
    >
      Next
    </VButton>

    <div
      v-if="enableScoring"
      class="flex-y justify-between mb-5 p-3 border-solid border border-slate-200 rounded-md"
    >
      <!-- Score -->
      <div class="flex-y gap-3 w-full text-primary">
        <VText class="flex-y gap-1">
          <VIcon name="icon-check-solid" class="text-success" />
          {{ correct }}
        </VText>
        <VText class="flex-y gap-1">
          <VIcon name="icon-wrong-solid" class="text-danger" />
          {{ wrong }}
        </VText>
      </div>
      <!-- Points -->
      <VText class="w-full text-center">{{ points }}</VText>
      <!-- Percentage -->
      <div class="w-full text-right">{{ percent }}%</div>
    </div>

    <div class="text-sm text-center">
      <VText class="uppercase font-semibold text-primary">
        {{ content?.difficulty }}
      </VText>
      <VText class="italic text-primary-foreground">
        {{ content?.category && decodeText(content.category) }}
      </VText>
    </div>

    <VText class="text-primary md:text-2xl xl:text-lg mt-3">
      <VTyper
        v-if="content"
        :strings="[question]"
        :backspace="false"
        :typingSpeed="50"
        :loop="false"
        :hide-cursor-after="true"
        class="text-wrap"
        @update="showOptions = true"
      />
    </VText>

    <div
      v-if="showOptions"
      class="grid grid-cols-2 gap-2 p-3 mt-3 w-full text-primary-background animate-fade-in"
    >
      <VButton
        v-for="option in options"
        :key="option"
        btn-style="rounded"
        class="w-full h-auto text-primary-background border-solid border-8 border-transparent rounded-md"
        :class="getAnswerStyle(option)"
        @click="handleAnswer(option)"
        :disabled="hasAnswered"
      >
        {{ option }}
      </VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage, useTimeoutFn } from '@vueuse/core'
import { shuffle } from 'lodash'
import { common } from '@/utils/common'

interface Props {
  content: Trivia | null
  enableScoring: boolean
  resetScore: number
}
const props = defineProps<Props>()

const { getContent } = useLandingContentsStore()

const showOptions = ref(false)
const hasAnswered = ref(false)
const answer = ref('')
const sign = ref<'+' | '-'>('+')
const showPoint = ref(false)

const correct = useStorage('correct', 0)
const wrong = useStorage('wrong', 0)
const points = useStorage('points', 0)

const { decodeText } = common()
const { start: startHidePoint } = useTimeoutFn(() => (showPoint.value = false), 2000)

const point = computed(() => {
  switch (props.content?.difficulty) {
    case 'easy':
      return 1
    case 'medium':
      return 2
    case 'hard':
      return 3
    default:
      return 1
  }
})

const percent = computed(() => {
  if (correct.value === 0 && wrong.value === 0) return '0'
  return ((correct.value / (correct.value + wrong.value)) * 100).toFixed(1)
})

const question = computed(() => {
  return props.content ? decodeText(props.content.question) || '' : ''
})

const options = computed(() => {
  if (!Array.isArray(props.content?.incorrectAnswers)) return []
  return shuffle([...props.content?.incorrectAnswers, props.content?.correctAnswer])
})

const getAnswerStyle = (option: string) => {
  const correctAnswer = props.content?.correctAnswer
  if (hasAnswered.value) {
    if (option === answer.value && answer.value === correctAnswer) return '!bg-primary'
    else if (option === answer.value && answer.value !== correctAnswer) return '!bg-danger'
    else if (option !== answer.value && option === correctAnswer) return '!border-primary'
    else return ''
  }
  return ''
}

const handleAnswer = (option: string) => {
  answer.value = option
  hasAnswered.value = true
  if (answer.value === props.content?.correctAnswer) {
    correct.value++
    points.value += point.value
    sign.value = '+'
  } else {
    wrong.value++
    points.value -= point.value
    sign.value = '-'
  }
  showPoint.value = true
  startHidePoint()
}

const handleNextQuestion = () => {
  showOptions.value = false
  hasAnswered.value = false
  getContent()
}

watch(
  () => props.resetScore,
  () => {
    correct.value = 0
    wrong.value = 0
    points.value = 0
  }
)
</script>
