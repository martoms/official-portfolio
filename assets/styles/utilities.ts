import { colors } from './colors'

export const utilities = {
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
  '.gradient-x-center': {
    backgroundImage: `linear-gradient(to left, rgba(0,0,0,0), ${colors.primary.DEFAULT}, rgba(0,0,0,0))`
  },
  '.transition-smooth': {
    transition: 'all 1s ease-in-out'
  },
  '.absolute-center-y': {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  }
}
