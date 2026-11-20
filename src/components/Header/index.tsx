import { MapPin, ShoppingCart } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { useCart } from '../../hooks/useCart'
import { CartBadge } from '../CartBadge'
import { Logo } from '../Logo'
import { Actions, CartLink, HeaderContainer, HeaderContent, Location } from './styles'

export function Header() {
  const { totalUnits } = useCart()

  const cartLabel =
    totalUnits === 0
      ? 'Ver carrinho, vazio'
      : `Ver carrinho, ${totalUnits} ${totalUnits === 1 ? 'item' : 'itens'}`

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/" aria-label="Coffee Delivery, página inicial">
          <Logo />
        </Link>

        <Actions>
          <Location>
            <MapPin size={22} weight="fill" aria-hidden />
            Porto Alegre, RS
          </Location>

          <CartLink to="/checkout" aria-label={cartLabel}>
            <ShoppingCart size={22} weight="fill" aria-hidden />
            <CartBadge count={totalUnits} />
          </CartLink>
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  )
}
