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
  },
  rotate: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  dialogue: {
    '0%': {
      transform: 'translate(-50%, -30%)',
      left: '50%'
    },
    '100%': {
      transform: 'translate(-50%, 0)',
      left: '50%'
    }
  },
  points: {
    '0%': {
      transform: 'scale(0) translate(0%, 0%)',
      opacity: 0
    },
    '20%': {
      transform: 'scale(1)'
    },
    '50%': {
      opacity: 1
    },
    '100%': {
      transform: 'scale(1) translate(0%, -150%)'
    }
  }
}
