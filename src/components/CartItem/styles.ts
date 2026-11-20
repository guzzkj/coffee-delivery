import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const ItemContainer = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 0.5rem 0.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.button};

  img {
    flex-shrink: 0;
  }
`

export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    ${typography.textM}
    color: ${({ theme }) => theme.colors.subtitle};
  }
`

export const ItemActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  min-height: 2.75rem;
  padding: 0 0.5rem;
  border: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text};
  ${typography.buttonM}
  transition: background-color 0.2s;

  svg {
    color: ${({ theme }) => theme.colors.purple};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`

export const ItemPrice = styled.p`
  white-space: nowrap;
  ${typography.textMBold}
  color: ${({ theme }) => theme.colors.text};
`
