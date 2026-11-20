import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const SuccessContainer = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2.5rem;
  margin-top: 5rem;

  img {
    width: 30.75rem;
    height: auto;
  }
`

export const SuccessHeader = styled.header`
  h1 {
    ${typography.titleL}
    color: ${({ theme }) => theme.colors.yellowDark};
  }

  p {
    margin-top: 0.25rem;
    ${typography.textL}
    color: ${({ theme }) => theme.colors.subtitle};
  }
`

// Borda em degradê amarelo → roxo, como no Figma (truque: duas camadas de fundo)
export const DetailsCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 32.875rem;
  margin-top: 2.5rem;
  padding: 2.5rem;
  border: 1px solid transparent;
  border-radius: 6px 36px;
  background:
    linear-gradient(${({ theme }) => theme.colors.background}, ${({ theme }) => theme.colors.background}) padding-box,
    linear-gradient(102.89deg, ${({ theme }) => theme.colors.yellow} 2.61%, ${({ theme }) => theme.colors.purple} 98.76%)
      border-box;
`

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  ${typography.textM}
  color: ${({ theme }) => theme.colors.text};
`

type DetailIconProps = {
  $color: 'purple' | 'yellow' | 'yellowDark'
}

export const DetailIcon = styled.span<DetailIconProps>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${({ theme, $color }) => theme.colors[$color]};
  color: ${({ theme }) => theme.colors.background};
`
