import React from 'react';
import { CardVendaContainer } from './cardVendaStyle';
import { Venda } from '../../../types/types';

interface Props {
  venda: Venda;
}

const CardVenda: React.FC<Props> = ({ venda }) => {
  return (
    <CardVendaContainer>
      <h4>{venda.produto.nome}</h4>
      <p>Quantidade: {venda.quantidade}</p>
      <p>Data: {new Date(venda.data).toLocaleDateString()}</p>
      <p>Valor Total: R$ {(venda.quantidade * venda.produto.preco).toFixed(2)}</p>
    </CardVendaContainer>
  );
};

export default CardVenda;
