import { css } from 'styled-components'

// Escala tipográfica do Style Guide (docs/REF_DESIGN/Tipografia.png)
const heading = (size: number, weight: 700 | 800) => css`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${size / 16}rem;
  font-weight: ${weight};
  line-height: 1.3;
`

const body = (size: number, weight: 400 | 700, lineHeight = 1.3) => css`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${size / 16}rem;
  font-weight: ${weight};
  line-height: ${lineHeight};
`

export const typography = {
  titleXL: heading(48, 800),
  titleL: heading(32, 800),
  titleM: heading(24, 800),
  titleS: heading(20, 700),
  titleXS: heading(18, 700),

  textL: body(20, 400),
  textLBold: body(20, 700),
  textM: body(16, 400),
  textMBold: body(16, 700),
  textS: body(14, 400),
  textXS: body(12, 700),

  tag: css`
    ${body(10, 700)}
    text-transform: uppercase;
  `,
  buttonG: css`
    ${body(14, 700, 1.6)}
    text-transform: uppercase;
  `,
  buttonM: css`
    ${body(12, 400, 1.6)}
    text-transform: uppercase;
  `,
}
