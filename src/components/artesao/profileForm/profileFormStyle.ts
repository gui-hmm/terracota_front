import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  input {
    padding: 0.5rem;
    border: 1px solid #c8a070;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    padding: 0.6rem;
    background-color: #a0522d;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      background-color: #7a3e20;
    }
  }
`;
