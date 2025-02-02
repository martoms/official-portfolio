import { colors } from './colors'

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
  // background
  '.gradient-x-center': {
    backgroundImage: `linear-gradient(to left, rgba(0,0,0,0), ${colors.primary.DEFAULT}, rgba(0,0,0,0))`
  },
  // transition
  '.transition-smooth': {
    transition: 'all 1s ease-in-out'
  },
  // scrollbar
  '.no-scrollbar': {
    '-ms-overflow-style': 'none', // IE and Edge
    'scrollbar-width': 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none' // Chrome, Safari, and Opera
    }
  },
  // texts
  '.text-shadow': {
    textShadow: `0px 0px 5px rgba(0, 0, 0, 0.5)`
  },
  '.text-shadow-blue': {
    textShadow: `0px 0px 10px ${colors.primary.DEFAULT}`
  }
}
