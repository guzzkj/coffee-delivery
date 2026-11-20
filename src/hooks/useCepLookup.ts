import { useEffect, useState } from 'react'
import type { UseFormSetFocus, UseFormSetValue } from 'react-hook-form'
import type { CheckoutFormInput } from '../schemas/checkoutSchema'
import { CepLookupError, fetchAddressByCep, sanitizeCep } from '../services/viaCep'

type UseCepLookupParams = {
  cep: string | undefined
  setValue: UseFormSetValue<CheckoutFormInput>
  setFocus: UseFormSetFocus<CheckoutFormInput>
}

// Resultado da última consulta, guardado junto com o CEP consultado
type LookupResult = {
  cep: string
  error: string | null
}

// RF-08 / RN-07: quando o CEP chega a 8 dígitos, consulta a ViaCEP e preenche
// rua, bairro, cidade e UF. Em caso de erro, os campos continuam editáveis.
export function useCepLookup({ cep, setValue, setFocus }: UseCepLookupParams) {
  const [result, setResult] = useState<LookupResult | null>(null)
  const digits = sanitizeCep(cep ?? '')
  const isComplete = digits.length === 8

  useEffect(() => {
    if (!isComplete) {
      return
    }

    // AbortController cancela a busca antiga se o CEP mudar antes da resposta
    const controller = new AbortController()

    fetchAddressByCep(digits, controller.signal)
      .then((address) => {
        const options = { shouldValidate: true, shouldDirty: true }
        setValue('street', address.street, options)
        setValue('neighborhood', address.neighborhood, options)
        setValue('city', address.city, options)
        setValue('state', address.state, options)
        setResult({ cep: digits, error: null })
        setFocus('number') // número e complemento são do usuário
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return

        const message =
          error instanceof CepLookupError ? error.message : 'Não foi possível consultar o CEP. Preencha manualmente.'
        setResult({ cep: digits, error: message })
      })

    return () => controller.abort()
  }, [digits, isComplete, setValue, setFocus])

  // Estados derivados na renderização (sem setState síncrono no efeito):
  // se o resultado guardado é de outro CEP, a consulta do CEP atual está em andamento
  const resultIsCurrent = isComplete && result?.cep === digits

  return {
    isLoadingCep: isComplete && !resultIsCurrent,
    cepError: resultIsCurrent ? result.error : null,
    cepFound: resultIsCurrent && result.error === null,
  }
}
