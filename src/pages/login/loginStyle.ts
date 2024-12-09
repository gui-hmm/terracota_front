import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: auto;
    margin: 150px 25px 50px 25px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
`;

export const ConteinerLoginText = styled.div`
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

export const TextLogin = styled.div`
    font-size: 26px;
    font-weight: 200;
`;

export const ContainerLoginGeral = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 50px;
    position: relative;
    margin: 20px 50px 10px 8%;
`;

export const ImageLogin = styled.img`
    width: 450px;
    height: auto;
    background-size: contain;
`;

export const ContainerLogin = styled.div`
    width: 350px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
`;

export const Text1 = styled.div`
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 12px;
`;

export const Text2 = styled.div`
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 20px;
`;

export const Label = styled.label`
    font-size: 16px;
    color: #949494;
    margin-bottom: 5px;
    display: block;
`;

export const InputLogin = styled.input`
    border: none;
    padding: 5px;
    outline: none;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    width: 300px;
    height: 25px;

    &::placeholder {
        color: #c0c0c0;
    }

`;

export const ContainerText3 = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    align-items: start;
    justify-content: start;
`;

export const Text3 = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: #800000;
`;

export const Text4 = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: #800000;
    text-decoration: underline;
    margin-left: 5px;
    cursor: pointer;
`;

export const ContainerButton = styled.div`
    display: flex;
    flex-direction: row;
    width: 330px;
    height: 50px;
    align-items: center;
    justify-content: start;
    margin-top: 60px;
`;

export const ButtonEntrar = styled.div`
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

export const ButtonEsqueceuSenha = styled.div`
    width: 150px;
    height: 50px;
    background-color: #fff;
    color: #800000;
    font-size: 17px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

export const TextInput = styled.div`
    font-size: 16px;
    color: #949494;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px; 
`;