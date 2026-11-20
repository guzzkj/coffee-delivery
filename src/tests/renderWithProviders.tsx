import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../styles/themes/light'

// Renderiza com os mesmos providers do main.tsx, numa rota inicial
export function renderWithProviders(ui: ReactElement, { route = '/' } = {}) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </ThemeProvider>,
  )
}
