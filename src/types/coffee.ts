export type CoffeeTag =
  | 'tradicional'
  | 'especial'
  | 'com leite'
  | 'alcoólico'
  | 'gelado'

export type Coffee = {
  id: string
  name: string
  description: string
  tags: CoffeeTag[]
  priceInCents: number // RN-04: sempre inteiro em centavos
  image: string // caminho em public/
}
