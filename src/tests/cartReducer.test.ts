import { describe, expect, it } from 'vitest'
import {
  addItem,
  clearCart,
  confirmOrder,
  decrementItem,
  incrementItem,
  removeItem,
} from '../reducers/cartActions'
import { cartReducer, initialCartState, type CartState } from '../reducers/cartReducer'
import type { Order } from '../types/order'

const stateWith = (items: CartState['items']): CartState => ({ ...initialCartState, items })

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

describe('cartReducer', () => {
  it('UT-01: adds a new item to an empty cart', () => {
    const state = cartReducer(initialCartState, addItem('latte', 2))
    expect(state.items).toEqual([{ coffeeId: 'latte', quantity: 2 }])
  })

  it('UT-02: adding the same coffee sums the quantity without duplicating lines', () => {
    const first = cartReducer(initialCartState, addItem('latte', 2))
    const second = cartReducer(first, addItem('latte', 1))
    expect(second.items).toEqual([{ coffeeId: 'latte', quantity: 3 }])
  })

  it('UT-03: ignores zero, negative and decimal quantities', () => {
    expect(cartReducer(initialCartState, addItem('latte', 0))).toBe(initialCartState)
    expect(cartReducer(initialCartState, addItem('latte', -1))).toBe(initialCartState)
    expect(cartReducer(initialCartState, addItem('latte', 1.5))).toBe(initialCartState)
  })

  it('UT-04: increments and decrements, but never below 1', () => {
    const start = stateWith([{ coffeeId: 'latte', quantity: 1 }])
    const incremented = cartReducer(start, incrementItem('latte'))
    expect(incremented.items[0].quantity).toBe(2)

    const decremented = cartReducer(incremented, decrementItem('latte'))
    expect(decremented.items[0].quantity).toBe(1)

    const stillOne = cartReducer(decremented, decrementItem('latte'))
    expect(stillOne.items[0].quantity).toBe(1)
  })

  it('UT-05: removes, clears and confirms without mutating the previous state', () => {
    const start = stateWith([
      { coffeeId: 'latte', quantity: 2 },
      { coffeeId: 'cubano', quantity: 1 },
    ])
    const snapshot = structuredClone(start)

    const removed = cartReducer(start, removeItem('latte'))
    expect(removed.items).toEqual([{ coffeeId: 'cubano', quantity: 1 }])

    const cleared = cartReducer(start, clearCart())
    expect(cleared.items).toEqual([])

    const confirmed = cartReducer(start, confirmOrder(order))
    expect(confirmed).toEqual({ items: [], confirmedOrder: order })

    // o estado original continua igual: nenhuma ação alterou o objeto recebido
    expect(start).toEqual(snapshot)
  })
})
