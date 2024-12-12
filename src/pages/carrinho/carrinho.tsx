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
    const produtosStorage = localStorage.getItem("carrinho");
    if (produtosStorage) {
      //console.log("Carrinho carregado do localStorage: ", produtosStorage); // Depuração
      const produtosCarregados = JSON.parse(produtosStorage).map((produto: any) => ({
        ...produto.produto, // Extraindo o produto corretamente
        quantidade: produto.quantidade
      }));
      //console.log("Produtos carregados após mapeamento: ", produtosCarregados); // Depuração adicional
      setProdutos(produtosCarregados); // Carregar os produtos salvos
    }
  }, []);
  
  // Salvar produtos no localStorage sempre que a lista de produtos for alterada
  

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
      localStorage.setItem("carrinho", JSON.stringify(novosProdutos)); // Atualizar no localStorage
      return novosProdutos;
    });
  };

  // Função para esvaziar o carrinho
  const esvaziarCarrinho = () => {
    setProdutos([]);  // Limpa todos os produtos do carrinho
    localStorage.removeItem("carrinho"); // Limpa o localStorage
  };

  // Função para calcular o valor total do carrinho
  const calcularTotal = () => {
    const total = produtos.reduce((total, produto) => {
      //console.log("Calculando valor para: ", produto); // Depuração
      const valor = produto.valor;
      const quantidade = produto.quantidade;

      // Verifica se tanto o valor quanto a quantidade são números válidos
      if (!isNaN(valor) && !isNaN(quantidade)) {
        return total + valor * quantidade;
      }
      return total; // Se algum valor for inválido, retorna o total atual sem alterações
    }, 0);

    return isNaN(total) ? '0.00' : total.toFixed(2);
  };

  // Função para adicionar o produto ao carrinho
  const adicionarAoCarrinho = (produto: Produto, quantidade: number) => {
    setProdutos((prevProdutos) => {
      // Verificar se o produto já existe no carrinho
      const produtoExistente = prevProdutos.find(p => p.id === produto.id);
      let novosProdutos;
      
      if (produtoExistente) {
        // Se o produto já estiver no carrinho, apenas aumentar a quantidade
        novosProdutos = prevProdutos.map(p =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + quantidade } : p
        );
      } else {
        // Se não existir, adicionar o novo produto ao carrinho
        novosProdutos = [...prevProdutos, { ...produto, quantidade }];
      }
  
      // Persistir no localStorage
      console.log("Novos produtos após adicionar: ", novosProdutos); // Depuração
      localStorage.setItem("carrinho", JSON.stringify(novosProdutos));
      return novosProdutos;  // Atualiza o estado com os novos produtos
    });
  
    setShowModal(false); // Fechar o modal depois de adicionar o produto
  };


  // Função para redirecionar à página de finalização de compra
  const handleFinalizarCompra = () => {
    // Limpar o carrinho no estado e no localStorage
    localStorage.removeItem("carrinho");  // Limpar o carrinho no localStorage
    setProdutos([]);  // Limpar o carrinho no estado
  
    // Redirecionar para a página inicial (Home)
    navigate("/");  // Caminho da sua página inicial
    
    // Exibir uma mensagem de sucesso (pode ser em um componente de alerta ou modal)
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
