// Serviço da API pública ViaCEP (D-05): só faz HTTP e normaliza a resposta.
// Não guarda estado nem mexe na tela.
const BASE_URL = 'https://viacep.com.br/ws'

export type CepAddress = {
  street: string
  neighborhood: string
  city: string
  state: string
}

export type CepErrorKind = 'invalid' | 'not-found' | 'unavailable'

export class CepLookupError extends Error {
  readonly kind: CepErrorKind

  constructor(kind: CepErrorKind, message: string) {
    super(message)
    this.name = 'CepLookupError'
    this.kind = kind
  }
}

// Formato da resposta da ViaCEP (só os campos que usamos)
type ViaCepResponse = {
  logradouro?: string
  bairro?: string
  localidade?: string
  uf?: string
  erro?: boolean | string
}

export function sanitizeCep(cep: string): string {
  return cep.replace(/\D/g, '')
}

export async function fetchAddressByCep(cep: string, signal?: AbortSignal): Promise<CepAddress> {
  const digits = sanitizeCep(cep)

  if (digits.length !== 8) {
    throw new CepLookupError('invalid', 'CEP deve ter 8 dígitos')
  }

  let response: Response
  try {
    response = await fetch(`${BASE_URL}/${digits}/json/`, { signal })
  } catch (error) {
    // busca cancelada (o usuário trocou o CEP): repassa o erro original
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new CepLookupError('unavailable', 'Não foi possível consultar o CEP agora. Preencha o endereço manualmente.')
  }

  if (!response.ok) {
    throw new CepLookupError('unavailable', 'Não foi possível consultar o CEP agora. Preencha o endereço manualmente.')
  }

  const data = (await response.json()) as ViaCepResponse

  // A ViaCEP responde 200 com { "erro": true } quando o CEP não existe
  if (data.erro) {
    throw new CepLookupError('not-found', 'CEP não encontrado. Confira o número ou preencha o endereço manualmente.')
  }

  return {
    street: data.logradouro ?? '',
    neighborhood: data.bairro ?? '',
    city: data.localidade ?? '',
    state: data.uf ?? '',
  }
}
