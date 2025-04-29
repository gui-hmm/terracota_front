import { api } from "../api/api";


export const enviarMensagemChatbot = async (prompt: string) => {
  const response = await api.post("/chatbot", { prompt });
  return response.data?.response || "Desculpe, não consegui responder.";
};
