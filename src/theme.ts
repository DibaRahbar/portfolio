// Brand palette. Components that draw to canvas or take color props
// (DotGrid, Dock, SpotlightCard) need raw hex values, so they read from here.
// CSS tokens with the same values live in index.css.
export const colors = {
  primary: '#541790',
  secondary: '#FEF9CE',
  tertiary: '#8264A0',
  white: '#FFFFFF',
  // Light tint of the tertiary purple for resting dots on the background.
  dot: '#D9D0E3',
} as const
