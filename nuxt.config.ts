// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/marjohn.ico' }]
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/styles/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  nitro: {
    plugins: ['@/server/plugins/mongodb.ts']
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    quotesUri: process.env.QUOTES_URI,
    jokesUri: process.env.JOKES_URI,
    triviaUri: process.env.TRIVIA_URI,
    public: {
      triviaUriRequestToken: process.env.TRIVIA_URI_REQUEST_TOKEN
    }
  },
  mongoose: {
    modelsDir: 'models',
    devtools: true
  },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', 'nuxt-mongoose']
})
