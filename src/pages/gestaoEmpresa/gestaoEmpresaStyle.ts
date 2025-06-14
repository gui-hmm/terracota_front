import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem;

  .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #802600;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: ${spin} 1s linear infinite;
  }
`;

export const SpinnerButton = styled.div`
  border: 3px solid #FFFFFF;
  border-left-color: #555;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  margin: auto;
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

export const ConteinerGestaoEmpresasText = styled.div`
  margin-left: 2%;
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

export const TextGestaoEmpresas = styled.div`
  font-size: 26px;
  font-weight: 200;
`;

export const ContainerArtesao = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

export const ContainerSelecionarArtesao = styled.div`
  width: 100%;
  max-width: 350px;
`;

export const Titles = styled.div`
  color: #802600;
  font-size: 35px;
  font-weight: 400;
  margin: 25px 0px 15px 0px;

  @media (max-width: 480px) {
    font-size: 30px;
  }

  @media (max-width: 360px) {
    font-size: 25px;
  }
`;

export const ContainerInputs = styled.div`
  margin-top: 10px;
`;

export const TextInput = styled.div`
  font-size: 16px;
  font-weight: 350;
  color: rgba(128, 38, 0, 1);
`;

export const CardArtesaoSelecionado = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px; 
  border-radius: 4px;
`;

export const ArtesaoList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const ContainerProdutos = styled.div`
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
`;

export const InputProdutos = styled.input`
  width: 93%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: solid 1px #802600;
`;

export const Select = styled.select`
  width: 99%;
  margin-bottom: 0.5rem;
  margin-top: 5px;
  padding: 0.5rem;
  border: solid 1px #802600;
`;

export const Button = styled.button`
  min-width: 90px;
  height: 36px;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.4rem 0.6rem;
  background-color: #802600;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #000000;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ProductItem = styled.div`
  border: solid 1.5px #802600;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  display: flex;
  flex-direction: column;
  align-items: center;


  @media (max-width: 380px) {
    width: 80%;
  }

  @media (max-width: 320px) {
    width: 70%;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: center;
`;

export const ProductImage = styled.img`
  width: 100px; 
  height: 100px; 
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const StyledFileInput = styled.input`
  display: none; 
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 8px 15px;
  background-color: #fff;
  color: #333;
  border: 1px solid #802600;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
  font-size: 0.9em;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
  object-fit: contain;
`;