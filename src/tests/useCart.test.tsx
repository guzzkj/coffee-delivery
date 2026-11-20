import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useCart } from '../hooks/useCart'

describe('useCart', () => {
  it('throws a clear error when used outside CartProvider', () => {
    // o React registra o erro no console; silenciamos só neste teste
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useCart())).toThrow('useCart precisa ser usado dentro de <CartProvider>')

    consoleError.mockRestore()
  })
})
