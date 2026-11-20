import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { STORAGE_KEYS } from '../utils/storage'
import { renderWithProviders } from './renderWithProviders'

// O espaço do Intl entre "R$" e o número é não separável
const money = (text: string) => new RegExp(text.replace('R$ ', 'R\\$\\s'))

function seedCart() {
  localStorage.setItem(
    STORAGE_KEYS.cart,
    JSON.stringify([
      { coffeeId: 'expresso-tradicional', quantity: 2 },
      { coffeeId: 'latte', quantity: 1 },
    ]),
  )
}

describe('Checkout cart (RF-05, RF-10)', () => {
  it('lists the selected coffees with the Figma totals', () => {
    seedCart()
    renderWithProviders(<App />, { route: '/checkout' })

    expect(screen.getByRole('heading', { name: 'Expresso Tradicional', level: 3 })).toBeInTheDocument()
    expect(screen.getByText(money('R$ 29,70'))).toBeInTheDocument()
    expect(screen.getByText(money('R$ 3,50'))).toBeInTheDocument()
    expect(screen.getByText(money('R$ 33,20'))).toBeInTheDocument()
  })

  it('updates totals and header badge when changing or removing items', async () => {
    const user = userEvent.setup()
    seedCart()
    renderWithProviders(<App />, { route: '/checkout' })

    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    expect(screen.getByText(money('R$ 39,60'))).toBeInTheDocument() // 4 × 9,90
    expect(screen.getByRole('link', { name: 'Ver carrinho, 4 itens' })).toBeInTheDocument()

    const tradicional = screen.getByRole('heading', { name: 'Expresso Tradicional', level: 3 }).closest('li')!
    await user.click(within(tradicional).getByRole('button', { name: /Diminuir/ }))
    expect(within(tradicional).getByRole('button', { name: /Diminuir/ })).toBeDisabled() // trava em 1

    await user.click(screen.getByRole('button', { name: 'Remover Expresso Tradicional do carrinho' }))
    expect(screen.queryByRole('heading', { name: 'Expresso Tradicional', level: 3 })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver carrinho, 2 itens' })).toBeInTheDocument()
  })
})
