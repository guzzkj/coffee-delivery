import type { CheckoutFormData } from '../schemas/checkoutSchema'
import type { CartItemDetailed } from '../types/cart'
import type { Order } from '../types/order'
import { calculateSubtotal, calculateTotal, DELIVERY_FEE_IN_CENTS } from './cartCalculations'

type CreateOrderParams = {
  items: CartItemDetailed[]
  data: CheckoutFormData
  id: string
  createdAt: string
}

// Monta o snapshot do pedido (RN-06): copia nome, preço e quantidade de cada item,
// então o pedido continua correto mesmo depois que o carrinho é esvaziado (RF-13).
// O id e a data vêm de fora para a função continuar pura e fácil de testar.
export function createOrder({ items, data, id, createdAt }: CreateOrderParams): Order {
  const { paymentMethod, complement, ...address } = data
  const subtotalInCents = calculateSubtotal(items)

  return {
    id,
    createdAt,
    items: items.map((item) => ({
      coffeeId: item.coffeeId,
      name: item.coffee.name,
      priceInCents: item.coffee.priceInCents,
      quantity: item.quantity,
    })),
    address: {
      ...address,
      state: address.state.toUpperCase(),
      complement: complement ? complement : undefined,
    },
    paymentMethod,
    subtotalInCents,
    deliveryFeeInCents: DELIVERY_FEE_IN_CENTS,
    totalInCents: calculateTotal(subtotalInCents),
  }
}
