import React from "react";
import { ContainerProduto, ImageProduto, NomeProduto, ValorProduto } from "./produtosListStyle";
import { Produto } from "../../types/types";

interface ProdutoListProps {
  produtos: Produto[];
  onSelectProduto: (produto: Produto) => void;
}

const ProdutoList: React.FC<ProdutoListProps> = ({ produtos, onSelectProduto }) => {
  return (
    <>
      {produtos.map((produto: Produto) => (
        <ContainerProduto key={produto.id} onClick={() => onSelectProduto(produto)}>
          <ImageProduto src={produto.imagemUrl} alt={produto.nome} />
          <NomeProduto>{produto.nome}</NomeProduto>
          <ValorProduto>
          {`R$ ${(produto.preco ?? 0).toFixed(2)}`}
          </ValorProduto>

        </ContainerProduto>
      ))}
    </>
  );
};

export default ProdutoList;