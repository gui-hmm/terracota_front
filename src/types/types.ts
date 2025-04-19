export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    imagemUrl: string;
    status: 'ativo' | 'inativo';
    categoria: string;
    totalVendas: number;
}
  
export interface Venda {
    id: number;
    produtoId: number;
    produto: Produto;
    nomeProduto: string;
    imagemUrl: string;
    quantidade: number;
    precoUnitario: number;
    data: string; // formato ISO
}
 
export interface Artesao {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    bio?: string;
    imagemUrl?: string;
    senha?: string;
}
  