import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { renderWithProviders } from './renderWithProviders'

describe('Header cart badge (RF-04)', () => {
  it('IT-01: shows the sum of units, not the number of coffee types', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    expect(screen.getByRole('link', { name: 'Ver carrinho, vazio' })).toBeInTheDocument()

    // 2 Lattes + 1 Latte + 1 Cubano = 4 unidades (2 tipos)
    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    await user.click(screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }))
    await user.click(screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }))
    await user.click(screen.getByRole('button', { name: 'Adicionar Cubano ao carrinho' }))

    const cartLink = screen.getByRole('link', { name: 'Ver carrinho, 4 itens' })
    expect(cartLink).toHaveTextContent('4')
  })
})
