import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #555;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;


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
`;

export const ConteinerPerfilText = styled.div`
    margin-left: 3%;
    margin-bottom: 50px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
`;

export const IconVoltar = styled.img`
    width: auto;
    height: 23px;
    margin-top: 6px;
    margin-right: 15px;
`;

export const TextPerfil = styled.div`
    font-size: 26px;
    font-weight: 200;
`;

export const ContainerPerfilGeral = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 80px;
    row-gap: 50px;
    position: relative;
    margin: 20px 50px 10px 3%;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
    } 
`;

export const ImagePerfil = styled.img`
    width: 85%;
    background-size: contain;
`;

export const ContainerPerfil = styled.div`
    width: 400px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
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

export const InputPerfil = styled.input`
    border: none;
    padding: 5px;
    outline: none;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    width: 300px;
    height: 25px;
    ${({ disabled }) => (disabled ? `background-color: #e0e0e0;` : `background-color: #f3f3f3;`)};
`;

export const SelectInput = styled.select`
    border: none;
    padding: 5px;
    outline: none;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    width: 300px;
    height: 35px;
    font-size: 16px;
    ${({ disabled }) => (disabled ? `background-color: #e0e0e0;` : `background-color: #f3f3f3;`)};
    option {
        font-size: 16px;
    }
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

export const ButtonEditar = styled.div`
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
`;

export const ButtonSalvar = styled.div`
    width: 110px;
    height: 50px;
    background-color: #4CAF50;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
`;

