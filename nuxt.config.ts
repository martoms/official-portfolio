// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
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
    mongodbUri: process.env.MONGODB_URI
  },
  mongoose: {
    modelsDir: 'models',
    devtools: true
  },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', 'nuxt-mongoose']
})
