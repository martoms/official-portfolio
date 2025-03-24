import defaultTheme from 'tailwindcss/defaultTheme'
import { colors } from '../themes/colors'
import { fontSize } from '../themes/fontSize'
import color from 'tailwindcss/colors'
import { pad } from 'lodash-es'

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
  },
  '.modal-container': {
    backgroundColor: colors.primary.background,
    padding: pad(defaultTheme.spacing[5]),
    borderRadius: defaultTheme.borderRadius.md,
    boxShadow: defaultTheme.boxShadow.md
  },
  '.form-title': {
    color: colors.primary.DEFAULT,
    fontWeight: defaultTheme.fontWeight.semibold,
    fontSize: fontSize.lg[0],
    lineHeight: fontSize.lg[1],
    textAlign: 'center',
    marginBottom: defaultTheme.spacing[5]
  }
}
