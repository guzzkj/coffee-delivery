import type { Coffee } from './coffee'

// O carrinho guarda só o id e a quantidade; os dados do café vêm do catálogo (D-15)
export type CartItem = {
  coffeeId: string
  quantity: number // inteiro ≥ 1
}

// Item já combinado com o café do catálogo, calculado na renderização
export type CartItemDetailed = CartItem & {
  coffee: Coffee
}
