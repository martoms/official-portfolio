import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useLandingContentsStore = defineStore('landingContents', () => {
  const _contentMode = useStorage<'quotes' | 'jokes' | 'trivia'>('contentMode', 'quotes')
  const _content = ref<LandingContent | Trivia | null>(null)
  const _isPending = ref(false)

  const contentMode = computed(() => _contentMode.value)
  const content = computed(() => _content.value)
  const isPending = computed(() => _isPending.value)

  const attribution = computed(() => {
    switch (_contentMode.value) {
      case 'quotes':
        return {
          text: 'Inspirational quotes provided by ',
          name: 'ZenQuotes API',
          link: 'https://zenquotes.io/'
        }
      case 'jokes':
        return {
          text: 'Jokes provided by ',
          name: 'JokeAPI',
          link: 'https://v2.jokeapi.dev/'
        }
      case 'trivia':
        return {
          text: 'Trivia questions provided by ',
          name: 'Open Trivia Database',
          link: 'https://opentdb.com/'
        }
    }
  })

  const setContent = (newContent: LandingContent | Trivia | null) => {
    _content.value = newContent
  }

  const setContentMode = (newContentMode: 'quotes' | 'jokes' | 'trivia') => {
    _contentMode.value = newContentMode
  }

  const setIsPending = (value: boolean) => (_isPending.value = value)

  return {
    contentMode,
    attribution,
    content,
    isPending,
    setContent,
    setContentMode,
    setIsPending
  }
})
