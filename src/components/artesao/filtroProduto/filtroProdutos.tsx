import React from 'react';
import { FiltroContainer } from './filtroProdutosStyle';

interface Props {
  categoria: string;
  status: string;
  nome: string;
  onCategoriaChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onNomeChange: (value: string) => void;
}

const FiltroProdutos: React.FC<Props> = ({
  categoria,
  status,
  nome,
  onCategoriaChange,
  onStatusChange,
  onNomeChange,
}) => {
  return (
    <FiltroContainer>
      <input
        type="text"
        placeholder="Buscar por nome"
        value={nome}
        onChange={(e) => onNomeChange(e.target.value)}
      />
      <select value={categoria} onChange={(e) => onCategoriaChange(e.target.value)}>
        <option value="">Todas Categorias</option>
        <option value="acessorios">Acessórios</option>
        <option value="decoracao">Decoração</option>
        <option value="roupas">Roupas</option>
      </select>
      <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">Todos os Status</option>
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>
    </FiltroContainer>
  );
};

export default FiltroProdutos;
