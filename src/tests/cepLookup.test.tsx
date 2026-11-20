import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { STORAGE_KEYS } from '../utils/storage'
import { renderWithProviders } from './renderWithProviders'

const jsonResponse = (body: unknown) =>
  Promise.resolve(new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } }))

beforeEach(() => {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify([{ coffeeId: 'latte', quantity: 1 }]))
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('CEP autofill (RF-08, RN-07)', () => {
  it('fills street, neighborhood, city and UF and leaves number for the user', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
      jsonResponse({ logradouro: 'Rua João Daniel Martinelli', bairro: 'Farrapos', localidade: 'Porto Alegre', uf: 'RS' }),
    )
    renderWithProviders(<App />, { route: '/checkout' })

    await user.type(screen.getByLabelText('CEP'), '90250-440')

    expect(await screen.findByText('Endereço encontrado. Informe o número.')).toBeInTheDocument()
    expect(screen.getByLabelText('Rua')).toHaveValue('Rua João Daniel Martinelli')
    expect(screen.getByLabelText('Bairro')).toHaveValue('Farrapos')
    expect(screen.getByLabelText('Cidade')).toHaveValue('Porto Alegre')
    expect(screen.getByLabelText('UF')).toHaveValue('RS')
    expect(screen.getByLabelText('Número')).toHaveValue('')
    expect(screen.getByLabelText('Número')).toHaveFocus()
  })

  it('shows an error for a CEP that does not exist and keeps fields editable', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => jsonResponse({ erro: true }))
    renderWithProviders(<App />, { route: '/checkout' })

    await user.type(screen.getByLabelText('CEP'), '99999999')

    expect(await screen.findByText(/CEP não encontrado/)).toBeInTheDocument()
    await user.type(screen.getByLabelText('Rua'), 'Rua digitada à mão')
    expect(screen.getByLabelText('Rua')).toHaveValue('Rua digitada à mão')
  })

  it('shows an error when the API is unavailable', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => Promise.reject(new TypeError('Failed to fetch')))
    renderWithProviders(<App />, { route: '/checkout' })

    await user.type(screen.getByLabelText('CEP'), '90250440')

    expect(await screen.findByText(/Não foi possível consultar o CEP agora/)).toBeInTheDocument()
  })
})
