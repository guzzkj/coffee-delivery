import styled from 'styled-components'
import { media } from '../../styles/breakpoints'
import { typography } from '../../styles/typography'

export const PaymentFieldset = styled.fieldset`
  border: 0;
  min-width: 0;

  /* a legenda existe para leitores de tela; o título visível está no card */
  legend {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
`

export const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;

  ${media.mobile} {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const OptionLabel = styled.label`
  position: relative;
  display: block;
  cursor: pointer;

  /* o radio fica invisível, mas continua focável e clicável pelo label */
  input {
    position: absolute;
    opacity: 0;
    inset: 0;
    margin: 0;
    cursor: pointer;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-height: 3.1875rem;
    padding: 1rem;
    border: 1px solid transparent;
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.text};
    ${typography.buttonM}
    transition:
      background-color 0.2s,
      border-color 0.2s;

    svg {
      flex-shrink: 0;
      color: ${({ theme }) => theme.colors.purple};
    }
  }

  &:hover span {
    background: ${({ theme }) => theme.colors.hover};
  }

  input:checked + span {
    border-color: ${({ theme }) => theme.colors.purple};
    background: ${({ theme }) => theme.colors.purpleLight};
  }

  input:focus-visible + span {
    outline: 2px solid ${({ theme }) => theme.colors.purple};
    outline-offset: 2px;
  }
`

export const ErrorMessage = styled.p`
  margin-top: 0.75rem;
  ${typography.textS}
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
`
