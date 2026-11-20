// Chaves versionadas: se o formato salvo mudar, basta trocar o sufixo (D-16)
export const STORAGE_KEYS = {
  cart: '@coffee-delivery:cart-1.0.0',
  lastOrder: '@coffee-delivery:last-order-1.0.0',
  theme: '@coffee-delivery:theme-1.0.0',
} as const

// Lê e converte o JSON salvo; qualquer falha devolve null (nunca quebra a tela)
export function readStorage(key: string): unknown {
  try {
    const saved = localStorage.getItem(key)
    return saved === null ? null : (JSON.parse(saved) as unknown)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // armazenamento cheio ou bloqueado: o app continua funcionando sem salvar
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignora
  }
}
