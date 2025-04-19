import { Produto } from "../types/types";


const API_URL = 'https://sua-api.com/produtos'; // substitua pela URL real da API

export async function listarProdutos(): Promise<Produto[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }
  return await response.json();
}

export async function adicionarProduto(produto: Produto): Promise<Produto> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });
  if (!response.ok) {
    throw new Error('Erro ao adicionar produto');
  }
  return await response.json();
}

export async function atualizarProduto(id: string, produto: Produto): Promise<Produto> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar produto');
  }
  return await response.json();
}

export async function deletarProduto(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar produto');
  }
}
