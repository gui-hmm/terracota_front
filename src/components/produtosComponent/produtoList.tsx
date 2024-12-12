import React from "react";
import { ContainerProduto, ImageProduto, NomeProduto, ValorProduto } from "./produtosListStyle";
import { Produto } from "../../pages/produtos/produto";

interface ProdutoListProps {
  produtos: Produto[];
  onSelectProduto: (produto: Produto) => void;
}

const ProdutoList: React.FC<ProdutoListProps> = ({ produtos, onSelectProduto }) => {
  return (
    <>
      {produtos.map((produto) => (
        <ContainerProduto key={produto.id} onClick={() => onSelectProduto(produto)}>
          <ImageProduto src={produto.imagem} alt={produto.nome} />
          <NomeProduto>{produto.nome}</NomeProduto>
          <ValorProduto>{`R$ ${produto.valor.toFixed(2)}`}</ValorProduto>
        </ContainerProduto>
      ))}
    </>
  );
};

export default ProdutoList;
