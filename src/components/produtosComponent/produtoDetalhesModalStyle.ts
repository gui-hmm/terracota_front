import styled from "styled-components";

// Estilos do Modal (Fundo, Centralização)
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Sobreposição escura */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Conteúdo do Modal (caixa de diálogo)
export const ModalContent = styled.div`
  background-color: #fff;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* Importante para permitir o clique fora do conteúdo */
`;

// Cabeçalho do Modal
export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

// Botão de Fechar (X)
export const BotaoFechar = styled.button`
  background: none;
  border: none;
  font-size: 26px;
  color: #333;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #f00; /* Cor vermelha para indicar que é um botão de fechar */
  }
`;

// Corpo do Modal (onde as informações do produto são exibidas)
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

// Imagem do produto
export const ModalImage = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 15px;
`;

// Nome do produto no modal
export const ModalNome = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

// Preço do produto no modal
export const ModalPreco = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 20px;
`;

// Controles de Quantidade (botões de aumento e diminuição)
export const ControlesQuantidade = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  button {
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #ddd;
    }
  }

  span {
    font-size: 18px;
    margin: 0 10px;
  }
`;

// Botão para Adicionar ao Carrinho
export const BotaoAdicionar = styled.button`
  background-color: #27ae60;
  color: #fff;
  padding: 10px 20px;
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

// Rodapé do Modal (onde ficam as ações: adicionar ao carrinho ou fechar)
export const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
