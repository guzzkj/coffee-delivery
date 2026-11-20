import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { STORAGE_KEYS } from '../utils/storage'
import { renderWithProviders } from './renderWithProviders'

describe('Delivery address form (RF-08, RF-11)', () => {
  it('IT-03: shows accessible errors when submitting empty fields', async () => {
    const user = userEvent.setup()
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify([{ coffeeId: 'latte', quantity: 1 }]))
    renderWithProviders(<App />, { route: '/checkout' })

    await user.click(screen.getByRole('button', { name: /Confirmar pedido/i }))

    const cep = screen.getByLabelText('CEP')
    expect(cep).toHaveAttribute('aria-invalid', 'true')
    expect(cep).toHaveAccessibleDescription('Informe um CEP válido com 8 dígitos')
    expect(screen.getByText('Informe o número')).toHaveAttribute('role', 'alert')

    // complemento é opcional: sem erro
    expect(screen.getByLabelText('Complemento (opcional)')).toHaveAttribute('aria-invalid', 'false')

    // continua na página de checkout
    expect(screen.getByRole('heading', { name: 'Complete seu pedido' })).toBeInTheDocument()
  })
})
