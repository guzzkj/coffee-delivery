import { describe, expect, it } from 'vitest'
import { checkoutSchema } from '../schemas/checkoutSchema'

const validData = {
  cep: '90250-440',
  street: 'Rua João Daniel Martinelli',
  number: '102',
  complement: '',
  neighborhood: 'Farrapos',
  city: 'Porto Alegre',
  state: 'RS',
  paymentMethod: 'credit',
}

// Devolve a primeira mensagem de erro de um campo
function errorFor(data: Record<string, unknown>, field: string) {
  const result = checkoutSchema.safeParse(data)
  if (result.success) return undefined
  return result.error.issues.find((issue) => issue.path[0] === field)?.message
}

describe('checkoutSchema (UT-08)', () => {
  it('accepts a valid address, with or without dash in the CEP', () => {
    expect(checkoutSchema.safeParse(validData).success).toBe(true)
    expect(checkoutSchema.safeParse({ ...validData, cep: '90250440' }).success).toBe(true)
  })

  it('treats complement as optional', () => {
    const withoutComplement: Record<string, unknown> = { ...validData }
    delete withoutComplement.complement
    expect(checkoutSchema.safeParse(withoutComplement).success).toBe(true)
  })

  it('rejects an invalid CEP', () => {
    expect(errorFor({ ...validData, cep: '1234' }, 'cep')).toBe('Informe um CEP válido com 8 dígitos')
  })

  it('rejects an empty or blank number', () => {
    expect(errorFor({ ...validData, number: '   ' }, 'number')).toBe('Informe o número')
  })

  it('rejects an invalid UF', () => {
    expect(errorFor({ ...validData, state: 'RGS' }, 'state')).toBe('UF inválida')
  })

  it('requires a payment method', () => {
    expect(errorFor({ ...validData, paymentMethod: undefined }, 'paymentMethod')).toBe(
      'Selecione a forma de pagamento',
    )
  })
})
