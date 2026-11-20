import styled from 'styled-components'
import { media } from '../../styles/breakpoints'
import { typography } from '../../styles/typography'

// Grade igual ao Figma: CEP (+ status da busca) | Rua | Número + Complemento | Bairro + Cidade + UF
export const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: 12.5rem 1fr 3.75rem;
  grid-template-areas:
    'cep status status'
    'street street street'
    'number complement complement'
    'neighborhood city state';
  gap: 1rem 0.75rem;

  ${media.mobile} {
    grid-template-columns: minmax(0, 1fr) 4rem;
    grid-template-areas:
      'cep cep'
      'status status'
      'street street'
      'number number'
      'complement complement'
      'neighborhood neighborhood'
      'city state';
  }

  .cep {
    grid-area: cep;
  }
  .cep-status {
    grid-area: status;
  }
  .street {
    grid-area: street;
  }
  .number {
    grid-area: number;
  }
  .complement {
    grid-area: complement;
  }
  .neighborhood {
    grid-area: neighborhood;
  }
  .city {
    grid-area: city;
  }
  .state {
    grid-area: state;
  }
`

type CepStatusProps = {
  $isError: boolean
}

export const CepStatus = styled.p<CepStatusProps>`
  align-self: center;
  ${typography.textS}
  font-size: 0.75rem;
  color: ${({ theme, $isError }) => ($isError ? theme.colors.danger : theme.colors.text)};

  /* no mobile o status ocupa uma linha própria: vazio, não deixa buraco na grade */
  ${media.mobile} {
    &:empty {
      margin-top: -1rem;
    }
  }
`
