import { colors } from '../themes/colors'
import color from 'tailwindcss/colors'

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
    textShadow: `0px 0px 10px ${colors.primary.DEFAULT}`,
    transformStyle: 'preserve-3d'
  },
  '.image-placeholder': {
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, ${color.neutral[300]} 25%, ${color.neutral[100]} 50%, ${color.neutral[300]} 75%)`,
    backgroundSize: '200% 100%'
  }
}
