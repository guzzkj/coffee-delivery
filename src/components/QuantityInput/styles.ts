import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.button};

  span {
    min-width: 1.25rem;
    text-align: center;
    ${typography.textM}
    color: ${({ theme }) => theme.colors.title};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2.75rem;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: ${({ theme }) => theme.colors.purple};
    transition: color 0.2s;

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.purpleDark};
    }

    &:disabled {
      opacity: 0.4;
    }
  }
`
