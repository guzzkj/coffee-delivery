import { Outlet } from 'react-router'
import { Header } from '../Header'
import { LayoutContainer, Main } from './styles'

export function PageLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </LayoutContainer>
  )
}
