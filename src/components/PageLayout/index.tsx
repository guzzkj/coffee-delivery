import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Header } from '../Header'
import { LayoutContainer, Main, SkipLink } from './styles'

const pageTitles: Record<string, string> = {
  '/': 'Coffee Delivery',
  '/checkout': 'Finalizar pedido | Coffee Delivery',
  '/success': 'Pedido confirmado | Coffee Delivery',
}

export function PageLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)

  // Numa SPA o navegador não avisa a troca de página: atualizamos o título
  // e levamos o foco para o conteúdo novo (exceto no primeiro carregamento)
  useEffect(() => {
    document.title = pageTitles[pathname] ?? 'Coffee Delivery'

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    window.scrollTo(0, 0)
    mainRef.current?.focus()
  }, [pathname])

  return (
    <LayoutContainer>
      <SkipLink href="#main-content">Pular para o conteúdo</SkipLink>
      <Header />
      <Main id="main-content" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </Main>
    </LayoutContainer>
  )
}
