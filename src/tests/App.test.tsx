import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { renderWithProviders } from './renderWithProviders'

describe('App routes', () => {
  it('renders the home page at /', () => {
    renderWithProviders(<App />)
    expect(screen.getByRole('heading', { name: /Encontre o café perfeito/ })).toBeInTheDocument()
  })

  it('renders the checkout page at /checkout', () => {
    renderWithProviders(<App />, { route: '/checkout' })
    expect(screen.getByRole('heading', { name: 'Complete seu pedido' })).toBeInTheDocument()
  })

  it('redirects unknown routes to the home page', () => {
    renderWithProviders(<App />, { route: '/rota-inexistente' })
    expect(screen.getByRole('heading', { name: /Encontre o café perfeito/ })).toBeInTheDocument()
  })

  it('shows a header link to the cart', () => {
    renderWithProviders(<App />)
    expect(screen.getByRole('link', { name: /Ver carrinho/ })).toHaveAttribute('href', '/checkout')
  })
})
