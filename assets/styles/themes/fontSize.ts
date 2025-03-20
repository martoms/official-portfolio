export const fontSize = {
  // The initial size is set as 8px / 16px = 0.5rem for the 'xs' size.
  // Subsequent sizes are calculated by incrementing the pixel value
  // (e.g., 8px, 12px, 16px, 20px, 24px, 28px) and dividing by the root font size (16px).
  // Line height is consistently set to 1.5x the font size for uniform spacing.
  xs: ['0.5rem', '0.75rem'],
  sm: ['0.75rem', '1.125rem'],
  base: ['1rem', '1.5rem'],
  lg: ['1.25rem', '1.875rem'],
  xl: ['1.5rem', '2.25rem'],
  '2xl': ['1.75rem', '2.625rem'],
  '3xl': ['2rem', '2.875rem'],
  '4xl': ['2.5rem', '3.5rem'],
  '5xl': ['3rem', '4rem'],
  '6xl': ['3.5rem', '4.5rem'],
  '7xl': ['4rem', '5rem'],
  '8xl': ['4.5rem', '6rem'],
  '9xl': ['5rem', '7rem']
}
