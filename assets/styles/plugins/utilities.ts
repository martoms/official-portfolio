import { colors } from '../themes/colors'
import color from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

export const utilities = {
  // display
  '.flex-xy': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  '.flex-y': {
    display: 'flex',
    alignItems: 'center'
  },
  '.flex-x': {
    display: 'flex',
    justifyContent: 'center'
  },
  '.absolute-center-y': {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  '.absolute-center-x': {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  '.absolute-center-xy': {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    top: '50%'
  },
  // background
  '.gradient-x-center': {
    backgroundImage: `linear-gradient(to left, rgba(0,0,0,0), ${colors.primary.DEFAULT}, rgba(0,0,0,0))`
  },
  '.mask-gradient-y': {
    '-webkit-maskImage': 'linear-gradient(black 60%, transparent)',
    maskImage: 'linear-gradient(black 60%, transparent)'
  },
  // border
  '.border-primary': {
    border: `1px solid ${color.slate[200]}`,
    borderRadius: defaultTheme.borderRadius.md
  },
  '.border-primary-y': {
    borderStyle: 'solid',
    borderWidth: '1px 0 1px 0',
    borderColor: color.slate[200]
  },
  '.border-secondary': {
    border: `1px solid ${colors.blue.dark}`,
    borderRadius: defaultTheme.borderRadius.md
  },
  '.border-primary-foreground': {
    border: `1px solid ${colors.primary.DEFAULT}`,
    borderRadius: defaultTheme.borderRadius.md
  },
  '.border-primary-foreground-b': {
    borderStyle: 'solid',
    borderWidth: '0 0 1px 0',
    borderColor: colors.primary.DEFAULT
  },
  '.border-primary-foreground-l': {
    borderStyle: 'solid',
    borderWidth: '0 0 0 1px',
    borderColor: colors.primary.DEFAULT
  },
  '.border-secondary-foreground': {
    border: `1px solid ${colors.secondary.DEFAULT}`,
    borderRadius: defaultTheme.borderRadius.md
  },
  // transition
  '.transition-smooth': {
    transition: 'all 1s ease-in-out'
  },
  '.transition-smooth-300': {
    transition: 'all 0.3s ease-in-out'
  },
  // scrollbar
  '.no-scrollbar': {
    '-ms-overflow-style': 'none', // IE and Edge
    'scrollbar-width': 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none' // Chrome, Safari, and Opera
    }
  },
  // shadows
  '.text-shadow': {
    textShadow: `0px 0px 5px rgba(0, 0, 0, 0.5)`
  },
  '.text-shadow-blue': {
    textShadow: `0px 0px 10px ${colors.primary.DEFAULT}`
  },
  '.drop-shadow-2': {
    filter: 'drop-shadow(2px 10px 5px rgba(57, 57, 57, 0.7))'
  }
}
