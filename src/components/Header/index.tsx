import { MapPin, ShoppingCart } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { Logo } from '../Logo'
import { Actions, CartLink, HeaderContainer, HeaderContent, Location } from './styles'

export function Header() {
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

          <CartLink to="/checkout" aria-label="Ver carrinho">
            <ShoppingCart size={22} weight="fill" aria-hidden />
          </CartLink>
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  )
}
