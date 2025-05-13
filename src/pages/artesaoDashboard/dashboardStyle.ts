import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 150px 25px 50px 25px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  @media (max-width: 768px) {
    margin-top: 270px;
  }

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
    background-color: #802600;
    color: white;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #502000;
  }
`;