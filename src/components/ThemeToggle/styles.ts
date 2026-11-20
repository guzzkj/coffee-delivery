import styled from 'styled-components'

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.purpleLight};
  color: ${({ theme }) => theme.colors.purple};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.button};
  }
`
