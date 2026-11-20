import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { renderWithProviders } from './renderWithProviders'

describe('Accessibility (RNF a11y)', () => {
  it('offers a skip link as the first focusable element', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    await user.tab()
    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveFocus()
    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute('href', '#main-content')
  })

  it('announces when a coffee is added to the cart', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    await user.click(screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }))

    expect(screen.getByText('2 Latte adicionado ao carrinho')).toBeInTheDocument()
  })

  it('updates the page title and moves focus to the content on navigation', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)
    expect(document.title).toBe('Coffee Delivery')

    await user.click(screen.getByRole('link', { name: 'Ver carrinho, vazio' }))

    expect(document.title).toBe('Finalizar pedido | Coffee Delivery')
    expect(screen.getByRole('main')).toHaveFocus()
  })
})
