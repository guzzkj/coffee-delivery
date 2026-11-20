import type { CartItemDetailed } from '../types/cart'

// D-04 / RN-03: taxa de entrega fixa, definida só aqui (R$ 3,50 em centavos)
export const DELIVERY_FEE_IN_CENTS = 350

// Σ (preço unitário × quantidade), tudo em centavos inteiros (RN-04)
export function calculateSubtotal(items: CartItemDetailed[]): number {
  return items.reduce((subtotal, item) => subtotal + item.coffee.priceInCents * item.quantity, 0)
}

export function calculateTotal(subtotalInCents: number, deliveryFeeInCents = DELIVERY_FEE_IN_CENTS): number {
  return subtotalInCents + deliveryFeeInCents
}
