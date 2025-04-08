import styled from "styled-components";

export const Container = styled.div`
  width: auto;
  margin: 100px auto 50px;
  padding: 50px;
  background-color: #fff;

  @media (max-width: 768px) {
    margin-top: 270px;
  }
`;

export const ConteinerCarrinhoText = styled.div`
  margin-left: 1.5%;
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

export const TextCarrinho = styled.div`
  font-size: 26px;
  font-weight: 200;
`;

export const ContainerProdutos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Ajustado para um mínimo de 280px */
  gap: 20px;
  width: 100%;
  height: auto;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Para tablets */
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* Para dispositivos móveis */
  }

  @media (max-width: 320px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Para dispositivos muito pequenos */
  }
`;


export const ProdutoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProdutoImagem = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

export const ProdutoInfo = styled.div`
  flex: 1;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProdutoNome = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const ProdutoValor = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 10px;
`;

export const QuantidadeControle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  button {
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      background-color: #ddd;
    }
  }

  span {
    font-size: 18px;
    margin: 0 10px;
  }
`;

export const ContainerTotal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContainerButons = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalValor = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: right;
`;

export const BotaoEsvaziar = styled.button`
  background-color: #e74c3c;
  color: #fff;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
  margin-right: 20px;

  &:hover {
    background-color: #c0392b;
  }
`;

export const BotaoFinalizar = styled.button`
  background-color: #27ae60;
  color: #fff;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2ecc71;
  }
`;

