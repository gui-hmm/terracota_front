import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .cards {
    display: flex;
    gap: 20px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #f97316;
    color: white;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #ea580c;
  }
`;