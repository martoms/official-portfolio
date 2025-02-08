import color from 'tailwindcss/colors'

export const colors = {
  primary: {
    DEFAULT: color.sky[500],
    hover: color.sky[400],
    background: color.slate[50]
  },
  secondary: {
    DEFAULT: color.slate[600],
    hover: color.slate[500]
  },
  blue: {
    light: color.sky[200],
    'light-hover': color.sky[100],
    dark: color.sky[800],
    'dark-hover': color.sky[700]
  },
  white: {
    DEFAULT: color.white
  },
  success: {
    DEFAULT: color.green[500],
    hover: color.green[400]
  },
  danger: {
    DEFAULT: color.red[500],
    hover: color.red[400]
  },
  warning: {
    DEFAULT: color.yellow[500],
    hover: color.yellow[400]
  },
  info: {
    DEFAULT: color.indigo[500],
    hover: color.indigo[400]
  }
}
