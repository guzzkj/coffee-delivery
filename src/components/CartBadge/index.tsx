import { BadgeContainer } from './styles'

type CartBadgeProps = {
  count: number
}

// RF-04: mostra a soma das unidades; some quando o carrinho está vazio
export function CartBadge({ count }: CartBadgeProps) {
  if (count === 0) {
    return null
  }

  return <BadgeContainer aria-hidden>{count}</BadgeContainer>
}
