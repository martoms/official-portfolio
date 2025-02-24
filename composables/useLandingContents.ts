import { useRuntimeConfig } from '#app'
import { useStorage, useTimeoutFn, useDebounceFn } from '@vueuse/core'
import { useValidateFetch } from '@/composables/useValidateFetch'
import { codeAlert } from '@/utils/alerts'
import {
  LandingContentSchema,
  TriviaRequestTokenSchema,
  TriviaListSchema
} from '@/schemas/landingContents'

export const useLandingContents = () => {
  const landingContents = useLandingContentsStore()
  const { contentMode, attribution } = storeToRefs(landingContents)

  const triviaList = ref<Array<Trivia>>([])

  const triviaUriRequestToken = useRuntimeConfig().public.triviaUriRequestToken
  const triviaToken = useStorage<string>('triviaToken', '')
  const lastTriviaFetched = useStorage<number>('lastTriviaFetched', 0)
  const timeDiff = ref(0)

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

  const { start: startNextTrivia } = useTimeoutFn(
    () => {
      landingContents.setContent(triviaList.value.pop() as Trivia)
    },
    1000,
    { immediate: false }
  )

  const getContent = () => {
    landingContents.setIsPending(true)
    landingContents.setContent(null)
    contentMode.value !== 'trivia' ? fetchContent() : getTrivia()
  }

  async function fetchContent(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' = 'GET',
    headerOption?: Record<string, string>
  ) {
    landingContents.setIsPending(true)

    const { data, code } = await useValidateFetch(`/api/${contentMode.value}`, undefined, {
      method,
      headerOption
    })

    if (code === 'TOKEN_EXPIRED') {
      const { responseCode } = await getTriviaToken()
      responseCode === 0 && fetchContent()
    }

    if (errorCodes.includes(code)) codeAlert(code)
    else if (code === 'API_PARSE_ERROR') codeAlert(code, attribution.value.name)

    try {
      if (contentMode.value !== 'trivia') {
        landingContents.setContent(LandingContentSchema.parse(data))
      } else {
        triviaList.value = TriviaListSchema.parse(data)
        lastTriviaFetched.value = Date.now()
        getTriviaFromList()
      }
    } catch {
      codeAlert(
        `There seems to be a problem fetching data from ${attribution.value.name}. Please try other options.`
      )
    } finally {
      landingContents.setIsPending(false)
    }
  }

  async function getTrivia() {
    if (triviaList.value.length > 0) getTriviaFromList()
    else if (!triviaToken.value) {
      await getTriviaToken()
      debounceTrivia()
    } else {
      timeDiff.value = Date.now() - lastTriviaFetched.value
      if (timeDiff.value > 1000 * 60 * 60 * 6) await getTriviaToken()
      else if (timeDiff.value > 5000) startWaiting()
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

  function getTriviaFromList() {
    landingContents.setContent(null)
    startNextTrivia()
  }

  return { getContent }
}
