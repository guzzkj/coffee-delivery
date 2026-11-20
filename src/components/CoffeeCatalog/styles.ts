import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const CatalogContainer = styled.section`
  padding-top: 2rem;

  h2 {
    ${typography.titleL}
    color: ${({ theme }) => theme.colors.subtitle};
  }
`

export const CoffeeList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2.5rem 2rem;
  margin-top: 3.375rem;
`
