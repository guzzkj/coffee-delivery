import { afterEach, describe, expect, it, vi } from 'vitest'
import { CepLookupError, fetchAddressByCep, sanitizeCep } from '../services/viaCep'

function mockFetch(implementation: () => Promise<Response>) {
  return vi.spyOn(globalThis, 'fetch').mockImplementation(implementation)
}

const jsonResponse = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }))

afterEach(() => {
  vi.restoreAllMocks()
})

describe('viaCep service (UT-09)', () => {
  it('sanitizes non-digit characters', () => {
    expect(sanitizeCep('90.250-440')).toBe('90250440')
  })

  it('normalizes a successful response', async () => {
    const fetchSpy = mockFetch(() =>
      jsonResponse({ logradouro: 'Rua João Daniel Martinelli', bairro: 'Farrapos', localidade: 'Porto Alegre', uf: 'RS' }),
    )

    await expect(fetchAddressByCep('90250-440')).resolves.toEqual({
      street: 'Rua João Daniel Martinelli',
      neighborhood: 'Farrapos',
      city: 'Porto Alegre',
      state: 'RS',
    })
    expect(fetchSpy).toHaveBeenCalledWith('https://viacep.com.br/ws/90250440/json/', expect.anything())
  })

  it('reports a CEP that does not exist', async () => {
    mockFetch(() => jsonResponse({ erro: true }))
    await expect(fetchAddressByCep('99999999')).rejects.toMatchObject({ kind: 'not-found' })
  })

  it('reports network failures as unavailable', async () => {
    mockFetch(() => Promise.reject(new TypeError('Failed to fetch')))
    await expect(fetchAddressByCep('90250440')).rejects.toMatchObject({ kind: 'unavailable' })
  })

  it('reports HTTP errors as unavailable', async () => {
    mockFetch(() => jsonResponse({}, 500))
    await expect(fetchAddressByCep('90250440')).rejects.toBeInstanceOf(CepLookupError)
  })

  it('rejects incomplete CEPs without calling the API', async () => {
    const fetchSpy = mockFetch(() => jsonResponse({}))
    await expect(fetchAddressByCep('9025')).rejects.toMatchObject({ kind: 'invalid' })
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
