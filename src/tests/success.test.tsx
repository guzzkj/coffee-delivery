import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'
import type { Order } from '../types/order'
import { STORAGE_KEYS } from '../utils/storage'
import { renderWithProviders } from './renderWithProviders'

const order: Order = {
  id: 'order-1',
  items: [{ coffeeId: 'latte', name: 'Latte', priceInCents: 990, quantity: 2 }],
  address: {
    cep: '90250-440',
    street: 'Rua João Daniel Martinelli',
    number: '102',
    neighborhood: 'Farrapos',
    city: 'Porto Alegre',
    state: 'RS',
  },
  paymentMethod: 'credit',
  subtotalInCents: 1980,
  deliveryFeeInCents: 350,
  totalInCents: 2330,
  createdAt: '2026-11-20T12:00:00.000Z',
}

describe('Success page (RF-12, RF-13)', () => {
  it('IT-04: shows address, delivery estimate and payment from the saved order, even with an empty cart', () => {
    localStorage.setItem(STORAGE_KEYS.lastOrder, JSON.stringify(order))
    renderWithProviders(<App />, { route: '/success' })

    expect(screen.getByRole('heading', { name: 'Uhu! Pedido confirmado' })).toBeInTheDocument()
    expect(screen.getByText('Rua João Daniel Martinelli, 102')).toBeInTheDocument()
    expect(screen.getByText(/Farrapos - Porto Alegre, RS/)).toBeInTheDocument()
    expect(screen.getByText('20 min - 30 min')).toBeInTheDocument()
    expect(screen.getByText('Cartão de Crédito')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver carrinho, vazio' })).toBeInTheDocument()
  })
})
