import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { coffees } from '../data/coffees'
import { createOrder } from '../utils/createOrder'
import { STORAGE_KEYS } from '../utils/storage'
import { renderWithProviders } from './renderWithProviders'

const address = {
  cep: '90250-440',
  street: 'Rua João Daniel Martinelli',
  number: '102',
  complement: '',
  neighborhood: 'Farrapos',
  city: 'Porto Alegre',
  state: 'rs',
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('createOrder', () => {
  it('builds an independent snapshot with totals in cents', () => {
    const latte = coffees.find((coffee) => coffee.id === 'latte')!
    const order = createOrder({
      items: [{ coffeeId: 'latte', quantity: 3, coffee: latte }],
      data: { ...address, paymentMethod: 'money' },
      id: 'order-1',
      createdAt: '2026-11-20T12:00:00.000Z',
    })

    expect(order).toEqual({
      id: 'order-1',
      createdAt: '2026-11-20T12:00:00.000Z',
      items: [{ coffeeId: 'latte', name: 'Latte', priceInCents: 990, quantity: 3 }],
      address: { ...address, state: 'RS', complement: undefined },
      paymentMethod: 'money',
      subtotalInCents: 2970,
      deliveryFeeInCents: 350,
      totalInCents: 3320,
    })
  })
})

describe('Confirm order (RF-11, RF-12, RF-13)', () => {
  it('confirms a valid order, clears the cart and keeps the order snapshot', async () => {
    const user = userEvent.setup()
    // o CEP digitado dispara a ViaCEP: respondemos com "não encontrado" para preencher à mão
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ erro: true }), { status: 200, headers: { 'Content-Type': 'application/json' } }),
    )
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify([{ coffeeId: 'latte', quantity: 2 }]))
    renderWithProviders(<App />, { route: '/checkout' })

    await user.type(screen.getByLabelText('CEP'), address.cep)
    await user.type(screen.getByLabelText('Rua'), address.street)
    await user.type(screen.getByLabelText('Número'), address.number)
    await user.type(screen.getByLabelText('Bairro'), address.neighborhood)
    await user.type(screen.getByLabelText('Cidade'), address.city)
    await user.type(screen.getByLabelText('UF'), 'RS')
    await user.click(screen.getByRole('radio', { name: 'Cartão de Crédito' }))
    await user.click(screen.getByRole('button', { name: /Confirmar pedido/i }))

    expect(await screen.findByRole('heading', { name: /Pedido confirmado/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver carrinho, vazio' })).toBeInTheDocument()

    const savedOrder = JSON.parse(localStorage.getItem(STORAGE_KEYS.lastOrder)!)
    expect(savedOrder).toMatchObject({ paymentMethod: 'credit', totalInCents: 2330 })
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)!)).toEqual([])
  })

  it('does not leave the checkout while the form is invalid', async () => {
    const user = userEvent.setup()
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify([{ coffeeId: 'latte', quantity: 2 }]))
    renderWithProviders(<App />, { route: '/checkout' })

    await user.click(screen.getByRole('radio', { name: 'Dinheiro' }))
    await user.click(screen.getByRole('button', { name: /Confirmar pedido/i }))

    expect(screen.getByRole('heading', { name: 'Complete seu pedido' })).toBeInTheDocument()
    expect(localStorage.getItem(STORAGE_KEYS.lastOrder)).toBeNull()
  })
})
