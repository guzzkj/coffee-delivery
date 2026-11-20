import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const SummaryContainer = styled.div`
  margin-top: 1.5rem;

  dl {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text};

  dt {
    ${typography.textS}
  }

  dd {
    ${typography.textM}
  }
`

export const TotalRow = styled(SummaryRow)`
  color: ${({ theme }) => theme.colors.subtitle};

  dt,
  dd {
    ${typography.textLBold}
  }
`

export const ConfirmButton = styled.button`
  width: 100%;
  min-height: 2.875rem;
  margin-top: 1.5rem;
  padding: 0.75rem 0.5rem;
  border: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.onAccent};
  ${typography.buttonG}
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.yellowDark};
  }

  &:disabled {
    opacity: 0.6;
  }
`
