import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { EmptyStateContainer } from './styles'

type EmptyStateProps = {
  icon: ReactNode
  title: string
  description: string
  linkLabel: string
  linkTo: string
}

// Estado vazio reutilizável (carrinho sem itens, página de sucesso sem pedido)
export function EmptyState({ icon, title, description, linkLabel, linkTo }: EmptyStateProps) {
  return (
    <EmptyStateContainer>
      {icon}
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to={linkTo}>{linkLabel}</Link>
    </EmptyStateContainer>
  )
}
