import { Bank, CreditCard, Money } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import type { UseFormRegister } from 'react-hook-form'
import type { CheckoutFormInput } from '../../schemas/checkoutSchema'
import { paymentMethodLabels, type PaymentMethod } from '../../types/order'
import { ErrorMessage, OptionLabel, Options, PaymentFieldset } from './styles'

type PaymentMethodSelectorProps = {
  register: UseFormRegister<CheckoutFormInput>
  error?: string
}

const paymentOptions: { value: PaymentMethod; icon: ReactNode }[] = [
  { value: 'credit', icon: <CreditCard size={16} aria-hidden /> },
  { value: 'debit', icon: <Bank size={16} aria-hidden /> },
  { value: 'money', icon: <Money size={16} aria-hidden /> },
]

// RF-09 / RN-05: escolha só informativa. São inputs radio reais (estilizados),
// então o teclado funciona: Tab entra no grupo e as setas trocam a opção.
export function PaymentMethodSelector({ register, error }: PaymentMethodSelectorProps) {
  return (
    <PaymentFieldset aria-describedby={error ? 'payment-error' : undefined}>
      <legend>Forma de pagamento</legend>

      <Options>
        {paymentOptions.map((option) => (
          <OptionLabel key={option.value}>
            <input type="radio" value={option.value} aria-invalid={Boolean(error)} {...register('paymentMethod')} />
            <span>
              {option.icon}
              {paymentMethodLabels[option.value]}
            </span>
          </OptionLabel>
        ))}
      </Options>

      {error && (
        <ErrorMessage id="payment-error" role="alert">
          {error}
        </ErrorMessage>
      )}
    </PaymentFieldset>
  )
}
