import type { Order } from '../types/order'

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffeeId: string; quantity: number } }
  | { type: 'INCREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'DECREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CONFIRM_ORDER'; payload: { order: Order } }
  | { type: 'CLEAR_CART' }

// Funções que criam as ações: evitam erro de digitação no campo type
export const addItem = (coffeeId: string, quantity: number): CartAction => ({
  type: 'ADD_ITEM',
  payload: { coffeeId, quantity },
})

export const incrementItem = (coffeeId: string): CartAction => ({
  type: 'INCREMENT_ITEM',
  payload: { coffeeId },
})

export const decrementItem = (coffeeId: string): CartAction => ({
  type: 'DECREMENT_ITEM',
  payload: { coffeeId },
})

export const removeItem = (coffeeId: string): CartAction => ({
  type: 'REMOVE_ITEM',
  payload: { coffeeId },
})

export const confirmOrder = (order: Order): CartAction => ({
  type: 'CONFIRM_ORDER',
  payload: { order },
})

export const clearCart = (): CartAction => ({ type: 'CLEAR_CART' })
