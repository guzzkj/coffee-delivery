const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const numberFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

// RN-04: valores guardados em centavos e convertidos só na exibição
export function formatCurrency(cents: number): string {
  return brlFormatter.format(cents / 100)
}

// Só o número, sem "R$" (o card do Figma mostra "R$" menor, separado do valor)
export function formatPrice(cents: number): string {
  return numberFormatter.format(cents / 100)
}
