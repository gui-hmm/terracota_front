import React, { useEffect, useState } from 'react';
import FiltroProdutos from '../../components/artesao/filtroProduto/filtroProdutos';
import CardProduto from '../../components/artesao/cardProduto/cardProduto';
import { listarProdutos } from '../../services/produtosService';
import { Container } from './meusProdutosStyle';
import { Produto } from '../../types/types';

const MeusProdutos: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [categoria, setCategoria] = useState('');
    const [status, setStatus] = useState('');
    const [nome, setNome] = useState('');
    const [modoEdicao, setModoEdicao] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  
    useEffect(() => {
      async function carregar() {
        const dados = await listarProdutos();
        setProdutos(dados);
      }
      carregar();
    }, []);
  
    function handleAdicionar() {
      setProdutoSelecionado(null);
      setModoEdicao(true);
    }
  
    function handleEditar(produto: Produto) {
      setProdutoSelecionado(produto);
      setModoEdicao(true);
    }
  
    function handleCancelar() {
      setModoEdicao(false);
      setProdutoSelecionado(null);
    }
  
    // Aplicando os filtros no array
    const produtosFiltrados = produtos.filter((p) => {
      const nomeMatch = p.nome.toLowerCase().includes(nome.toLowerCase());
      const categoriaMatch = !categoria || p.categoria === categoria;
      const statusMatch = !status || p.status === status;
      return nomeMatch && categoriaMatch && statusMatch;
    });
  
    return (
      <Container>
        <h2>Meus Produtos</h2>
  
        {!modoEdicao && (
          <>
            <FiltroProdutos
              categoria={categoria}
              status={status}
              nome={nome}
              onCategoriaChange={setCategoria}
              onStatusChange={setStatus}
              onNomeChange={setNome}
            />
            <button onClick={handleAdicionar}>+ Adicionar Produto</button>
            <div className="cards">
              {produtosFiltrados.map((p) => (
                <CardProduto
                  key={p.id}
                  produto={p}
                  onEdit={() => handleEditar(p)}
                  onDelete={() => {}}
                  onView={() => {}}
                />
              ))}
            </div>
          </>
        )}
  
        {modoEdicao && (
          <div className="form">
            <h3>{produtoSelecionado ? 'Editar Produto' : 'Adicionar Produto'}</h3>
            <p>Formulário de {produtoSelecionado ? 'edição' : 'adição'} de produto aqui</p>
            <button onClick={handleCancelar}>Cancelar</button>
          </div>
        )}
      </Container>
    );
};  

export default MeusProdutos;