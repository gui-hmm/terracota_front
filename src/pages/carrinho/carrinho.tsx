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
  BotaoFinalizar, // Certifique-se que este é o seu styled-component para o botão
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
import { Produto } from "../produtos/produto";
import Footer from "../../components/footer/footer";
import { api } from "../../api/api";

// Importe o Spinner. Se você copiou para carrinhoStyle.ts, importe de lá.
// Se for do loginStyle.ts, ajuste o caminho:
// import { Spinner } from "../login/loginStyle"; // Exemplo de caminho
import { Spinner } from "./carrinhoStyle"; // Assumindo que copiou para carrinhoStyle.ts ou já está lá

// ... (interfaces ProdutoCarrinhoLocalStorage, ProdutoCarrinhoInterno permanecem as mesmas) ...
interface ProdutoCarrinhoLocalStorage {
  produto: Produto;
  quantidade: number;
}

interface ProdutoCarrinhoInterno {
  id: number;
  nome: string;
  imagem: string;
  valor: number;
  quantidade: number;
}


const Carrinho: React.FC = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<ProdutoCarrinhoInterno[]>([]);
  const [isLoadingFinalizar, setIsLoadingFinalizar] = useState(false); // Novo estado para o loading

  const salvarCarrinhoNoLocalStorage = (carrinhoParaSalvar: ProdutoCarrinhoInterno[]) => {
    const carrinhoFormatado: ProdutoCarrinhoLocalStorage[] = carrinhoParaSalvar.map(item => ({
      produto: {
        id: item.id,
        nome: item.nome,
        valor: item.valor,
        imagem: item.imagem,
      },
      quantidade: item.quantidade,
    }));
    localStorage.setItem("carrinho", JSON.stringify(carrinhoFormatado));
  };

  useEffect(() => {
    // ... (lógica de carregamento do carrinho permanece a mesma)
    try {
      const produtosStorage = localStorage.getItem("carrinho");
      if (produtosStorage) {
        const parsedStorage: ProdutoCarrinhoLocalStorage[] = JSON.parse(produtosStorage);

        if (Array.isArray(parsedStorage)) {
          const mappedParaInterno: ProdutoCarrinhoInterno[] = parsedStorage
            .map((item) => {
              if (item.produto && typeof item.produto.id !== 'undefined' && typeof item.quantidade === 'number') {
                return {
                  id: item.produto.id,
                  nome: item.produto.nome,
                  imagem: item.produto.imagem,
                  valor: item.produto.valor,
                  quantidade: item.quantidade,
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

  const alterarQuantidade = (id: number, novaQuantidade: number) => {
    // ... (lógica permanece a mesma)
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

  const removerProduto = (id: number) => {
    // ... (lógica permanece a mesma)
    const produtosAtualizados = produtos.filter((produto) => produto.id !== id);
    setProdutos(produtosAtualizados);
    salvarCarrinhoNoLocalStorage(produtosAtualizados);
  };

  const esvaziarCarrinho = () => {
    // ... (lógica permanece a mesma)
    setProdutos([]);
    salvarCarrinhoNoLocalStorage([]); 
  };

  const calcularTotal = () => {
    // ... (lógica permanece a mesma)
    const total = produtos.reduce((acc, produto) => {
      const valor = Number(produto.valor); 
      const quantidade = Number(produto.quantidade); 
      if (!isNaN(valor) && !isNaN(quantidade)) {
        return acc + valor * quantidade;
      }
      return acc;
    }, 0);
    return total.toFixed(2);
  };

  const handleFinalizarCompra = async () => {
    if (produtos.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }
    setIsLoadingFinalizar(true); // Ativa o loading
    try {
      const response = await api.post("/sales/link", {
        items: produtos.map((produto) => ({
          productId: produto.id.toString(),
          quantity: produto.quantidade,
        })),
      });

      const { paymentLink } = response.data;

      if (paymentLink) {
        // esvaziarCarrinho(); // Opcional: limpar o carrinho
        window.location.href = paymentLink;
      } else {
        alert("Erro ao gerar link de pagamento. Resposta da API não continha o link.");
      }
    } catch (error: any) {
      console.error("Erro ao finalizar compra:", error);
      const errorMessage = error.response?.data?.message || "Erro ao finalizar compra. Tente novamente.";
      alert(errorMessage);
    } finally {
      setIsLoadingFinalizar(false); // Desativa o loading em qualquer caso (sucesso ou erro)
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
            {/* ... (mapa de produtos permanece o mesmo) ... */}
            {produtos.length === 0 ? (
              <center style={{ height: "120px", width: "100%", paddingTop: "20px" }}>
                <p>Seu carrinho está vazio.</p>
              </center>
            ) : (
              produtos.map((produto) => (
                <ProdutoItem key={produto.id}>
                  <ProdutoImagem
                    src={produto.imagem || "https://via.placeholder.com/100x100?text=Sem+Imagem"}
                    alt={produto.nome || "Produto sem nome"}
                  />
                  <ProdutoInfo>
                    <ProdutoNome>{produto.nome}</ProdutoNome>
                    <ProdutoValor>
                      R$ {typeof produto.valor === "number" ? produto.valor.toFixed(2) : "0.00"}
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
                      Total: R$ {(Number(produto.valor) * Number(produto.quantidade)).toFixed(2)}
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
                  {/* Desabilita esvaziar enquanto finaliza */}
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