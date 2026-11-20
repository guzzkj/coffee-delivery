import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { STORAGE_KEYS } from '../utils/storage'
import { renderWithProviders } from './renderWithProviders'

function mockSystemPrefersDark(prefersDark: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({ matches: prefersDark && query.includes('dark'), media: query })),
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Theme toggle (RF-14)', () => {
  it('IT-05: toggles the theme and persists the choice', async () => {
    const user = userEvent.setup()
    mockSystemPrefersDark(false)
    const { unmount } = renderWithProviders(<App />)

    const toggle = screen.getByRole('button', { name: 'Tema escuro' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('"dark"')

    // remontar (como um F5) mantém o tema escolhido
    unmount()
    renderWithProviders(<App />)
    expect(screen.getByRole('button', { name: 'Tema escuro' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('uses the system preference when nothing is saved', () => {
    mockSystemPrefersDark(true)
    renderWithProviders(<App />)
    expect(screen.getByRole('button', { name: 'Tema escuro' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('prefers the saved choice over the system preference', () => {
    mockSystemPrefersDark(true)
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify('light'))
    renderWithProviders(<App />)
    expect(screen.getByRole('button', { name: 'Tema escuro' })).toHaveAttribute('aria-pressed', 'false')
  })
})
