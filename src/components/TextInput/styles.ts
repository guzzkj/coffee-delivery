import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`

// Esconde o label visualmente, mas mantém para leitores de tela
export const VisuallyHiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

type InputWrapperProps = {
  $hasError: boolean
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  min-height: 2.75rem;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.button)};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.input};
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.yellowDark};
  }

  input {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0.75rem;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    ${typography.textS}

    &::placeholder {
      color: ${({ theme }) => theme.colors.label};
    }

    /* o foco já aparece na borda amarela do wrapper */
    &:focus-visible {
      outline: none;
    }
  }
`

export const OptionalTag = styled.span`
  padding-right: 0.75rem;
  font-style: italic;
  ${typography.textS}
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.label};
`

export const ErrorMessage = styled.p`
  ${typography.textS}
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
`
