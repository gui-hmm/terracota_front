import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-left-color: #555;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  margin: 5px auto;
`;


export const ChatContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff5f5;
  box-sizing: border-box;
`;

export const IconVoltar = styled.img`
  width: auto;
  height: 23px;
  margin-top: 6px;
  margin-right: 15px;
  cursor: pointer;
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
