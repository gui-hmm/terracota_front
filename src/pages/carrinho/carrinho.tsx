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
    ContainerCards
} from "./carrinhoStyle";
import Header from "../../components/header/header";
import ProdutoDetalhesModal from "../../components/produtosComponent/ProdutoDetalhesModal";
import { Produto } from "../produtos/produto";
import Footer from "../../components/footer/footer";

interface ProdutoCarrinho {
  id: number;
  nome: string;
  imagem: string;
  valor: number;
  quantidade: number;
}

const Carrinho: React.FC = () => {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<ProdutoCarrinho[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  useEffect(() => {
    const produtosStorage = localStorage.getItem("carrinho");
    if (produtosStorage) {
      const produtosCarregados = JSON.parse(produtosStorage).map((produto: any) => ({
        ...produto.produto,
        quantidade: produto.quantidade
      }));
      setProdutos(produtosCarregados);
    }
  }, []);

  const alterarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade <= 0) {
      removerProduto(id);
    } else {
      setProdutos((prev) =>
        prev.map((produto) =>
          produto.id === id ? { ...produto, quantidade: novaQuantidade } : produto
        )
      );
    }
  };

  const removerProduto = (id: number) => {
    setProdutos((prev) => {
      const novosProdutos = prev.filter((produto) => produto.id !== id);
      localStorage.setItem("carrinho", JSON.stringify(novosProdutos));
      return novosProdutos;
    });
  };

  const esvaziarCarrinho = () => {
    setProdutos([]);
    localStorage.removeItem("carrinho");
  };

  const calcularTotal = () => {
    const total = produtos.reduce((total, produto) => {
      const valor = produto.valor;
      const quantidade = produto.quantidade;

      if (!isNaN(valor) && !isNaN(quantidade)) {
        return total + valor * quantidade;
      }
      return total;
    }, 0);

    return isNaN(total) ? '0.00' : total.toFixed(2);
  };

  const adicionarAoCarrinho = (produto: Produto, quantidade: number) => {
    setProdutos((prevProdutos) => {
      const produtoExistente = prevProdutos.find(p => p.id === produto.id);
      let novosProdutos;
      
      if (produtoExistente) {
        novosProdutos = prevProdutos.map(p =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + quantidade } : p
        );
      } else {
        novosProdutos = [...prevProdutos, { ...produto, quantidade }];
      }
  
      localStorage.setItem("carrinho", JSON.stringify(novosProdutos));
      return novosProdutos; 
    });
  
    setShowModal(false);
  };


  const handleFinalizarCompra = () => {
    localStorage.removeItem("carrinho");
    setProdutos([]);
  
    navigate("/");
    
    alert("Compra finalizada com sucesso!");
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
              <center style={{ height: '120px' }}>
                <p>Seu carrinho está vazio.</p>
              </center>
            ) : (
              produtos.map((produto) => {
                //console.log("Produto sendo renderizado: ", produto); // Depuração
                return (
                  <ProdutoItem key={produto.id}>
                    <ProdutoImagem src={produto.imagem} alt={produto.nome} />
                    <ProdutoInfo>
                      <ProdutoNome>{produto.nome}</ProdutoNome>

                      <ProdutoValor>
                        R$ {typeof produto.valor === 'number' && !isNaN(produto.valor) ? produto.valor.toFixed(2) : '0.00'}
                      </ProdutoValor>

                      <QuantidadeControle>
                        <button onClick={() => alterarQuantidade(produto.id, produto.quantidade - 1)}>-</button>
                        <span>{produto.quantidade}</span>
                        <button onClick={() => alterarQuantidade(produto.id, produto.quantidade + 1)}>+</button>
                      </QuantidadeControle>

                      <ProdutoValor>
                        Total: R$ {typeof produto.valor === 'number' && !isNaN(produto.valor) 
                          ? (produto.valor * produto.quantidade).toFixed(2) 
                          : '0.00'}
                      </ProdutoValor>

                      
                      <button onClick={() => removerProduto(produto.id)}>Remover</button>
                    </ProdutoInfo>
                  </ProdutoItem>
                );
              })
            )}
          </ContainerCards>
          <ContainerTotal>
            <TotalValor>Total: R$ {calcularTotal()}</TotalValor>
            {produtos.length > 0 && (
              <ContainerButons>
                <BotaoEsvaziar onClick={esvaziarCarrinho}>Esvaziar Carrinho</BotaoEsvaziar>
                <BotaoFinalizar onClick={handleFinalizarCompra}>Finalizar Compra</BotaoFinalizar>
              </ContainerButons>
            )}
          </ContainerTotal>
        </ContainerProdutos>
      </Container>

      {/* Exibir o modal se showModal for verdadeiro */}
      {showModal && produtoSelecionado && (
        <ProdutoDetalhesModal
          produto={produtoSelecionado}
          onAdicionarAoCarrinho={adicionarAoCarrinho}
          onFecharModal={() => setShowModal(false)}
        />
      )}
      <Footer/>
    </>
  );
};

export default Carrinho;
