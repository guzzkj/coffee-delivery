import { z } from 'zod'

// Zod 4: a mensagem de erro vai no parâmetro `error` (o `errorMap` era do Zod 3)
export const checkoutSchema = z.object({
  cep: z.string().trim().regex(/^\d{5}-?\d{3}$/, { error: 'Informe um CEP válido com 8 dígitos' }),
  street: z.string().trim().min(1, { error: 'Informe a rua' }),
  number: z.string().trim().min(1, { error: 'Informe o número' }),
  complement: z.string().trim().optional(),
  neighborhood: z.string().trim().min(1, { error: 'Informe o bairro' }),
  city: z.string().trim().min(1, { error: 'Informe a cidade' }),
  state: z.string().trim().regex(/^[A-Za-z]{2}$/, { error: 'Informe a UF com 2 letras' }),
  paymentMethod: z.enum(['credit', 'debit', 'money'], { error: 'Selecione a forma de pagamento' }),
})

// O que o formulário guarda nos campos (antes da validação)
export type CheckoutFormInput = z.input<typeof checkoutSchema>

// O que sai validado do schema e vai para o pedido
export type CheckoutFormData = z.output<typeof checkoutSchema>
