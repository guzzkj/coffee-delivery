import { Outlet } from 'react-router'
import { Header } from '../Header'
import { Main } from './styles'

export function PageLayout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  )
}
