import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  button {
    margin: 1rem 0;
    padding: 0.6rem 1.2rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #45a049;
    }
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
`;
