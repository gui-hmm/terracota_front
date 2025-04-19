import { Venda } from "../types/types";

const API_URL = 'https://sua-api.com/vendas'; // substitua pela URL real da API

export async function listarVendas(): Promise<Venda[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erro ao buscar vendas');
  }
  return await response.json();
}
