export type PaymentMethod = 'credit' | 'debit' | 'money'

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  money: 'Dinheiro',
}

export type DeliveryAddress = {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string // UF com 2 letras
}

export type OrderItem = {
  coffeeId: string
  name: string
  priceInCents: number
  quantity: number
}

// Snapshot do pedido confirmado (RN-06): não depende do carrinho atual
export type Order = {
  id: string
  items: OrderItem[]
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
  createdAt: string
}
