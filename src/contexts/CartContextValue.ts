import { createContext } from 'react'
import type { CheckoutFormData } from '../schemas/checkoutSchema'
import type { CartItemDetailed } from '../types/cart'
import type { Order } from '../types/order'

// O objeto do contexto fica separado do Provider para o Fast Refresh do Vite
// funcionar (arquivos .tsx de componente devem exportar só componentes)
export type CartContextValue = {
  items: CartItemDetailed[]
  totalUnits: number
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
  confirmedOrder: Order | null
  addItem: (coffeeId: string, quantity: number) => void
  incrementItem: (coffeeId: string) => void
  decrementItem: (coffeeId: string) => void
  removeItem: (coffeeId: string) => void
  clearCart: () => void
  // Devolve o pedido criado, ou null se não havia itens
  confirmOrder: (data: CheckoutFormData) => Order | null
}

export const CartContext = createContext<CartContextValue | null>(null)
