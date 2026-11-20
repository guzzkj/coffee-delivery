import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { coffees } from '../data/coffees'
import { Home } from '../pages/Home'
import { renderWithProviders } from './renderWithProviders'

describe('Home catalog', () => {
  it('renders every coffee with name, description, tags and price', () => {
    renderWithProviders(<Home />)
    const list = screen.getByRole('heading', { name: 'Nossos cafés' }).nextElementSibling as HTMLElement
    const cards = within(list).getAllByRole('heading', { level: 3 })

    expect(cards).toHaveLength(coffees.length)
    expect(screen.getByText('Expresso Tradicional')).toBeInTheDocument()
    expect(screen.getByText('O tradicional café feito com água quente e grãos moídos')).toBeInTheDocument()
    expect(screen.getAllByText('9,90')).toHaveLength(coffees.length)
  })
})
