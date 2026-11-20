import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1rem;
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.2s, color 0.2s;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    color: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.purple};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition: none !important;
      animation: none !important;
    }
  }
`
