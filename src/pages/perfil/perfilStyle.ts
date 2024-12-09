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
`;

export const ImagePerfil = styled.img`
    width: 800px;
    height: auto;
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

