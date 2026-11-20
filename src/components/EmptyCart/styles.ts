import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const EmptyCartContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-width: 28rem;
  margin: 4rem auto 0;
  padding: 2.5rem;
  border-radius: 6px 44px;
  background: ${({ theme }) => theme.colors.card};
  text-align: center;

  svg {
    color: ${({ theme }) => theme.colors.yellowDark};
  }

  h1 {
    ${typography.titleM}
    color: ${({ theme }) => theme.colors.subtitle};
  }

  p {
    ${typography.textM}
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    display: inline-flex;
    align-items: center;
    min-height: 2.875rem;
    margin-top: 0.75rem;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.onAccent};
    text-decoration: none;
    ${typography.buttonG}
    transition: background-color 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors.yellowDark};
    }
  }
`
