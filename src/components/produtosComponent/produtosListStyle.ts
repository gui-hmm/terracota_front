import styled from "styled-components";

// Container de cada produto
export const ContainerProduto = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

// Imagem do produto
export const ImageProduto = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 12px;
`;

// Nome do produto
export const NomeProduto = styled.h3`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 0 10px 10px;
`;

// Valor do produto
export const ValorProduto = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
  text-align: center;
`;
