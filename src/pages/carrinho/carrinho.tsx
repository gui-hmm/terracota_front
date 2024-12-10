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
    TextCarrinho
} from "./carrinhoStyle";
import Header from "../../components/header/header";
import { Produto } from "../produtos/produto"; 
import ProdutoDetalhesModal from "../../components/produtosComponent/ProdutoDetalhesModal";
import { ContainerProduto } from "../../components/produtosComponent/produtosListStyle";

// Definindo o tipo para Produto
interface ProdutoCarrinho {
  id: number;
  nome: string;
  imagem: string;
  valor: number;
  quantidade: number;
}

const Carrinho: React.FC = () => {
  const navigate = useNavigate();

  // Estado que mantém os produtos do carrinho
  const [produtos, setProdutos] = useState<ProdutoCarrinho[]>([]);
  const [showModal, setShowModal] = useState(false); // Controla a visibilidade do modal
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null); // Produto selecionado

  // Carregar produtos do localStorage quando o componente for montado
  useEffect(() => {
    const produtosStorage = localStorage.getItem("produtosCarrinho");
    if (produtosStorage) {
      setProdutos(JSON.parse(produtosStorage)); // Carregar os produtos salvos
    }
  }, []);

  // Salvar produtos no localStorage sempre que a lista de produtos for alterada
  useEffect(() => {
    if (produtos.length > 0) {
      localStorage.setItem("produtosCarrinho", JSON.stringify(produtos)); // Persistir no localStorage
    }
  }, [produtos]);

  // Função para alterar a quantidade do produto
  const alterarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade <= 0) {
      removerProduto(id);  // Se a quantidade for 0 ou negativa, remove o produto
    } else {
      setProdutos((prev) =>
        prev.map((produto) =>
          produto.id === id ? { ...produto, quantidade: novaQuantidade } : produto
        )
      );
    }
  };

  // Função para remover um produto do carrinho
  const removerProduto = (id: number) => {
    setProdutos((prev) => {
      const novosProdutos = prev.filter((produto) => produto.id !== id);
      localStorage.setItem("produtosCarrinho", JSON.stringify(novosProdutos)); // Atualizar no localStorage
      return novosProdutos;
    });
  };

  // Função para esvaziar o carrinho
  const esvaziarCarrinho = () => {
    setProdutos([]);  // Limpa todos os produtos do carrinho
    localStorage.removeItem("produtosCarrinho"); // Limpa o localStorage
  };

  // Função para calcular o valor total do carrinho
  const calcularTotal = () => {
    return produtos.reduce((total, produto) => total + produto.valor * produto.quantidade, 0).toFixed(2);
  };

  // Função para adicionar o produto ao carrinho
  const adicionarAoCarrinho = (produto: Produto) => {
    setProdutos((prevProdutos) => {
      // Verificar se o produto já existe no carrinho
      const produtoExistente = prevProdutos.find(p => p.id === produto.id);
      let novosProdutos;
      
      if (produtoExistente) {
        // Se o produto já estiver no carrinho, apenas aumentar a quantidade
        novosProdutos = prevProdutos.map(p =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      } else {
        // Se não existir, adicionar o novo produto ao carrinho
        novosProdutos = [...prevProdutos, { ...produto, quantidade: 1 }];
      }
  
      // Persistir no localStorage
      localStorage.setItem("produtosCarrinho", JSON.stringify(novosProdutos));
      return novosProdutos;  // Atualiza o estado com os novos produtos
    });
  
    setShowModal(false); // Fechar o modal depois de adicionar o produto
  };
   

  // Função para redirecionar à página de finalização de compra
  const handleFinalizarCompra = () => {
    navigate("/finalizar-compra");  // Redireciona para a página de finalização de compra
  };

  // Função para exibir o modal de detalhes do produto
  const exibirModal = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setShowModal(true);
  };

  return (
    <>
      <Header />
      <Container>
        <ConteinerCarrinhoText>
          <IconVoltar src={Voltar} alt="Voltar" onClick={() => navigate(-1)} />
          <TextCarrinho>Produtos</TextCarrinho>
        </ConteinerCarrinhoText>
        <ContainerProduto>
          {produtos.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            produtos.map((produto) => (
              <ProdutoItem key={produto.id}>
                <ProdutoImagem src={produto.imagem} alt={produto.nome} />
                <ProdutoInfo>
                  <ProdutoNome>{produto.nome}</ProdutoNome>
                  <ProdutoValor>R$ {produto.valor.toFixed(2)}</ProdutoValor>
                  <QuantidadeControle>
                    <button onClick={() => alterarQuantidade(produto.id, produto.quantidade - 1)}>-</button>
                    <span>{produto.quantidade}</span>
                    <button onClick={() => alterarQuantidade(produto.id, produto.quantidade + 1)}>+</button>
                  </QuantidadeControle>
                  <button onClick={() => removerProduto(produto.id)}>Remover</button>
                </ProdutoInfo>
              </ProdutoItem>
            ))
          )}
          <div>
            <TotalValor>Total: R$ {calcularTotal()}</TotalValor>
            {produtos.length > 0 && (
              <>
                <BotaoEsvaziar onClick={esvaziarCarrinho}>Esvaziar Carrinho</BotaoEsvaziar>
                <BotaoFinalizar onClick={handleFinalizarCompra}>Finalizar Compra</BotaoFinalizar>
              </>
            )}
          </div>
        </ContainerProduto>
      </Container>

      {/* Exibir o modal se showModal for verdadeiro */}
      {showModal && produtoSelecionado && (
        <ProdutoDetalhesModal
          produto={produtoSelecionado}
          quantidade={1}
          onAlterarQuantidade={() => {}}
          onAdicionarAoCarrinho={adicionarAoCarrinho}
          onFecharModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Carrinho;
