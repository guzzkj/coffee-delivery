import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CoffeeCard } from '../components/CoffeeCard'
import { coffees } from '../data/coffees'
import { renderWithProviders } from './renderWithProviders'

describe('Coffee card quantity (RF-02, RN-01)', () => {
  it('starts at 1, increments and never goes below 1', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CoffeeCard coffee={coffees[0]} />)

    const minus = screen.getByRole('button', { name: /Diminuir quantidade/ })
    const plus = screen.getByRole('button', { name: /Aumentar quantidade/ })

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(minus).toBeDisabled()

    await user.click(plus)
    await user.click(plus)
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(minus).toBeEnabled()

    await user.click(minus)
    await user.click(minus)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(minus).toBeDisabled()
  })
})
