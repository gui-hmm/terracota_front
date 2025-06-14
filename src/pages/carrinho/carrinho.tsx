import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Voltar from "../../assets/menorQue.png";
import {
  Container,
  ProdutoItem,
  ProdutoImagem,
  ProdutoInfo,
  ProdutoNome,
  ProdutoValor,
  QuantidadeControle,
  TotalValor,
  BotaoFinalizar,
  BotaoEsvaziar,
  ConteinerCarrinhoText,
  IconVoltar,
  TextCarrinho,
  ContainerTotal,
  ContainerButons,
  ContainerProdutos,
  ContainerCards,
} from "./carrinhoStyle";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { api } from "../../api/api";

import { Spinner } from "./carrinhoStyle"; 

interface ProdutoCarrinhoLocalStorage {
  produto: {
    id: string;
    nome: string;
    preco: number;
    imagemUrl: string;
  };
  quantidade: number;
}

interface ProdutoCarrinhoInterno {
  id: string;
  nome: string;
  preco: number;
  imagemUrl: string;
  quantidade: number;
  descricao?: string;
  estoque?: number;
  status?: "ativo" | "inativo";
  categoria?: string;
  totalVendas?: number;

}

const Carrinho: React.FC = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<ProdutoCarrinhoInterno[]>([]);
  const [isLoadingFinalizar, setIsLoadingFinalizar] = useState(false);

  const salvarCarrinhoNoLocalStorage = (carrinhoParaSalvar: ProdutoCarrinhoInterno[]) => {
    const carrinhoFormatado: ProdutoCarrinhoLocalStorage[] = carrinhoParaSalvar.map(item => ({
      produto: {
        id: item.id,
        nome: item.nome,
        preco: item.preco,
        imagemUrl: item.imagemUrl
      },
      quantidade: item.quantidade
    }));
    localStorage.setItem("carrinho", JSON.stringify(carrinhoFormatado));
  };

  useEffect(() => {
    try {
      const produtosStorage = localStorage.getItem("carrinho");
      if (produtosStorage) {
        const parsedStorage: ProdutoCarrinhoLocalStorage[] = JSON.parse(produtosStorage);
  
        if (Array.isArray(parsedStorage)) {
          const mappedParaInterno: ProdutoCarrinhoInterno[] = parsedStorage
            .map((item) => {
              if (item.produto && typeof item.quantidade === 'number') {
                return {
                  id: item.produto.id,
                  nome: item.produto.nome,
                  preco: item.produto.preco || 0,
                  imagemUrl: item.produto.imagemUrl || "",
                  quantidade: item.quantidade || 0,
                };
              }
              return null;
            })
            .filter((item): item is ProdutoCarrinhoInterno => item !== null);
  
          setProdutos(mappedParaInterno);
        } else {
          setProdutos([]);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      setProdutos([]);
      localStorage.setItem("carrinho", JSON.stringify([]));
    }
  }, []);

  const alterarQuantidade = (id: string, novaQuantidade: number) => {
    let produtosAtualizados: ProdutoCarrinhoInterno[];
    if (novaQuantidade <= 0) {
      produtosAtualizados = produtos.filter((produto) => produto.id !== id);
    } else {
      produtosAtualizados = produtos.map((produto) =>
        produto.id === id ? { ...produto, quantidade: novaQuantidade } : produto
      );
    }
    setProdutos(produtosAtualizados);
    salvarCarrinhoNoLocalStorage(produtosAtualizados);
  };
  
  const removerProduto = (id: string) => {
    const produtosAtualizados = produtos.filter((produto) => produto.id !== id);
    setProdutos(produtosAtualizados);
    salvarCarrinhoNoLocalStorage(produtosAtualizados);
  };

  const esvaziarCarrinho = () => {
    setProdutos([]);
    salvarCarrinhoNoLocalStorage([]); 
  };

  const calcularTotal = () => {
    const total = produtos.reduce((acc, produto) => {
      const valor = typeof produto.preco === "number" ? produto.preco : 0;
      const quantidade = typeof produto.quantidade === "number" ? produto.quantidade : 0;
      return acc + valor * quantidade;
    }, 0);
    return total.toFixed(2);
  };

  const handleFinalizarCompra = async () => {
    if (produtos.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }
    setIsLoadingFinalizar(true); 
    try {
      const response = await api.post("/sales/link", {
        items: produtos.map((produto) => ({
          productId: produto.id.toString(),
          quantity: produto.quantidade,
        })),
      });

      const { paymentLink } = response.data;

      if (paymentLink) {
        window.location.href = paymentLink;
      } else {
        alert("Erro ao gerar link de pagamento. Resposta da API não continha o link.");
      }
    } catch (error: any) {
      console.error("Erro ao finalizar compra:", error);
      const errorMessage = error.response?.data?.message || "Erro ao finalizar compra. Tente novamente.";
      alert(errorMessage);
    } finally {
      setIsLoadingFinalizar(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <ConteinerCarrinhoText>
          <IconVoltar src={Voltar} alt="Voltar" onClick={() => navigate(-1)} />
          <TextCarrinho>Carrinho</TextCarrinho>
        </ConteinerCarrinhoText>
  
        <ContainerProdutos>
          <ContainerCards>
            {produtos.length === 0 ? (
              <center style={{ height: "200px", width: "100%", paddingTop: "20px" }}>
                <p>Seu carrinho está vazio.</p>
              </center>
            ) : (
              produtos.map((produto) => (
                <ProdutoItem key={produto.id}>
                  <ProdutoImagem
                    src={produto.imagemUrl || "https://via.placeholder.com/100x100?text=Sem+Imagem"}
                    alt={produto.nome || "Produto sem nome"}
                  />
                  <ProdutoInfo>
                    <ProdutoNome>{produto.nome}</ProdutoNome>
                    <ProdutoValor>
                    R$ {typeof produto.preco === "number" && !isNaN(produto.preco) 
                        ? produto.preco.toFixed(2) 
                        : "0.00"}
                    </ProdutoValor>
                    <QuantidadeControle>
                      <button onClick={() => alterarQuantidade(produto.id, produto.quantidade - 1)}>
                        -
                      </button>
                      <span>{produto.quantidade}</span>
                      <button onClick={() => alterarQuantidade(produto.id, produto.quantidade + 1)}>
                        +
                      </button>
                    </QuantidadeControle>
                    <ProdutoValor>
                    Total: R$ {(
                                (typeof produto.preco === "number" ? produto.preco : 0) * 
                                (typeof produto.quantidade === "number" ? produto.quantidade : 0)
                              ).toFixed(2)}
                    </ProdutoValor>
                    <button onClick={() => removerProduto(produto.id)}>Remover</button>
                  </ProdutoInfo>
                </ProdutoItem>
              ))
            )}
          </ContainerCards>
  
          {produtos.length > 0 && (
            <ContainerTotal>
              <TotalValor>Total: R$ {calcularTotal()}</TotalValor>
              <ContainerButons>
                <BotaoEsvaziar onClick={esvaziarCarrinho} disabled={isLoadingFinalizar}>
                  Esvaziar Carrinho
                </BotaoEsvaziar>
                <BotaoFinalizar onClick={handleFinalizarCompra} disabled={isLoadingFinalizar}>
                  {isLoadingFinalizar ? <Spinner /> : "Finalizar Compra"}
                </BotaoFinalizar>
              </ContainerButons>
            </ContainerTotal>
          )}
        </ContainerProdutos>
      </Container>
      <Footer />
    </>
  );
};

export default Carrinho;