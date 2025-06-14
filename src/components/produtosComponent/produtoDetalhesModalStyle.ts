import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  width: 90%;
  max-width: 500px;
  max-height: 92%;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; 
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  `;

export const BotaoFechar = styled.button`
  background: none;
  border: none;
  font-size: 26px;
  color: #333;
  cursor: pointer;
  transition: color 0.2s ease;
  margin-bottom: 5px;

  &:hover {
    color: #f00; 
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  overflow-y: auto;

`;

export const ModalImage = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 5px;
`;

export const ModalNome = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

export const ModalDescricao = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
`;

export const ModalPreco = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #802600;
  margin-bottom: 20px;
`;

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

export const ModalFooter = styled.div`
  width: 100%;
  display: flex;
`;

export const BotaoAdicionar = styled.button`
  background-color: #802600;
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

export const CarrosselContainer = styled.div`
  width: 100%;
  margin: 20px 0;
`;

export const CarrosselTitulo = styled.h4`
  margin-bottom: 15px;
  color: #333;
  font-size: 1.2rem;
`;

export const CarrosselLista = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const CarrosselItem = styled.div`
  position: relative;
  scroll-snap-align: start;
  min-width: 150px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.01);
  }
`;

export const CarrosselImagem = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
`;

export const CarrosselNome = styled.p`
  margin: 8px 0;
  font-size: 0.9rem;
  color: #555;
`;

export const CarrosselPreco = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: #2a2a2a;
`;

export const CarrosselMensagem = styled.p`
  text-align: center;
  color: #666;
  padding: 20px 0;
`;

export const CarrosselBotaoAdicionar = styled.button`
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: #802600;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #2ecc71;
    transform: scale(1.05);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;