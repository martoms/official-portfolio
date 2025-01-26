import { colors } from './colors'

export const components = {
  '.landing': {
    backgroundImage: `linear-gradient(to bottom, ${colors.blue.light} 0%, ${colors.white.DEFAULT} 100%)`
  },
  '.dev-bg': {
    backgroundImage: 'url("/images/dev-bg.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left -350px bottom',
    backgroundSize: 'cover',
    mixBlendMode: 'color-dodge'
  },
  '.designer-bg': {
    backgroundImage: 'url("/images/designer-bg.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left -350px bottom',
    backgroundSize: 'cover',
    mixBlendMode: 'overlay'
  }
}
