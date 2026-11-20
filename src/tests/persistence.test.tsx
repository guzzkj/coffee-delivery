import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { loadInitialCartState } from '../reducers/loadInitialCartState'
import { STORAGE_KEYS } from '../utils/storage'
import { renderWithProviders } from './renderWithProviders'

describe('loadInitialCartState (UT-10)', () => {
  it('returns an empty cart when nothing is saved', () => {
    expect(loadInitialCartState()).toEqual({ items: [], confirmedOrder: null })
  })

  it('ignores corrupted JSON', () => {
    localStorage.setItem(STORAGE_KEYS.cart, '{not json')
    expect(loadInitialCartState().items).toEqual([])
  })

  it('drops unknown coffees and invalid quantities', () => {
    localStorage.setItem(
      STORAGE_KEYS.cart,
      JSON.stringify([
        { coffeeId: 'latte', quantity: 2 },
        { coffeeId: 'cafe-inexistente', quantity: 1 },
        { coffeeId: 'cubano', quantity: 0 },
        { coffeeId: 'arabe', quantity: 1.5 },
      ]),
    )
    expect(loadInitialCartState().items).toEqual([{ coffeeId: 'latte', quantity: 2 }])
  })
})

describe('Cart persistence (RF-06)', () => {
  it('saves the cart and restores it after a remount (simulating F5)', async () => {
    const user = userEvent.setup()
    const { unmount } = renderWithProviders(<App />)

    await user.click(screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }))
    await user.click(screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }))
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)!)).toEqual([{ coffeeId: 'latte', quantity: 2 }])

    unmount()
    renderWithProviders(<App />)
    expect(screen.getByRole('link', { name: 'Ver carrinho, 2 itens' })).toBeInTheDocument()
  })
})
