import type { CartItem } from '../types/cart'
import type { Order } from '../types/order'
import type { CartAction } from './cartActions'

export type CartState = {
  items: CartItem[]
  confirmedOrder: Order | null
}

export const initialCartState: CartState = {
  items: [],
  confirmedOrder: null,
}

// Função pura: recebe o estado atual e a ação e devolve um NOVO estado.
// Nunca altera `state` diretamente (sem push, splice ou atribuição).
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { coffeeId, quantity } = action.payload

      // RN-01: quantidade precisa ser inteira e positiva
      if (!Number.isInteger(quantity) || quantity < 1) {
        return state
      }

      const existingItem = state.items.find((item) => item.coffeeId === coffeeId)

      // RN-02: café repetido soma a quantidade, sem criar outra linha
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.coffeeId === coffeeId ? { ...item, quantity: item.quantity + quantity } : item,
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, { coffeeId, quantity }],
      }
    }

    case 'INCREMENT_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.coffeeId === action.payload.coffeeId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      }

    case 'DECREMENT_ITEM':
      // D-03: no carrinho o mínimo é 1; para tirar o item usa-se REMOVE_ITEM
      return {
        ...state,
        items: state.items.map((item) =>
          item.coffeeId === action.payload.coffeeId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.coffeeId !== action.payload.coffeeId),
      }

    case 'CONFIRM_ORDER':
      // RN-06 / RF-13: guarda o snapshot do pedido e esvazia o carrinho
      return {
        items: [],
        confirmedOrder: action.payload.order,
      }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    default:
      return state
  }
}
