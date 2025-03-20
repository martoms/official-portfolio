/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import { colors } from './assets/styles/themes/colors'
import { textColor } from './assets/styles/themes/textColor'
import { fontSize } from './assets/styles/themes/fontSize'
import { keyframes } from './assets/styles/themes/keyframes'
import { animation } from './assets/styles/themes/animation'

import { components } from './assets/styles/plugins/components'
import { utilities } from './assets/styles/plugins/utilities'

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
      },
      height: {
        'landing-xl': '70vh'
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
