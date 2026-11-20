import { formatCurrency } from '../../utils/formatCurrency'
import { ConfirmButton, SummaryContainer, SummaryRow, TotalRow } from './styles'

type CartSummaryProps = {
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
  disabled?: boolean
}

export function CartSummary({ subtotalInCents, deliveryFeeInCents, totalInCents, disabled = false }: CartSummaryProps) {
  return (
    <SummaryContainer>
      <dl>
        <SummaryRow>
          <dt>Total de itens</dt>
          <dd>{formatCurrency(subtotalInCents)}</dd>
        </SummaryRow>
        <SummaryRow>
          <dt>Entrega</dt>
          <dd>{formatCurrency(deliveryFeeInCents)}</dd>
        </SummaryRow>
        <TotalRow>
          <dt>Total</dt>
          <dd>{formatCurrency(totalInCents)}</dd>
        </TotalRow>
      </dl>

      <ConfirmButton type="submit" disabled={disabled}>
        Confirmar pedido
      </ConfirmButton>
    </SummaryContainer>
  )
}
