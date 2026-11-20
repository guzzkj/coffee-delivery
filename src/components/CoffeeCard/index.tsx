import { ShoppingCart } from '@phosphor-icons/react'
import { useState } from 'react'
import type { Coffee } from '../../types/coffee'
import { formatPrice } from '../../utils/formatCurrency'
import { QuantityInput } from '../QuantityInput'
import { AddButton, CardActions, CardContainer, CardFooter, Description, Price, Tags } from './styles'

type CoffeeCardProps = {
  coffee: Coffee
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  // Quantidade escolhida antes de adicionar (RF-02): estado local do card
  const [quantity, setQuantity] = useState(1)

  function handleIncrement() {
    setQuantity((current) => current + 1)
  }

  function handleDecrement() {
    setQuantity((current) => Math.max(1, current - 1))
  }

  return (
    <CardContainer>
      <img src={coffee.image} alt="" width={120} height={120} />

      <Tags>
        {coffee.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </Tags>

      <h3>{coffee.name}</h3>
      <Description>{coffee.description}</Description>

      <CardFooter>
        <Price>
          R$ <strong>{formatPrice(coffee.priceInCents)}</strong>
        </Price>

        <CardActions>
          <QuantityInput
            value={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            label={coffee.name}
          />

          <AddButton type="button" aria-label={`Adicionar ${coffee.name} ao carrinho`}>
            <ShoppingCart size={22} weight="fill" aria-hidden />
          </AddButton>
        </CardActions>
      </CardFooter>
    </CardContainer>
  )
}
