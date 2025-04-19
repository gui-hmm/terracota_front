import styled from 'styled-components';

export const CardContainer = styled.div`
  background: #fff8f1;
  border: 1px solid #f1c3a0;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const Info = styled.div`
  margin-top: 0.5rem;
  h3 {
    margin: 0.5rem 0;
    color: #a0522d;
  }
  p {
    margin: 0.2rem 0;
    font-size: 0.9rem;
    color: #333;
  }
`;

export const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  button {
    background-color: #a0522d;
    color: white;
    border: none;
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: background 0.3s;
    &:hover {
      background-color: #7a3e20;
    }
  }
`;
