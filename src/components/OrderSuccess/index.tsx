import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import { paymentMethodLabels, type Order } from '../../types/order'
import { DetailIcon, DetailItem, DetailsCard, SuccessContainer, SuccessHeader } from './styles'

type OrderSuccessProps = {
  order: Order
}

// RF-12: mostra os dados do pedido confirmado (snapshot), não do carrinho atual
export function OrderSuccess({ order }: OrderSuccessProps) {
  const { address, paymentMethod } = order

  return (
    <SuccessContainer>
      <div>
        <SuccessHeader>
          <h1>Uhu! Pedido confirmado</h1>
          <p>Agora é só aguardar que logo o café chegará até você</p>
        </SuccessHeader>

        <DetailsCard>
          <DetailItem>
            <DetailIcon $color="purple" aria-hidden>
              <MapPin size={16} weight="fill" />
            </DetailIcon>
            <p>
              Entrega em{' '}
              <strong>
                {address.street}, {address.number}
                {address.complement ? ` - ${address.complement}` : ''}
              </strong>
              <br />
              {address.neighborhood} - {address.city}, {address.state}
            </p>
          </DetailItem>

          <DetailItem>
            <DetailIcon $color="yellow" aria-hidden>
              <Timer size={16} weight="fill" />
            </DetailIcon>
            <p>
              Previsão de entrega
              <br />
              <strong>20 min - 30 min</strong>
            </p>
          </DetailItem>

          <DetailItem>
            <DetailIcon $color="yellowDark" aria-hidden>
              <CurrencyDollar size={16} />
            </DetailIcon>
            <p>
              Pagamento na entrega
              <br />
              <strong>{paymentMethodLabels[paymentMethod]}</strong>
            </p>
          </DetailItem>
        </DetailsCard>
      </div>

      <img
        src="/images/delivery-illustration.png"
        alt="Entregador em uma moto roxa levando o pedido"
        width={492}
        height={293}
      />
    </SuccessContainer>
  )
}
