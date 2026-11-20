import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CoffeeCard } from '../components/CoffeeCard'
import { coffees } from '../data/coffees'
import { useCart } from '../hooks/useCart'
import { renderWithProviders } from './renderWithProviders'

// Componente auxiliar que mostra o estado do carrinho como texto
function CartProbe() {
  const { items } = useCart()
  return <output>{items.map((item) => `${item.coffeeId}:${item.quantity}`).join(',')}</output>
}

describe('Add coffee to cart (RF-03, RN-02)', () => {
  it('adds the chosen quantity, resets the selector and sums repeated coffees', async () => {
    const user = userEvent.setup()
    const latte = coffees.find((coffee) => coffee.id === 'latte')!

    renderWithProviders(
      <>
        <CoffeeCard coffee={latte} />
        <CartProbe />
      </>,
    )

    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    await user.click(screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }))

    expect(screen.getByRole('status')).toHaveTextContent('latte:2')
    expect(screen.getByLabelText('Quantidade de Latte: 1')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }))
    expect(screen.getByRole('status')).toHaveTextContent('latte:3')
  })
})
