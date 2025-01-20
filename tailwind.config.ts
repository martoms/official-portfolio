/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import { components } from './assets/styles/components'

export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents(components)
    })
  ]
}
