// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    autoImport: true
  },
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
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
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
