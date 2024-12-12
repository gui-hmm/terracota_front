import React, { useEffect, useState } from "react";
import { 
    AvancarDestaques,
    BarrosExplore,
    ButtonExplore,
    CategoriaNaoSelecionada,
    CategoriaSelecionada,
    ContainerCategorias,
    ContainerImageAltaQualidade,
    ContainerMaisVendido,
    ContainerProdutos,
    ContainerProdutosDestaque,
    ContainerProdutosGeral1,
    ContainerProdutosGeral2,
    ContainerText,
    ContainerText1,
    ContainerTextMaisVendido,
    ExploreContainer, 
    ExploreContainerColuns, 
    ImageAltaQualidade, 
    ImageProduto, 
    ImageProdutoDestaque, 
    LinhaDois, 
    LinhaUm, 
    ProdutoName, 
    ProdutoNameDestaque, 
    ProdutosText, 
    ProdutosText1, 
    ProdutoValor, 
    ProdutoValorDestaque, 
    Text1, 
    Text2, 
    Text3, 
    Text4, 
    Text5, 
    TextDois, 
    TextExploreContainer,
    TextUm,
    VoltarDestaques} from "./homeStyle";
import P1 from "../../assets/p1.png"
import P2 from "../../assets/p2.png"
import P3 from "../../assets/p3.png"
import P4 from "../../assets/p4.png"
import P5 from "../../assets/p5.png"
import P6 from "../../assets/p6.png"
import P7 from "../../assets/p7.png"
import P8 from "../../assets/p8.png"
import P9 from "../../assets/p9.png"
import P10 from "../../assets/p10.png"
import P11 from "../../assets/p11.png"
import P12 from "../../assets/p12.png"
import AltaQualidade from "../../assets/alta_qualidade.png"
import BarrosImage from '../../assets/explore_barros.png'
import Voltar from "../../assets/menorQue.png"
import Avancar from "../../assets/maior_que.png"
import Header from '../../components/header/header'
import Footer from "../../components/footer/footer";
import Clientes from "../../components/clientes/cliente";
import { To, useNavigate } from "react-router-dom";
import { ContainerProdutosGeral } from "../produtos/produtosStyle";
import ProdutoList from "../../components/produtosComponent/produtoList";
import ProdutoDetalhesModal from "../../components/produtosComponent/ProdutoDetalhesModal";

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

function Home() {

    const navigate = useNavigate();

    const handleNavigate = (path: To) => {
        navigate(path);
    };

    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);

  // Carregar o carrinho do localStorage ao montar o componente
  useEffect(() => {
    const carrinhoStorage = localStorage.getItem("carrinho");
    console.log('Carrinho lido do localStorage: ', carrinhoStorage); // Log para verificar os dados do carrinho no localStorage
    if (carrinhoStorage) {
      const carrinhoParse = JSON.parse(carrinhoStorage);
      console.log('Carrinho após parse: ', carrinhoParse); // Log após parsing
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

        console.log('Carrinho atualizado: ', novosCarrinho); // Para depuração
        // Atualize o carrinho local
        setCarrinho(novosCarrinho);

        // Atualize o localStorage
        localStorage.setItem('carrinho', JSON.stringify(novosCarrinho));

        // Fechar o modal
        setProdutoSelecionado(null);
    };  

    return (
        <div>
            <Header/>
            <ExploreContainer>
                <ExploreContainerColuns>
                    <TextExploreContainer>
                        <TextUm>
                            Explore Nossa Coleção Artesanal De Produtos De Barro!
                        </TextUm>
                        <TextDois>
                            Descubra Agora Nossas Ofertas Exclusivas e Produtos Feitos à Mão com Todo Cuidado!
                        </TextDois>
                        <ButtonExplore onClick={() => handleNavigate('/produtos')} >
                            Nossos Produtos
                        </ButtonExplore>
                    </TextExploreContainer>
                    <BarrosExplore alt="" src={BarrosImage} />
                </ExploreContainerColuns>
            </ExploreContainer>
            <LinhaUm/>
            <LinhaDois/>

            <ContainerMaisVendido>
                <ContainerTextMaisVendido>
                    <ContainerText1>
                        <Text1>-</Text1>
                        <Text2>Coleções</Text2>
                    </ContainerText1>
                    <Text3>Mais Vendidos</Text3>
                    <Text4>A produção diária na nossa fábrica. novas práticas de gestão de qualidade.</Text4>
                    <Text5 onClick={() => handleNavigate('/produtos')} >Explore</Text5>
                </ContainerTextMaisVendido>
                <VoltarDestaques alt="" src={Voltar} />
                <ContainerProdutosDestaque onClick={() => handleNavigate('/produtos')} >
                    <ImageProdutoDestaque alt="" src={P1} />
                    <ProdutoNameDestaque>Vasos de cerâmica</ProdutoNameDestaque>
                    <ProdutoValorDestaque>R$ 160,00</ProdutoValorDestaque>
                </ContainerProdutosDestaque>
                <ContainerProdutosDestaque onClick={() => handleNavigate('/produtos')} >
                    <ImageProdutoDestaque alt="" src={P10} />
                    <ProdutoNameDestaque>Jarra de cerâmica</ProdutoNameDestaque>
                    <ProdutoValorDestaque>R$ 150,00</ProdutoValorDestaque>
                </ContainerProdutosDestaque>
                <ContainerProdutosDestaque onClick={() => handleNavigate('/produtos')} >
                    <ImageProdutoDestaque alt="" src={P7} />
                    <ProdutoNameDestaque>Leão de barro</ProdutoNameDestaque>
                    <ProdutoValorDestaque>R$ 300,00</ProdutoValorDestaque>
                </ContainerProdutosDestaque>
                <AvancarDestaques alt="" src={Avancar} />
            </ContainerMaisVendido>

            <ContainerImageAltaQualidade onClick={() => handleNavigate('/produtos')} >
                <ImageAltaQualidade alt="" src={AltaQualidade} />
            </ContainerImageAltaQualidade>
            <ContainerText>
                <ProdutosText1>-</ProdutosText1>
                <ProdutosText>NOSSOS PRODUTOS</ProdutosText>
                <ProdutosText1>-</ProdutosText1>
            </ContainerText>
            <ContainerCategorias>
                <CategoriaSelecionada>Mais vendidos</CategoriaSelecionada>
                <CategoriaNaoSelecionada>Decoração</CategoriaNaoSelecionada>
                <CategoriaNaoSelecionada>Cozinha</CategoriaNaoSelecionada>
            </ContainerCategorias>

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

            {/* <ContainerProdutosGeral1>
                <ContainerProdutosGeral2 onClick={() => handleNavigate('/produtos')} >
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P1} />
                        <ProdutoName>Vasos de cerâmica</ProdutoName>
                        <ProdutoValor>R$ 160,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P2} />
                        <ProdutoName>Panela de barro</ProdutoName>
                        <ProdutoValor>R$ 145,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P3} />
                        <ProdutoName>Estatueta de terracota</ProdutoName>
                        <ProdutoValor>R$ 350,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P4} />
                        <ProdutoName>Caldeirão de barro</ProdutoName>
                        <ProdutoValor>R$ 160,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P5} />
                        <ProdutoName>Potes de barro</ProdutoName>
                        <ProdutoValor>R$ 145,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P6} />
                        <ProdutoName>Tigelas de cerâmica</ProdutoName>
                        <ProdutoValor>R$ 145,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P7} />
                        <ProdutoName>Leão de barro</ProdutoName>
                        <ProdutoValor>R$ 300,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P8} />
                        <ProdutoName>Cervos de cerâmica</ProdutoName>
                        <ProdutoValor>R$ 500,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P9} />
                        <ProdutoName>São Francisco</ProdutoName>
                        <ProdutoValor>R$ 250,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P10} />
                        <ProdutoName>Jarra de cerâmica</ProdutoName>
                        <ProdutoValor>R$ 150,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P11} />
                        <ProdutoName>Cisnes de cerâmica</ProdutoName>
                        <ProdutoValor>R$ 200,00</ProdutoValor>
                    </ContainerProdutos>
                    <ContainerProdutos>
                        <ImageProduto alt="" src={P12} />
                        <ProdutoName>Coelho de barro</ProdutoName>
                        <ProdutoValor>R$ 130,00</ProdutoValor>
                    </ContainerProdutos>
                </ContainerProdutosGeral2>
            </ContainerProdutosGeral1> */}
            <Clientes/>
            <Footer/>
        </div>
    )
}

export default Home;