import { colors } from './colors'
import { utilities } from './utilities'

export const components = {
  '.landing': {
    backgroundImage: `linear-gradient(to bottom, ${colors.blue.light} 0%, ${colors.white.DEFAULT} 100%)`
  },
  '.dev-bg': {
    backgroundImage: 'url("/images/dev-bg.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left bottom',
    backgroundSize: 'cover',
    mixBlendMode: 'color-dodge'
  },
  '.designer-bg': {
    backgroundImage: 'url("/images/designer-bg.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left bottom',
    backgroundSize: 'cover',
    mixBlendMode: 'overlay'
  },
  '.nav-item': {
    position: 'relative',
    zIndex: '10',
    color: colors.white.DEFAULT,
    cursor: 'pointer',
    textShadow: utilities['.text-shadow-blue']
  }
}
