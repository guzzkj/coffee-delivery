import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const HeroContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.5rem;
  padding: 5.75rem 0;

  /* Fundo desfocado amarelo/roxo do Figma, ocupando a largura toda da tela */
  &::before {
    content: '';
    position: absolute;
    inset: 0 calc(50% - 50vw);
    z-index: -1;
    background:
      radial-gradient(circle at 70% 45%, ${({ theme }) => theme.colors.yellowLight} 0, transparent 35%),
      radial-gradient(circle at 15% 25%, ${({ theme }) => theme.colors.purpleLight} 0, transparent 30%),
      radial-gradient(circle at 85% 80%, ${({ theme }) => theme.colors.purpleLight} 0, transparent 25%);
    filter: blur(40px);
  }
`

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.125rem;
  max-width: 36.75rem;

  h1 {
    ${typography.titleXL}
    color: ${({ theme }) => theme.colors.title};
  }

  p {
    margin-top: 1rem;
    ${typography.textL}
    color: ${({ theme }) => theme.colors.subtitle};
  }
`

export const Benefits = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 2.5rem;
`

export const Benefit = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  ${typography.textM}
  color: ${({ theme }) => theme.colors.text};
`

type BenefitIconProps = {
  $color: 'yellowDark' | 'text' | 'yellow' | 'purple'
}

export const BenefitIcon = styled.span<BenefitIconProps>`
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

export const HeroImage = styled.img`
  width: 29.75rem;
  height: auto;
`
