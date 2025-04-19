import styled from 'styled-components';

export const FiltroContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;

  input,
  select {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #d8b08c;
    font-size: 0.9rem;
  }

  input {
    flex: 1;
    min-width: 200px;
  }

  select {
    min-width: 150px;
  }
`;
