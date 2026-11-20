import styled from 'styled-components'
import { media } from '../../styles/breakpoints'

// clip evita rolagem horizontal causada por fundos que ocupam 100vw,
// sem criar um container de rolagem (o Header sticky continua funcionando)
export const LayoutContainer = styled.div`
  overflow-x: clip;
`

export const Main = styled.main`
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 2rem 4rem;

  ${media.tablet} {
    padding: 0 1rem 3rem;
  }
`

// Aparece só ao receber foco pelo teclado (primeiro Tab da página)
export const SkipLink = styled.a`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 20;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.purpleDark};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  transform: translateY(-200%);

  &:focus {
    transform: translateY(0);
  }
`
