import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { STORAGE_KEYS } from '../utils/storage'
import { renderWithProviders } from './renderWithProviders'

describe('Payment method selector (RF-09)', () => {
  it('requires a choice and accepts only one option at a time', async () => {
    const user = userEvent.setup()
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify([{ coffeeId: 'latte', quantity: 1 }]))
    renderWithProviders(<App />, { route: '/checkout' })

    await user.click(screen.getByRole('button', { name: /Confirmar pedido/i }))
    expect(screen.getByText('Selecione a forma de pagamento')).toHaveAttribute('role', 'alert')

    const credit = screen.getByRole('radio', { name: 'Cartão de Crédito' })
    const money = screen.getByRole('radio', { name: 'Dinheiro' })

    await user.click(credit)
    expect(credit).toBeChecked()
    expect(screen.queryByText('Selecione a forma de pagamento')).not.toBeInTheDocument()

    await user.click(money)
    expect(money).toBeChecked()
    expect(credit).not.toBeChecked()
  })
})
