import React, { useState } from "react";
import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  ChatInputContainer,
  ChatInput,
  ChatButton,
  MessageBubble,
  IconVoltar,
  PageContainer,
  TextProdutos,
  ConteinerProdutosText
} from "./chatbotStyle";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Voltar from "../../assets/menorQue.png";
import { useNavigate } from "react-router-dom";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Olá! Em que posso te ajudar hoje?" },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const sendMessage = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    // Simula resposta do bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "bot", text: "Estou pensando na melhor resposta para você..." },
      ]);
    }, 1000);
  };

  return (
    <>
        <Header/>
        <PageContainer>
        <Header />
        <ConteinerProdutosText>
            <IconVoltar src={Voltar} onClick={() => navigate("/")} />
            <TextProdutos>Assistente terracora</TextProdutos>
        </ConteinerProdutosText>
        <ChatContainer>
            <ChatHeader>Chat de Suporte</ChatHeader>
            <ChatMessages>
            {messages.map((msg, index) => (
                <MessageBubble
                key={index}
                className={msg.sender === "user" ? "user" : "bot"}
                >
                {msg.text}
                </MessageBubble>
            ))}
            </ChatMessages>
            <ChatInputContainer>
            <ChatInput
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                if (e.key === "Enter") sendMessage();
                }}
            />
            <ChatButton onClick={sendMessage}>Enviar</ChatButton>
            </ChatInputContainer>
        </ChatContainer>
        </PageContainer>
        <Footer />
    </>
  );
};

export default Chatbot;
