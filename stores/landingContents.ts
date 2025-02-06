import { defineStore } from 'pinia'
import { useValidateFetch } from '@/composables/useValidateFetch'
import { codeAlert } from '@/utils/alerts'
import { LandingContentSchema } from '@/schemas/landingContents'

export const useLandingContentsStore = defineStore('landingContents', () => {
  const contentType = ref<'quotes' | 'jokes' | 'trivia'>('quotes')
  const isPending = ref(false)
  const content = ref<LandingContent | null>(null)

  const attribution = computed(() => {
    switch (contentType.value) {
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

  const getContent = async () => {
    isPending.value = true
    content.value = null

    const { data, code } = await useValidateFetch(`/api/${contentType.value}`)

    if (errorCodes.includes(code)) codeAlert(code)
    else if (code === 'API_PARSE_ERROR') codeAlert(code, attribution.value.name)

    try {
      content.value = LandingContentSchema.parse(data)
    } catch {
      alert(
        `There seems to be a problem fetching data from ${attribution.value.name}. Please try other options.`
      )
    } finally {
      isPending.value = false
    }
  }

  return {
    contentType,
    attribution,
    isPending,
    content,
    getContent
  }
})
