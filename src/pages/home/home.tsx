import React from "react";
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


function Home() {
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
                        <ButtonExplore>
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
                    <Text5>Explore</Text5>
                </ContainerTextMaisVendido>
                <VoltarDestaques alt="" src={Voltar} />
                <ContainerProdutosDestaque>
                    <ImageProdutoDestaque alt="" src={P1} />
                    <ProdutoNameDestaque>Vasos de cerâmica</ProdutoNameDestaque>
                    <ProdutoValorDestaque>R$ 160,00</ProdutoValorDestaque>
                </ContainerProdutosDestaque>
                <ContainerProdutosDestaque>
                    <ImageProdutoDestaque alt="" src={P10} />
                    <ProdutoNameDestaque>Jarra de cerâmica</ProdutoNameDestaque>
                    <ProdutoValorDestaque>R$ 150,00</ProdutoValorDestaque>
                </ContainerProdutosDestaque>
                <ContainerProdutosDestaque>
                    <ImageProdutoDestaque alt="" src={P7} />
                    <ProdutoNameDestaque>Leão de barro</ProdutoNameDestaque>
                    <ProdutoValorDestaque>R$ 300,00</ProdutoValorDestaque>
                </ContainerProdutosDestaque>
                <AvancarDestaques alt="" src={Avancar} />
            </ContainerMaisVendido>

            <ContainerImageAltaQualidade>
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
            <ContainerProdutosGeral1>
                <ContainerProdutosGeral2>
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
            </ContainerProdutosGeral1>
            <Clientes/>
            <Footer/>
        </div>
    )
}

export default Home;