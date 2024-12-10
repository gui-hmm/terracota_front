import styled from "styled-components";

export const Container = styled.div`
  width: auto;
  margin: 150px auto 50px;
  padding: 50px;
  background-color: #fff;
`;

// Texto que aparece na parte superior da tela de produtos
export const ConteinerCarrinhoText = styled.div`
  margin-left: 3%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

// Ícone de voltar
export const IconVoltar = styled.img`
  width: auto;
  height: 23px;
  margin-top: 6px;
  margin-right: 15px;
`;

// Texto "Produtos"
export const TextCarrinho = styled.div`
  font-size: 26px;
  font-weight: 200;
`;

export const ContainerProdutos = styled.div`
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

export const TotalValor = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: right;
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

export const BotaoEsvaziar = styled.button`
  background-color: #e74c3c;
  color: #fff;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;
