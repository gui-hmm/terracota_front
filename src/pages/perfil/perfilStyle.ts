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
    margin: 120px 25px 50px 25px;
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
    `;

export const IconVoltar = styled.img`
    width: auto;
    height: 23px;
    margin-top: 6px;
    margin-right: 15px;
    cursor: pointer;
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
    width: 310px;
    height: 38px;
    font-size: 16px;
    ${({ disabled }) => (disabled ? `background-color:rgb(202, 202, 202);` : `background-color: #f3f3f3;`)};
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
    margin-top: 20px;
`;

export const ButtonEditar = styled.div`
    width: 110px;
    height: 50px;
    background-color: #802600;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
    border-radius: 5px;
`;

export const ButtonSalvar = styled.button`
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
    border: none; 
    border-radius: 5px;

    &:disabled {
        background-color:rgba(76, 175, 79, 0.75);
        color: #802600;
        cursor: not-allowed;
    }
`;

export const PreviewImage = styled.img`
    max-width: 100px; 
    max-height: 100px; 
    margin-top: 10px; 
    border-radius: 50%; 
    object-fit: cover; 
    border: 1px solid #ddd;
`;

export const ContainerImageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
  width: 300px; 
`;

export const UserProfilePhoto = styled.img`
  width: 150px; 
  height: 150px;
  border-radius: 50%; 
  object-fit: cover;  
  border: 3px solid #ddd; 
  margin-bottom: 10px; 
  background-color: #f0f0f0; 
`;

export const StyledFileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 8px 12px; 
  background-color: #802600; 
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  text-align: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #602600; 
  }
`;