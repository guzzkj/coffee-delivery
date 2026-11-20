import { Trash } from '@phosphor-icons/react'
import type { CartItemDetailed } from '../../types/cart'
import { formatCurrency } from '../../utils/formatCurrency'
import { QuantityInput } from '../QuantityInput'
import { ItemActions, ItemContainer, ItemInfo, ItemPrice, RemoveButton } from './styles'

type CartItemProps = {
  item: CartItemDetailed
  onIncrement: (coffeeId: string) => void
  onDecrement: (coffeeId: string) => void
  onRemove: (coffeeId: string) => void
}

export function CartItem({ item, onIncrement, onDecrement, onRemove }: CartItemProps) {
  const { coffee, quantity } = item

  return (
    <ItemContainer>
      <img src={coffee.image} alt="" width={64} height={64} />

      <ItemInfo>
        <h3>{coffee.name}</h3>

        <ItemActions>
          <QuantityInput
            value={quantity}
            onIncrement={() => onIncrement(coffee.id)}
            onDecrement={() => onDecrement(coffee.id)}
            label={coffee.name}
          />

          <RemoveButton
            type="button"
            onClick={() => onRemove(coffee.id)}
            aria-label={`Remover ${coffee.name} do carrinho`}
          >
            <Trash size={16} aria-hidden />
            Remover
          </RemoveButton>
        </ItemActions>
      </ItemInfo>

      <ItemPrice>{formatCurrency(coffee.priceInCents * quantity)}</ItemPrice>
    </ItemContainer>
  )
}
