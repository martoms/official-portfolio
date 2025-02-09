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
  const triviaToken = useStorage<string>('triviaToken', '')
  const lastTriviaFetched = useStorage<number>('lastTriviaFetched', 0)
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

  const debounceTrivia = useDebounceFn(
    () => fetchContent('GET', { triviaToken: triviaToken.value }),
    5000
  )

  const { start: startWaiting } = useTimeoutFn(
    () => {
      ;() => debounceTrivia()
    },
    timeDiff,
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
    isPending.value = true

    const { data, code } = await useValidateFetch(`/api/${contentMode.value}`, method, headerOption)

    if (code === 'TOKEN_EXPIRED') {
      const { responseCode } = await getTriviaToken()
      responseCode === 0 && fetchContent()
    }

    if (errorCodes.includes(code)) codeAlert(code)
    else if (code === 'API_PARSE_ERROR') codeAlert(code, attribution.value.name)

    try {
      content.value = LandingContentSchema.parse(data)
      lastTriviaFetched.value = Date.now()
    } catch {
      codeAlert(
        `There seems to be a problem fetching data from ${attribution.value.name}. Please try other options.`
      )
    } finally {
      isPending.value = false
    }
  }

  async function getTrivia() {
    if (!triviaToken.value) {
      await getTriviaToken()
      timeDiff.value = Date.now() - lastTriviaFetched.value
      if (timeDiff.value > 5000) startWaiting()
      else debounceTrivia()
    } else {
      timeDiff.value = Date.now() - lastTriviaFetched.value
      if (timeDiff.value > 1000 * 60 * 60 * 6) {
      }
      debounceTrivia()
    }
  }

  async function getTriviaToken() {
    const tokenRes = await $fetch(triviaUriRequestToken)
    const { responseCode, token } = TriviaRequestTokenSchema.parse(tokenRes)
    triviaToken.value = token
    if (responseCode !== 0) codeAlert('TRIVIA_FETCH_ERROR', attribution.value.name)
    return { responseCode }
  }

  return {
    contentMode,
    attribution,
    isPending,
    content,
    getContent
  }
})
