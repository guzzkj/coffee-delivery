import { CurrencyDollar, MapPinLine } from '@phosphor-icons/react'
import { Card, CardHeader, CheckoutForm, Column, SummaryCard } from './styles'

export function Checkout() {
  return (
    <CheckoutForm noValidate>
      <Column aria-labelledby="checkout-title">
        <h2 id="checkout-title">Complete seu pedido</h2>

        <Card>
          <CardHeader $iconColor="yellowDark">
            <MapPinLine size={22} aria-hidden />
            <div>
              <h3>Endereço de Entrega</h3>
              <p>Informe o endereço onde deseja receber seu pedido</p>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader $iconColor="purple">
            <CurrencyDollar size={22} aria-hidden />
            <div>
              <h3>Pagamento</h3>
              <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
            </div>
          </CardHeader>
        </Card>
      </Column>

      <Column aria-labelledby="selected-title">
        <h2 id="selected-title">Cafés selecionados</h2>
        <SummaryCard />
      </Column>
    </CheckoutForm>
  )
}
