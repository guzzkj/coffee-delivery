import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { STORAGE_KEYS } from '../utils/storage'
import { renderWithProviders } from './renderWithProviders'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Full purchase flow (IT-04)', () => {
  it('goes from the catalog to the success page and keeps the order after a reload', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({ logradouro: 'Avenida Paulista', bairro: 'Bela Vista', localidade: 'São Paulo', uf: 'SP' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const { unmount } = renderWithProviders(<App />)

    // 1. Home: 2 Latte + 1 Capuccino
    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    await user.click(screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }))
    await user.click(screen.getByRole('button', { name: 'Adicionar Capuccino ao carrinho' }))
    await user.click(screen.getByRole('link', { name: 'Ver carrinho, 3 itens' }))

    // 2. Checkout: totais derivados (3 × R$ 9,90 + R$ 3,50)
    const summary = screen.getByRole('button', { name: /Confirmar pedido/i }).closest('div')!
    expect(within(summary).getByText('R$ 29,70')).toBeInTheDocument()
    expect(within(summary).getByText('R$ 33,20')).toBeInTheDocument()

    // remove o Capuccino: total recalcula
    await user.click(screen.getByRole('button', { name: 'Remover Capuccino do carrinho' }))
    expect(within(summary).getByText('R$ 23,30')).toBeInTheDocument()

    // 3. Endereço pelo CEP + número + pagamento
    await user.type(screen.getByLabelText('CEP'), '01310-100')
    expect(await screen.findByDisplayValue('Avenida Paulista')).toBeInTheDocument()
    await user.type(screen.getByLabelText('Número'), '1000')
    await user.click(screen.getByRole('radio', { name: 'Dinheiro' }))
    await user.click(screen.getByRole('button', { name: /Confirmar pedido/i }))

    // 4. Sucesso com os dados do pedido e carrinho zerado
    expect(await screen.findByRole('heading', { name: 'Uhu! Pedido confirmado' })).toBeInTheDocument()
    expect(screen.getByText('Avenida Paulista, 1000')).toBeInTheDocument()
    expect(screen.getByText('Dinheiro')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver carrinho, vazio' })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.lastOrder)!)).toMatchObject({ totalInCents: 2330 })

    // 5. "F5" em /success: o pedido continua na tela
    unmount()
    renderWithProviders(<App />, { route: '/success' })
    expect(screen.getByText('Avenida Paulista, 1000')).toBeInTheDocument()
  })
})
