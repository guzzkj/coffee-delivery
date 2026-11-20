import styled from 'styled-components'

export const LogoContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`

export const LogoText = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1;

  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.25rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.purpleDark};
  }

  span {
    font-size: 0.6875rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.yellowDark};
  }
`
