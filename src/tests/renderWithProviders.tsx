import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router'
import { CartProvider } from '../contexts/CartContext'
import { AppThemeProvider } from '../contexts/ThemeContext'

// Renderiza com os mesmos providers do main.tsx, numa rota inicial
export function renderWithProviders(ui: ReactElement, { route = '/' } = {}) {
  return render(
    <AppThemeProvider>
      <MemoryRouter initialEntries={[route]}>
        <CartProvider>{ui}</CartProvider>
      </MemoryRouter>
    </AppThemeProvider>,
  )
}
