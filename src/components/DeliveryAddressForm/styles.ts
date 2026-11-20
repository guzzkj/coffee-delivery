import styled from 'styled-components'

// Grade igual ao Figma: CEP | Rua (linha toda) | Número + Complemento | Bairro + Cidade + UF
export const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: 12.5rem 1fr 3.75rem;
  grid-template-areas:
    'cep . .'
    'street street street'
    'number complement complement'
    'neighborhood city state';
  gap: 1rem 0.75rem;

  .cep {
    grid-area: cep;
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
