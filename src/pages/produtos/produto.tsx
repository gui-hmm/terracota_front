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
  ContainerProdutosGeral,
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
import { api } from "../../api/api";

// Tipagens
export interface Produto {
  id: number;
  nome: string;
  valor: number;
  imagem: string;
}

export interface ProdutoCarrinho {
  produto: Produto;
  quantidade: number;
}

// Mock de produtos locais
const produtosMockados: Produto[] = [
  { id: 1, nome: "Vasos de cerâmica", valor: 160.0, imagem: P1 },
  { id: 2, nome: "Panela de barro", valor: 145.0, imagem: P2 },
  { id: 3, nome: "Estatueta de terracota", valor: 350.0, imagem: P3 },
  { id: 4, nome: "Caldeirão de barro", valor: 160.0, imagem: P4 },
  { id: 5, nome: "Potes de barro", valor: 145.0, imagem: P5 },
  { id: 6, nome: "Tigelas de cerâmica", valor: 145.0, imagem: P6 },
  { id: 7, nome: "Leão de barro", valor: 300.0, imagem: P7 },
  { id: 8, nome: "Cervos de cerâmica", valor: 500.0, imagem: P8 },
  { id: 9, nome: "São Francisco", valor: 250.0, imagem: P9 },
  { id: 10, nome: "Jarra de cerâmica", valor: 150.0, imagem: P10 },
  { id: 11, nome: "Cisnes de cerâmica", valor: 200.0, imagem: P11 },
  { id: 12, nome: "Coelho de barro", valor: 130.0, imagem: P12 },
];

const Produtos: React.FC = () => {
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);
  const [produtosApi, setProdutosApi] = useState<Produto[]>([]);
  const [loadingProdutosApi, setLoadingProdutosApi] = useState(true);

  const navigate = useNavigate();

  const handleNavigate = (path: To) => {
    navigate(path);
  };

  // Carregar carrinho do localStorage
  useEffect(() => {
    const carrinhoStorage = localStorage.getItem("carrinho");
    if (carrinhoStorage) {
      try {
        const carrinhoParse = JSON.parse(carrinhoStorage);
        setCarrinho(Array.isArray(carrinhoParse) ? carrinhoParse : []);
      } catch {
        setCarrinho([]);
      }
    }
  }, []);

  // Atualiza o localStorage sempre que carrinho mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  // Busca produtos da API
  useEffect(() => {
    const buscarProdutosApi = async () => {
      setLoadingProdutosApi(true);
      try {
        const response = await api.get("/products");
        const produtosFormatados: Produto[] = response.data.items.map((item: any) => ({
          id: item.id,
          nome: item.name,
          valor: item.price,
          imagem: item.image || "https://via.placeholder.com/300x200?text=Produto", // imagem fallback
        }));
        setProdutosApi(produtosFormatados);
      } catch (error) {
        console.error("Erro ao buscar produtos da API:", error);
      } finally {
        setLoadingProdutosApi(false);
      }
    };

    buscarProdutosApi();
  }, []);

  const handleProdutoSelect = (produto: Produto) => {
    setProdutoSelecionado(produto);
  };

  const handleAlterarQuantidade = (novaQuantidade: number) => {
    if (novaQuantidade > 0) {
      setQuantidade(novaQuantidade);
    }
  };

  const handleAdicionarAoCarrinho = (produto: Produto, quantidade: number) => {
    const produtoExistente = carrinho.find(p => p.produto.id === produto.id);
    let novoCarrinho;

    if (produtoExistente) {
      novoCarrinho = carrinho.map(p =>
        p.produto.id === produto.id
          ? { ...p, quantidade: p.quantidade + quantidade }
          : p
      );
    } else {
      novoCarrinho = [...carrinho, { produto, quantidade }];
    }

    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    setProdutoSelecionado(null);
  };

  return (
    <>
      <Header />
      <Container>
        <ConteinerProdutosText>
          <IconVoltar src={Voltar} alt="Voltar" onClick={() => handleNavigate("/")} />
          <TextProdutos>Produtos</TextProdutos>
        </ConteinerProdutosText>

        <ContainerProdutosGeral>
          <ProdutoList produtos={produtosMockados} onSelectProduto={handleProdutoSelect} />

          {loadingProdutosApi ? (
            <div style={{ textAlign: "center", width: "100%", padding: "30px" }}>
              <span>Carregando produtos...</span>
            </div>
          ) : (
            <ProdutoList produtos={produtosApi} onSelectProduto={handleProdutoSelect} />
          )}
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
