import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { CheckoutFormInput } from '../../schemas/checkoutSchema'
import { TextInput } from '../TextInput'
import { AddressGrid, CepStatus } from './styles'

type DeliveryAddressFormProps = {
  register: UseFormRegister<CheckoutFormInput>
  errors: FieldErrors<CheckoutFormInput>
  isLoadingCep: boolean
  cepError: string | null
  cepFound: boolean
}

export function DeliveryAddressForm({ register, errors, isLoadingCep, cepError, cepFound }: DeliveryAddressFormProps) {
  return (
    <AddressGrid>
      {/* aria-live anuncia o resultado da consulta do CEP para leitores de tela */}
      <CepStatus className="cep-status" aria-live="polite" $isError={Boolean(cepError)}>
        {isLoadingCep && 'Buscando endereço...'}
        {cepError}
        {cepFound && 'Endereço encontrado. Informe o número.'}
      </CepStatus>

      <TextInput
        id="cep"
        label="CEP"
        className="cep"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={9}
        error={errors.cep?.message}
        {...register('cep')}
      />
      <TextInput
        id="street"
        label="Rua"
        className="street"
        autoComplete="address-line1"
        error={errors.street?.message}
        {...register('street')}
      />
      <TextInput
        id="number"
        label="Número"
        className="number"
        inputMode="numeric"
        error={errors.number?.message}
        {...register('number')}
      />
      <TextInput
        id="complement"
        label="Complemento"
        className="complement"
        optional
        autoComplete="address-line2"
        error={errors.complement?.message}
        {...register('complement')}
      />
      <TextInput
        id="neighborhood"
        label="Bairro"
        className="neighborhood"
        error={errors.neighborhood?.message}
        {...register('neighborhood')}
      />
      <TextInput
        id="city"
        label="Cidade"
        className="city"
        autoComplete="address-level2"
        error={errors.city?.message}
        {...register('city')}
      />
      <TextInput
        id="state"
        label="UF"
        className="state"
        maxLength={2}
        autoComplete="address-level1"
        error={errors.state?.message}
        {...register('state')}
      />
    </AddressGrid>
  )
}
