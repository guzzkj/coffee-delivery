import styled from 'styled-components'

// clip evita rolagem horizontal causada por fundos que ocupam 100vw,
// sem criar um container de rolagem (o Header sticky continua funcionando)
export const LayoutContainer = styled.div`
  overflow-x: clip;
`

export const Main = styled.main`
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 2rem 4rem;
`
