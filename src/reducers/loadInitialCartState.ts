import { coffees } from '../data/coffees'
import type { CartItem } from '../types/cart'
import type { Order, PaymentMethod } from '../types/order'
import { readStorage, STORAGE_KEYS } from '../utils/storage'
import type { CartState } from './cartReducer'

const paymentMethods: PaymentMethod[] = ['credit', 'debit', 'money']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

// Um item salvo só é aceito se o café existir no catálogo e a quantidade for válida (RN-10)
function isValidCartItem(value: unknown): value is CartItem {
  return (
    isRecord(value) &&
    typeof value.coffeeId === 'string' &&
    coffees.some((coffee) => coffee.id === value.coffeeId) &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity >= 1
  )
}

function isValidOrder(value: unknown): value is Order {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    Array.isArray(value.items) &&
    isRecord(value.address) &&
    typeof value.address.street === 'string' &&
    typeof value.paymentMethod === 'string' &&
    paymentMethods.includes(value.paymentMethod as PaymentMethod) &&
    typeof value.totalInCents === 'number'
  )
}

// Inicializador "lazy" do useReducer: roda uma vez, ao montar o CartProvider (RF-06)
export function loadInitialCartState(): CartState {
  const savedItems = readStorage(STORAGE_KEYS.cart)
  const savedOrder = readStorage(STORAGE_KEYS.lastOrder)

  const items = Array.isArray(savedItems) ? savedItems.filter(isValidCartItem) : []

  return {
    items,
    confirmedOrder: isValidOrder(savedOrder) ? savedOrder : null,
  }
}
