import type { ComponentProps } from 'react'
import { ErrorMessage, FieldContainer, InputWrapper, OptionalTag, VisuallyHiddenLabel } from './styles'

type TextInputProps = ComponentProps<'input'> & {
  id: string
  label: string
  error?: string
  optional?: boolean
}

// Campo de texto reutilizável: label associado (htmlFor/id), erro acessível
// e suporte ao `ref` do React Hook Form (no React 19, `ref` é uma prop comum)
export function TextInput({ id, label, error, optional = false, className, ...props }: TextInputProps) {
  const errorId = `${id}-error`

  return (
    <FieldContainer className={className}>
      <VisuallyHiddenLabel htmlFor={id}>
        {label}
        {optional && ' (opcional)'}
      </VisuallyHiddenLabel>

      <InputWrapper $hasError={Boolean(error)}>
        <input
          id={id}
          placeholder={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        {optional && <OptionalTag aria-hidden>Opcional</OptionalTag>}
      </InputWrapper>

      {error && (
        <ErrorMessage id={errorId} role="alert">
          {error}
        </ErrorMessage>
      )}
    </FieldContainer>
  )
}
