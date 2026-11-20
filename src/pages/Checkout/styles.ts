import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const CheckoutForm = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 40rem) minmax(0, 28rem);
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2.5rem;

  h2 {
    ${typography.titleXS}
    color: ${({ theme }) => theme.colors.subtitle};
    margin-bottom: 0.9375rem;
  }
`

export const Column = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  /* o h2 já tem margem própria; o gap vale entre os cards */
  h2 {
    margin-bottom: 0.1875rem;
  }
`

export const Card = styled.div`
  padding: 2.5rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.card};
`

export const SummaryCard = styled(Card)`
  border-radius: 6px 44px;
`

type CardHeaderProps = {
  $iconColor: 'yellowDark' | 'purple'
}

export const CardHeader = styled.header<CardHeaderProps>`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;

  svg {
    flex-shrink: 0;
    color: ${({ theme, $iconColor }) => theme.colors[$iconColor]};
  }

  h3 {
    ${typography.textM}
    color: ${({ theme }) => theme.colors.subtitle};
  }

  p {
    ${typography.textS}
    color: ${({ theme }) => theme.colors.text};
  }
`
