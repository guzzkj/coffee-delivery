import { Link } from 'react-router'
import styled from 'styled-components'
import { media } from '../../styles/breakpoints'
import { typography } from '../../styles/typography'

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.background};
`

export const HeaderContent = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  ${media.tablet} {
    padding: 1rem;
  }

  > a {
    text-decoration: none;
    border-radius: 6px;
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const Location = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  min-height: 2.375rem;
  padding: 0.5rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.purpleLight};
  color: ${({ theme }) => theme.colors.purpleDark};
  ${typography.textS}

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.purple};
  }

  /* em telas pequenas fica só o ícone; o texto continua para leitores de tela */
  ${media.mobile} {
    span {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
  }
`

export const CartLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.yellowLight};
  color: ${({ theme }) => theme.colors.yellowText};
`
