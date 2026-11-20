import { ShoppingCart } from '@phosphor-icons/react'
import { EmptyState } from '../EmptyState'

// RN-09: estado vazio do carrinho, com caminho de volta ao catálogo
export function EmptyCart() {
  return (
    <EmptyState
      icon={<ShoppingCart size={48} weight="fill" aria-hidden />}
      title="Seu carrinho está vazio"
      description="Escolha seus cafés no catálogo para continuar o pedido."
      linkLabel="Ver cafés"
      linkTo="/"
    />
  )
}
