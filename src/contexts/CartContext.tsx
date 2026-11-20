import { useEffect, useReducer, type ReactNode } from 'react'
import { coffees } from '../data/coffees'
import {
  addItem as addItemAction,
  clearCart as clearCartAction,
  confirmOrder as confirmOrderAction,
  decrementItem as decrementItemAction,
  incrementItem as incrementItemAction,
  removeItem as removeItemAction,
} from '../reducers/cartActions'
import { cartReducer } from '../reducers/cartReducer'
import { loadInitialCartState } from '../reducers/loadInitialCartState'
import { removeStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'
import { calculateSubtotal, calculateTotal, DELIVERY_FEE_IN_CENTS } from '../utils/cartCalculations'
import { createOrder } from '../utils/createOrder'
import { CartContext, type CartContextValue } from './CartContextValue'

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  // O terceiro argumento carrega o carrinho salvo só na primeira renderização
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialCartState)

  // RF-06: sempre que os itens mudam, salva no localStorage
  useEffect(() => {
    writeStorage(STORAGE_KEYS.cart, state.items)
  }, [state.items])

  // RN-06: o pedido confirmado fica salvo separado, para /success sobreviver ao F5
  useEffect(() => {
    if (state.confirmedOrder) {
      writeStorage(STORAGE_KEYS.lastOrder, state.confirmedOrder)
    } else {
      removeStorage(STORAGE_KEYS.lastOrder)
    }
  }, [state.confirmedOrder])

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
    confirmOrder: (data) => {
      // RN-10: nunca confirma um carrinho vazio
      if (items.length === 0) {
        return null
      }

      // id e data não são "puros", por isso o pedido é montado aqui, fora do reducer
      const order = createOrder({
        items,
        data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      })

      dispatch(confirmOrderAction(order)) // guarda o snapshot e esvazia o carrinho
      return order
    },
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
