import { ShoppingCart } from '@phosphor-icons/react'
import type { Coffee } from '../../types/coffee'
import { formatPrice } from '../../utils/formatCurrency'
import { AddButton, CardContainer, CardFooter, Description, Price, Tags } from './styles'

type CoffeeCardProps = {
  coffee: Coffee
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
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

        <AddButton type="button" aria-label={`Adicionar ${coffee.name} ao carrinho`}>
          <ShoppingCart size={22} weight="fill" aria-hidden />
        </AddButton>
      </CardFooter>
    </CardContainer>
  )
}
