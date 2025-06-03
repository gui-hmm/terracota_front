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
import { To, useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export interface Produto {
  id: number;
  nome: string;
  valor: number;
  imagem: string;
  descricao?: string;
}

export interface ProdutoCarrinhoLocalStorage {
  produto: Produto;
  quantidade: number;
}

const Produtos: React.FC = () => {
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [produtosApi, setProdutosApi] = useState<Produto[]>([]);
  const [loadingProdutosApi, setLoadingProdutosApi] = useState(true);

  const navigate = useNavigate();

  const handleNavigate = (path: To) => {
    navigate(path);
  };

  useEffect(() => {
    const buscarProdutosApi = async () => {
      setLoadingProdutosApi(true);
      try {
        const response = await api.get("/products?perPage=30");
        const produtosFormatados: Produto[] = response.data.items.map((item: any) => ({
          id: item.id,
          nome: item.name,
          valor: item.price,
          descricao: item.description,
          imagem: item.photo || "https://img.freepik.com/vetores-premium/jarro-de-ceramica-marrom-vaso-de-barro-vaso-de-artesanato_81894-7502.jpg", // imagem fallback
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

  const handleAdicionarAoCarrinho = (produto: Produto, quantidade: number) => {
    const carrinhoStorage = localStorage.getItem("carrinho");
    let carrinhoAtual: ProdutoCarrinhoLocalStorage[] = [];

    if (carrinhoStorage) {
      try {
        const carrinhoParse = JSON.parse(carrinhoStorage);
        if (Array.isArray(carrinhoParse)) {
          carrinhoAtual = carrinhoParse.filter(
            item => item.produto && typeof item.produto.id !== 'undefined' && typeof item.quantidade === 'number'
          );
        }
      } catch (error) {
        console.error("Erro ao parsear carrinho do localStorage:", error);
        carrinhoAtual = []; 
      }
    }

    const produtoExistenteIndex = carrinhoAtual.findIndex(
      (p) => p.produto.id === produto.id
    );

    let novoCarrinho: ProdutoCarrinhoLocalStorage[];

    if (produtoExistenteIndex > -1) {
      novoCarrinho = carrinhoAtual.map((p, index) =>
        index === produtoExistenteIndex
          ? { ...p, quantidade: p.quantidade + quantidade }
          : p
      );
    } else {
      novoCarrinho = [...carrinhoAtual, { produto, quantidade }];
    }

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
          {loadingProdutosApi ? (
            <div style={{ textAlign: "center", width: "100%", height: "200px", padding: "30px" }}>
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