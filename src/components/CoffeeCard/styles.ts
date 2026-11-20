import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const CardContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.25rem 1.25rem;
  border-radius: 6px 36px;
  background: ${({ theme }) => theme.colors.card};
  text-align: center;

  img {
    margin-top: -1.25rem;
  }

  h3 {
    margin-top: 1rem;
    ${typography.titleS}
    color: ${({ theme }) => theme.colors.subtitle};
  }
`

export const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 0.75rem;

  li {
    padding: 0.25rem 0.5rem;
    border-radius: 100px;
    background: ${({ theme }) => theme.colors.yellowLight};
    color: ${({ theme }) => theme.colors.yellowDark};
    ${typography.tag}
  }
`

export const Description = styled.p`
  margin-top: 0.5rem;
  ${typography.textS}
  color: ${({ theme }) => theme.colors.label};
`

export const CardFooter = styled.div`
  width: 100%;
  margin-top: auto;
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`

export const Price = styled.p`
  white-space: nowrap;
  ${typography.textS}
  color: ${({ theme }) => theme.colors.text};

  strong {
    ${typography.titleM}
  }
`

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.purpleDark};
  color: ${({ theme }) => theme.colors.card};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.purple};
  }
`
