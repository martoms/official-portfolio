/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import { components } from './assets/styles/components'
import { mycolors } from './assets/styles/colors'

export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: mycolors
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents(components)
    })
  ]
}
