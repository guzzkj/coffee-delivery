import { Receipt } from '@phosphor-icons/react'
import { EmptyState } from '../../components/EmptyState'
import { OrderSuccess } from '../../components/OrderSuccess'
import { useCart } from '../../hooks/useCart'

export function Success() {
  // O pedido vem do snapshot salvo, então continua certo com o carrinho vazio e após F5
  const { confirmedOrder } = useCart()

  // RN-09: acesso direto a /success sem pedido confirmado
  if (!confirmedOrder) {
    return (
      <EmptyState
        icon={<Receipt size={48} weight="fill" aria-hidden />}
        title="Nenhum pedido confirmado"
        description="Você ainda não finalizou um pedido. Escolha seus cafés para começar."
        linkLabel="Ver cafés"
        linkTo="/"
      />
    )
  }

  return <OrderSuccess order={confirmedOrder} />
}
