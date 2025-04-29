import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  ChatInputContainer,
  ChatInput,
  ChatButton,
  MessageBubble,
  IconVoltar,
  Spinner
} from "./chatbotStyle";
import Voltar from "../../assets/menor_que_branco.png";
import { useNavigate } from "react-router-dom";
import { enviarMensagemChatbot } from "../../services/chebotService";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Olá! Em que posso te ajudar hoje?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userInput = input;
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setInput("");
    setLoading(true);

    try {
      const botResponse = await enviarMensagemChatbot(userInput);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Erro ao se comunicar com o chatbot:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Ocorreu um erro ao tentar responder. Tente novamente mais tarde." },
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <ChatContainer>
      
      <ChatHeader>
        <IconVoltar src={Voltar} onClick={() => navigate("/")} />
        Chat de Suporte
      </ChatHeader>

      <ChatMessages>
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            className={msg.sender === "user" ? "user" : "bot"}
          >
            {msg.sender === "bot" ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
          </MessageBubble>
        ))}

        {loading && (
          <MessageBubble className="bot">
            <Spinner />
          </MessageBubble>
        )}
      </ChatMessages>

      <ChatInputContainer>
        <ChatInput
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          disabled={loading}
        />
        <ChatButton onClick={sendMessage} disabled={loading}>
          Enviar
        </ChatButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default Chatbot;
