export const keyframes = {
  blink: {
    '0%': { opacity: 1 },
    '50%': { opacity: 0 },
    '100%': { opacity: 1 }
  },
  'fade-in': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 }
  },
  'fade-out': {
    '0%': { opacity: 1 },
    '100%': { opacity: 0 }
  },
  'fly-left': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-70%)' }
  },
  'fly-right': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(70%)' }
  }
}
