import { describe, expect, it } from 'vitest'
import { coffees } from '../data/coffees'
import type { CartItemDetailed } from '../types/cart'
import { calculateSubtotal, calculateTotal, DELIVERY_FEE_IN_CENTS } from '../utils/cartCalculations'

const coffee = (id: string) => coffees.find((item) => item.id === id)!

describe('cartCalculations (UT-06)', () => {
  it('reproduces the Figma example: 2 Tradicional + 1 Latte = 29,70 + 3,50 = 33,20', () => {
    const items: CartItemDetailed[] = [
      { coffeeId: 'expresso-tradicional', quantity: 2, coffee: coffee('expresso-tradicional') },
      { coffeeId: 'latte', quantity: 1, coffee: coffee('latte') },
    ]

    const subtotal = calculateSubtotal(items)

    expect(subtotal).toBe(2970)
    expect(DELIVERY_FEE_IN_CENTS).toBe(350)
    expect(calculateTotal(subtotal)).toBe(3320)
  })

  it('keeps integer cents, avoiding floating point errors', () => {
    const items: CartItemDetailed[] = [
      { coffeeId: 'latte', quantity: 3, coffee: coffee('latte') },
    ]
    // 9.90 * 3 em reais daria 29.700000000000003; em centavos é exato
    expect(calculateSubtotal(items)).toBe(2970)
    expect(Number.isInteger(calculateTotal(calculateSubtotal(items)))).toBe(true)
  })

  it('returns zero subtotal for an empty cart', () => {
    expect(calculateSubtotal([])).toBe(0)
  })
})
