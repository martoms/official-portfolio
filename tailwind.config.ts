/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import { components } from './assets/styles/components'
import { colors } from './assets/styles/colors'
import { textColor } from './assets/styles/textColor'
import { fontSize } from './assets/styles/fontSize'
import { keyframes } from './assets/styles/keyframes'
import { animation } from './assets/styles/animation'

import { utilities } from './assets/styles/utilities'

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
      colors,
      textColor,
      fontSize,
      keyframes,
      animation,
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, addUtilities }) {
      addComponents(components)
      addUtilities(utilities)
    })
  ]
}
