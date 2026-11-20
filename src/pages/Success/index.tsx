import { OrderSuccess } from '../../components/OrderSuccess'
import { useCart } from '../../hooks/useCart'

export function Success() {
  // O pedido vem do snapshot salvo, então continua certo com o carrinho vazio e após F5
  const { confirmedOrder } = useCart()

  if (!confirmedOrder) {
    return null // estado vazio na T-31
  }

  return <OrderSuccess order={confirmedOrder} />
}
