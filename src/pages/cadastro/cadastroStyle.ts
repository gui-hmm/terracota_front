import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-left-color: #555;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  margin: 5px auto;
`;

export const Container = styled.div`
    width: 100%;
    height: auto;
    margin: 125px 25px 50px 25px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
`;

export const ConteinerCadastroText = styled.div`
    margin-left: 3%;
    margin-bottom: 50px;
    display: flex;
    flex-direction: row;
    `;

export const IconVoltar = styled.img`
    width: auto;
    height: 23px;
    margin-top: 6px;
    margin-right: 15px;
    cursor: pointer;
`;

export const TextCadastro = styled.div`
    font-size: 26px;
    font-weight: 200;
`;

export const ContainerCadastroGeral = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    position: relative;
    margin: 20px 50px 10px 3%;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const ImageCadastro = styled.img`
    width: 55%;
    height: 20%;
    background-size: contain;
    margin-right: 5%;

    @media (max-width: 768px) {
        width: 80%;
    }
`;

export const ContainerCadastro = styled.div`
    width: 350px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: start;

    @media (max-width: 768px) {
        margin-top: 30px;
    }
`;

export const Text1 = styled.div`
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 36px;
`;

export const TextInput = styled.div`
    font-size: 16px;
    color: #949494;
`;

export const InputCadastro = styled.input`
    border: none;
    padding: 5px;
    outline: none;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    width: 300px;
    height: 25px;
`;

export const SelectInput = styled.select`
    border: none;
    padding: 5px;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    width: 310px;
    height: 45px;
`;

export const ContainerText2 = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    align-items: start;
    justify-content: start;
`;

export const Checkbox = styled.input`
    margin-right: 10px;
`;

export const Text2 = styled.div`
    font-size: 16px;
    font-weight: 400;
    margin-left: 5px;
`;

export const ContainerButton = styled.div`
    display: flex;
    flex-direction: row;
    width: 330px;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
`;

// cadastroStyle.ts
export const ButtonEntrar = styled.button`
  width: 110px;
  height: 50px;
  background-color: #800000;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
  border: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

