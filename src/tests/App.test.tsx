import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from '../App'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routes', () => {
  it('renders the home page at /', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
  })

  it('renders the checkout page at /checkout', () => {
    renderAt('/checkout')
    expect(screen.getByRole('heading', { name: 'Checkout' })).toBeInTheDocument()
  })

  it('redirects unknown routes to the home page', () => {
    renderAt('/rota-inexistente')
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
  })
})
