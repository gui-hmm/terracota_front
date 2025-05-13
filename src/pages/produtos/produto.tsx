import React, { useState, useEffect } from "react";
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
  ContainerProdutosGeral 
} from "./produtosStyle";
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
import { To, useNavigate } from "react-router-dom";

// Definindo o tipo do produto
export interface Produto {
  id: number;
  nome: string;
  valor: number;
  imagem: string;
}

// Definindo o tipo de um item no carrinho
export interface ProdutoCarrinho {
  produto: Produto;
  quantidade: number;
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
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);

  const navigate = useNavigate();

  const handleNavigate = (path: To) => {
    navigate(path);
  };

  // Carregar o carrinho do localStorage ao montar o componente
  useEffect(() => {
    const carrinhoStorage = localStorage.getItem("carrinho");
    if (carrinhoStorage) {
      const carrinhoParse = JSON.parse(carrinhoStorage);
      if (Array.isArray(carrinhoParse)) {
        setCarrinho(carrinhoParse);
      } else {
        setCarrinho([]); // Inicialize como array vazio se a estrutura estiver errada
      }
    } else {
      setCarrinho([]); // Inicialize como array vazio caso não haja dados no localStorage
    }
  }, []);


  // Função para salvar o carrinho no localStorage
  useEffect(() => {
    if (carrinho.length > 0) {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
  }, [carrinho]);

  const handleProdutoSelect = (produto: Produto) => {
    setProdutoSelecionado(produto);
  };

  const handleAlterarQuantidade = (novaQuantidade: number) => {
    if (novaQuantidade > 0) {
      setQuantidade(novaQuantidade);
    }
  };

  const handleAdicionarAoCarrinho = (produto: Produto, quantidade: number) => {
    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find(p => p.produto && p.produto.id === produto.id);
    let novosCarrinho;

    if (produtoExistente) {
      // Se o produto já estiver no carrinho, aumente a quantidade
      novosCarrinho = carrinho.map(p =>
        p.produto && p.produto.id === produto.id
          ? {
              ...p,
              quantidade: p.quantidade + quantidade // Atualiza a quantidade corretamente
            }
          : p
      );
    } else {
      // Se não estiver, adicione o novo produto com a quantidade passada
      novosCarrinho = [...carrinho, { produto, quantidade }];
    }

    // Atualize o carrinho local
    setCarrinho(novosCarrinho);

    // Atualize o localStorage
    localStorage.setItem('carrinho', JSON.stringify(novosCarrinho));

    // Fechar o modal
    setProdutoSelecionado(null);
  };  

  return (
    <>
      <Header />
      <Container>
        <ConteinerProdutosText>
          <IconVoltar src={Voltar} alt="Voltar" onClick={() => handleNavigate('/')} />
          <TextProdutos>Produtos</TextProdutos>
        </ConteinerProdutosText>

        <ContainerProdutosGeral>
          <ProdutoList produtos={produtos} onSelectProduto={handleProdutoSelect} />
        </ContainerProdutosGeral>

        {produtoSelecionado && (
          <ProdutoDetalhesModal
            produto={produtoSelecionado}
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
