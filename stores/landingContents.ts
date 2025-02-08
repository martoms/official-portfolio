import { useRuntimeConfig } from '#app'
import { useStorage, useTimeoutFn, useDebounceFn } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useValidateFetch } from '@/composables/useValidateFetch'
import { codeAlert } from '@/utils/alerts'
import { LandingContentSchema, TriviaRequestTokenSchema } from '@/schemas/landingContents'

export const useLandingContentsStore = defineStore('landingContents', () => {
  const contentMode = useStorage<'quotes' | 'jokes' | 'trivia'>('contentMode', 'quotes')
  const isPending = ref(false)
  const content = ref<LandingContent | null>(null)

  const triviaUriRequestToken = useRuntimeConfig().public.triviaUriRequestToken
  const TRIVIA_TOKEN = useStorage<string>('TRIVIA_TOKEN', '')
  const LAST_TRIVIA_FETCHED = useStorage<number>('LAST_TRIVIA_FETCHED', 0)
  const timeDiff = ref(0)

  const attribution = computed(() => {
    switch (contentMode.value) {
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

  const errorCodes = ['QUOTE_NOT_FOUND', 'API_FETCH_ERROR']

  const debounceTrivia = useDebounceFn(() => fetchTrivia(), 5000)

  const { start: startWaiting } = useTimeoutFn(
    () => {
      ;() => debounceTrivia()
    },
    5000 - timeDiff.value,
    { immediate: false }
  )

  const getContent = () => {
    isPending.value = true
    content.value = null

    contentMode.value !== 'trivia' ? fetchContent() : getTrivia()
  }

  async function fetchContent(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' = 'GET',
    headerOption?: Record<string, string>
  ) {
    const { data, code } = await useValidateFetch(`/api/${contentMode.value}`, method, headerOption)

    if (errorCodes.includes(code)) codeAlert(code)
    else if (code === 'API_PARSE_ERROR') codeAlert(code, attribution.value.name)

    try {
      content.value = LandingContentSchema.parse(data)
    } catch {
      codeAlert(
        `There seems to be a problem fetching data from ${attribution.value.name}. Please try other options.`
      )
    } finally {
      isPending.value = false
    }
  }

  async function getTrivia() {
    if (!TRIVIA_TOKEN.value) {
      const tokenRes = await $fetch(triviaUriRequestToken)
      const { responseCode, token } = TriviaRequestTokenSchema.parse(tokenRes)

      TRIVIA_TOKEN.value = token

      if (responseCode !== 0) codeAlert('TRIVIA_FETCH_ERROR', attribution.value.name)

      if (!LAST_TRIVIA_FETCHED.value) debounceTrivia()
      else {
        timeDiff.value = Date.now() - LAST_TRIVIA_FETCHED.value
        if (timeDiff.value < 5000) startWaiting()
        else debounceTrivia()
      }
    } else debounceTrivia()
  }

  function fetchTrivia() {
    LAST_TRIVIA_FETCHED.value = Date.now()
    fetchContent('GET', { triviaToken: TRIVIA_TOKEN.value })
  }

  return {
    contentMode,
    attribution,
    isPending,
    content,
    getContent
  }
})
