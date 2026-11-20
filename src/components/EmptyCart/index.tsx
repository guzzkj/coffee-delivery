import { ShoppingCart } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { EmptyCartContainer } from './styles'

// RN-09: estado vazio do carrinho, com caminho de volta ao catálogo
export function EmptyCart() {
  return (
    <EmptyCartContainer>
      <ShoppingCart size={48} weight="fill" aria-hidden />
      <h1>Seu carrinho está vazio</h1>
      <p>Escolha seus cafés no catálogo para continuar o pedido.</p>
      <Link to="/">Ver cafés</Link>
    </EmptyCartContainer>
  )
}
