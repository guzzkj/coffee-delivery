import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const BadgeContainer = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.25rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.yellowDark};
  color: ${({ theme }) => theme.colors.onAccent};
  ${typography.textXS}
`
