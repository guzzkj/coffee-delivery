import type { Coffee } from '../../types/coffee'
import { CoffeeCard } from '../CoffeeCard'
import { CatalogContainer, CoffeeList } from './styles'

type CoffeeCatalogProps = {
  coffees: Coffee[]
}

export function CoffeeCatalog({ coffees }: CoffeeCatalogProps) {
  return (
    <CatalogContainer aria-labelledby="catalog-title">
      <h2 id="catalog-title">Nossos cafés</h2>

      <CoffeeList>
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </CoffeeList>
    </CatalogContainer>
  )
}
