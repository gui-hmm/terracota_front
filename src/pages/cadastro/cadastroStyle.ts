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

export const ConteinerCadastroText = styled.div`
    margin-left: 8%;
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

export const TextCadastro = styled.div`
    font-size: 26px;
    font-weight: 200;
`;

export const ContainerCadastroGeral = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 80px;
    row-gap: 50px;
    position: relative;
    margin: 20px 50px 10px 3%;
`;

export const ImageCadastro = styled.img`
    width: 800px;
    height: auto;
    background-size: contain;
`;

export const ContainerCadastro = styled.div`
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

export const InputCadastro = styled.input`
    border: none;
    padding: 5px;
    outline: none;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    width: 300px;
    height: 25px;

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
