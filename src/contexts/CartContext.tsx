import { useReducer, type ReactNode } from 'react'
import { coffees } from '../data/coffees'
import {
  addItem as addItemAction,
  clearCart as clearCartAction,
  decrementItem as decrementItemAction,
  incrementItem as incrementItemAction,
  removeItem as removeItemAction,
} from '../reducers/cartActions'
import { cartReducer, initialCartState } from '../reducers/cartReducer'
import { calculateSubtotal, calculateTotal, DELIVERY_FEE_IN_CENTS } from '../utils/cartCalculations'
import { CartContext, type CartContextValue } from './CartContextValue'

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  // Valores derivados na renderização (não ficam em state):
  // junta cada item com o café do catálogo e descarta ids inexistentes (RN-10)
  const items = state.items.flatMap((item) => {
    const coffee = coffees.find((coffee) => coffee.id === item.coffeeId)
    return coffee ? [{ ...item, coffee }] : []
  })

  // RF-04: soma das unidades, não a quantidade de tipos de café
  const totalUnits = items.reduce((total, item) => total + item.quantity, 0)

  // RF-10: valores financeiros também são derivados, nunca guardados em state
  const subtotalInCents = calculateSubtotal(items)
  const totalInCents = calculateTotal(subtotalInCents)

  const value: CartContextValue = {
    items,
    totalUnits,
    subtotalInCents,
    deliveryFeeInCents: DELIVERY_FEE_IN_CENTS,
    totalInCents,
    confirmedOrder: state.confirmedOrder,
    addItem: (coffeeId, quantity) => dispatch(addItemAction(coffeeId, quantity)),
    incrementItem: (coffeeId) => dispatch(incrementItemAction(coffeeId)),
    decrementItem: (coffeeId) => dispatch(decrementItemAction(coffeeId)),
    removeItem: (coffeeId) => dispatch(removeItemAction(coffeeId)),
    clearCart: () => dispatch(clearCartAction()),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
