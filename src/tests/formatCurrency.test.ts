import { describe, expect, it } from 'vitest'
import { formatCurrency, formatPrice } from '../utils/formatCurrency'

// O Intl usa espaço não separável entre "R$" e o número
const normalize = (text: string) => text.replace(/\s/g, ' ')

describe('formatCurrency (UT-07)', () => {
  it('formats cents as BRL', () => {
    expect(normalize(formatCurrency(990))).toBe('R$ 9,90')
    expect(normalize(formatCurrency(3320))).toBe('R$ 33,20')
    expect(normalize(formatCurrency(0))).toBe('R$ 0,00')
  })

  it('formats thousands with a dot separator', () => {
    expect(normalize(formatCurrency(123456))).toBe('R$ 1.234,56')
  })

  it('formats only the number for the card price', () => {
    expect(formatPrice(990)).toBe('9,90')
  })
})
