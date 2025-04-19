import React from 'react';
import { CardContainer, Info, Actions } from './cardProdutoStyle';
import { Produto } from '../../../types/types';

interface Props {
  produto: Produto;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const CardProduto: React.FC<Props> = ({ produto, onEdit, onDelete, onView }) => {
  return (
    <CardContainer>
      <img src={produto.imagemUrl} alt={produto.nome} />
      <Info>
        <h3>{produto.nome}</h3>
        <p>R$ {produto.preco.toFixed(2)}</p>
        <p>Status: {produto.status}</p>
        <p>Estoque: {produto.estoque}</p>
        <p>Vendas: {produto.totalVendas}</p>
      </Info>
      <Actions>
        <button onClick={onView}>Ver</button>
        <button onClick={onEdit}>Editar</button>
        <button onClick={onDelete}>Excluir</button>
      </Actions>
    </CardContainer>
  );
};

export default CardProduto;
