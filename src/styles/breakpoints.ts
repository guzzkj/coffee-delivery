// Breakpoints em rem (1rem = 16px) usados nos media queries dos componentes.
// Desktop é o layout base do Figma; abaixo de cada largura o layout se adapta.
export const breakpoints = {
  laptop: '64rem', // 1024px
  tablet: '48rem', // 768px
  mobile: '30rem', // 480px
}

export const media = {
  laptop: `@media (max-width: ${breakpoints.laptop})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  mobile: `@media (max-width: ${breakpoints.mobile})`,
}
