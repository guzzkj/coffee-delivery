import { Minus, Plus } from '@phosphor-icons/react'
import { QuantityContainer } from './styles'

type QuantityInputProps = {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  min?: number
  label: string // nome do produto, usado nos textos acessíveis
}

// RN-01: o botão "−" fica desabilitado no mínimo (padrão 1)
export function QuantityInput({ value, onIncrement, onDecrement, min = 1, label }: QuantityInputProps) {
  return (
    <QuantityContainer>
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label={`Diminuir quantidade de ${label}`}
      >
        <Minus size={14} weight="bold" aria-hidden />
      </button>

      <span aria-live="polite" aria-label={`Quantidade de ${label}: ${value}`}>
        {value}
      </span>

      <button type="button" onClick={onIncrement} aria-label={`Aumentar quantidade de ${label}`}>
        <Plus size={14} weight="bold" aria-hidden />
      </button>
    </QuantityContainer>
  )
}
