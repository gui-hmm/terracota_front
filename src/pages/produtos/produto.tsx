import React, { useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Voltar from "../../assets/menorQue.png";
import ProdutoList from "../../components/produtosComponent/produtoList";
import ProdutoDetalhesModal from "../../components/produtosComponent/ProdutoDetalhesModal";
import { 
    Container, 
    ConteinerProdutosText, 
    IconVoltar, 
    TextProdutos, 
    ContainerProdutosGeral } from "./produtosStyle";
import P1 from "../../assets/p1.png";
import P2 from "../../assets/p2.png";
import P3 from "../../assets/p3.png";
import P4 from "../../assets/p4.png";
import P5 from "../../assets/p5.png";
import P6 from "../../assets/p6.png";
import P7 from "../../assets/p7.png";
import P8 from "../../assets/p8.png";
import P9 from "../../assets/p9.png";
import P10 from "../../assets/p10.png";
import P11 from "../../assets/p11.png";
import P12 from "../../assets/p12.png";

// Definindo o tipo do produto
export interface Produto {
  id: number;
  nome: string;
  valor: number;
  imagem: string;
}

// Lista de produtos
const produtos: Produto[] = [
    { id: 1, nome: "Vasos de cerâmica", valor: 160.00, imagem: P1 },
    { id: 2, nome: "Panela de barro", valor: 145.00, imagem: P2 },
    { id: 3, nome: "Estatueta de terracota", valor: 350.00, imagem: P3 },
    { id: 4, nome: "Caldeirão de barro", valor: 160.00, imagem: P4 },
    { id: 5, nome: "Potes de barro", valor: 145.00, imagem: P5 },
    { id: 6, nome: "Tigelas de cerâmica", valor: 145.00, imagem: P6 },
    { id: 7, nome: "Leão de barro", valor: 300.00, imagem: P7 },
    { id: 8, nome: "Cervos de cerâmica", valor: 500.00, imagem: P8 },
    { id: 9, nome: "São Francisco", valor: 250.00, imagem: P9 },
    { id: 10, nome: "Jarra de cerâmica", valor: 150.00, imagem: P10 },
    { id: 11, nome: "Cisnes de cerâmica", valor: 200.00, imagem: P11 },
    { id: 12, nome: "Coelho de barro", valor: 130.00, imagem: P12 }
];

const Produtos: React.FC = () => {
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);

  const handleProdutoSelect = (produto: Produto) => {
    setProdutoSelecionado(produto);
  };

  const handleAlterarQuantidade = (novaQuantidade: number) => {
    if (novaQuantidade > 0) {
      setQuantidade(novaQuantidade);
    }
  };

  const handleAdicionarAoCarrinho = () => {
    console.log(`Produto ${produtoSelecionado?.nome} adicionado com quantidade: ${quantidade}`);
  };

  return (
    <>
      <Header />
      <Container>
        <ConteinerProdutosText>
          <IconVoltar src={Voltar} alt="Voltar" />
          <TextProdutos>Produtos</TextProdutos>
        </ConteinerProdutosText>

        <ContainerProdutosGeral>
          <ProdutoList produtos={produtos} onSelectProduto={handleProdutoSelect} />
        </ContainerProdutosGeral>

        {produtoSelecionado && (
          <ProdutoDetalhesModal
            produto={produtoSelecionado}
            quantidade={quantidade}
            onAlterarQuantidade={handleAlterarQuantidade}
            onAdicionarAoCarrinho={handleAdicionarAoCarrinho}
            onFecharModal={() => setProdutoSelecionado(null)}
          />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Produtos;
