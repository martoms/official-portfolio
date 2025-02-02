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
  },
  callout: {
    '0%': { opacity: 0, transform: 'scale(0) rotate(20deg)' },
    '25%': { transform: 'rotate(-40deg)' },
    '50%': { transform: 'rotate(20deg)' },
    '100%': { opacity: 1, transform: 'scale(1) rotate(0deg)' }
  }
}
