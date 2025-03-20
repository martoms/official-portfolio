import { colors } from './colors'
import color from 'tailwindcss/colors'

export const textColor = {
  primary: {
    DEFAULT: colors.secondary.DEFAULT,
    foreground: colors.primary.DEFAULT
  },
  secondary: {
    DEFAULT: color.slate[400]
  }
}
