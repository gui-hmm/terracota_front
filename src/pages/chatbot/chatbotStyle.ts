import styled from "styled-components";

export const PageContainer = styled.div`
  margin: 150px 25px 50px 25px;

  @media (max-width: 768px) {
    margin-top: 270px;
  }
`;

export const ConteinerProdutosText = styled.div`
  margin-left: 2%;
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

export const TextProdutos = styled.div`
  font-size: 26px;
  font-weight: 200;
`;


export const ChatContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 600px;
  margin: auto;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff5f5;
`;

export const ChatHeader = styled.div`
  height: 60px;
  background-color: #800000;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MessageBubble = styled.div`
  padding: 10px 15px;
  max-width: 70%;
  border-radius: 15px;
  font-size: 16px;
  &.user {
    background-color: #800000;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 0;
  }
  &.bot {
    background-color: #f0f0f0;
    color: black;
    align-self: flex-start;
    border-bottom-left-radius: 0;
  }
`;

export const ChatInputContainer = styled.div`
  padding: 15px 20px;
  display: flex;
  gap: 10px;
  border-top: 1px solid #dcdcdc;

  @media (max-width: 350px) {
    gap: 5px;
  }
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 8px;

  @media (max-width: 350px) {
    padding-right: 0;

    &::placeholder {
        font-size: 12px;
    }
  }
`;

export const ChatButton = styled.button`
  background-color: #800000;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #a00000;
  }
`;
