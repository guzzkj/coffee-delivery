import { zodResolver } from '@hookform/resolvers/zod'
import { CurrencyDollar, MapPinLine } from '@phosphor-icons/react'
import { useForm, useWatch } from 'react-hook-form'
import { CartItem } from '../../components/CartItem'
import { CartSummary } from '../../components/CartSummary'
import { DeliveryAddressForm } from '../../components/DeliveryAddressForm'
import { EmptyCart } from '../../components/EmptyCart'
import { PaymentMethodSelector } from '../../components/PaymentMethodSelector'
import { useCart } from '../../hooks/useCart'
import { useCepLookup } from '../../hooks/useCepLookup'
import { checkoutSchema, type CheckoutFormData } from '../../schemas/checkoutSchema'
import { Card, CardHeader, CartList, CheckoutForm, Column, SummaryCard } from './styles'

export function Checkout() {
  const {
    items,
    subtotalInCents,
    deliveryFeeInCents,
    totalInCents,
    incrementItem,
    decrementItem,
    removeItem,
  } = useCart()

  // React Hook Form + Zod: o resolver valida todos os campos com o checkoutSchema
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  // Observa o CEP digitado e preenche o endereço pela ViaCEP
  const cep = useWatch({ control, name: 'cep' })
  const { isLoadingCep, cepError, cepFound } = useCepLookup({ cep, setValue, setFocus })

  // Só é chamada quando o formulário passa na validação (a confirmação vem na T-29)
  function handleConfirmOrder(data: CheckoutFormData) {
    void data
  }

  // RN-09 / RF-11: sem itens não há o que confirmar
  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <CheckoutForm noValidate onSubmit={handleSubmit(handleConfirmOrder)}>
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

          <DeliveryAddressForm
            register={register}
            errors={errors}
            isLoadingCep={isLoadingCep}
            cepError={cepError}
            cepFound={cepFound}
          />
        </Card>

        <Card>
          <CardHeader $iconColor="purple">
            <CurrencyDollar size={22} aria-hidden />
            <div>
              <h3>Pagamento</h3>
              <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
            </div>
          </CardHeader>

          <PaymentMethodSelector register={register} error={errors.paymentMethod?.message} />
        </Card>
      </Column>

      <Column aria-labelledby="selected-title">
        <h2 id="selected-title">Cafés selecionados</h2>
        <SummaryCard>
          <CartList>
            {items.map((item) => (
              <CartItem
                key={item.coffeeId}
                item={item}
                onIncrement={incrementItem}
                onDecrement={decrementItem}
                onRemove={removeItem}
              />
            ))}
          </CartList>

          <CartSummary
            subtotalInCents={subtotalInCents}
            deliveryFeeInCents={deliveryFeeInCents}
            totalInCents={totalInCents}
          />
        </SummaryCard>
      </Column>
    </CheckoutForm>
  )
}
