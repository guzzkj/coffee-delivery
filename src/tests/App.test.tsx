import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { renderWithProviders } from './renderWithProviders'

describe('App routes', () => {
  it('renders the home page at /', () => {
    renderWithProviders(<App />)
    expect(screen.getByRole('heading', { name: /Encontre o café perfeito/ })).toBeInTheDocument()
  })

  it('IT-02: renders the empty cart state at /checkout when the cart is empty', () => {
    renderWithProviders(<App />, { route: '/checkout' })
    expect(screen.getByRole('heading', { name: 'Seu carrinho está vazio' })).toBeInTheDocument()
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

describe('Empty cart (RN-09, RF-11)', () => {
  it('offers a link back to the catalog and no confirm button', () => {
    renderWithProviders(<App />, { route: '/checkout' })
    expect(screen.getByRole('link', { name: 'Ver cafés' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('button', { name: /Confirmar pedido/i })).not.toBeInTheDocument()
  })
})
