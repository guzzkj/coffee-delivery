import { Link, Outlet } from 'react-router'

export function PageLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Coffee Delivery</Link> <Link to="/checkout">Carrinho</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
