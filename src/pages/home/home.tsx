import React from "react";
import { 
    BarrosExplore,
    ButtonExplore,
    ExploreContainer, 
    ExploreContainerColuns, 
    LinhaDois, 
    LinhaUm, 
    TextDois, 
    TextExploreContainer,
    TextUm} from "./homeStyle";
import Header from '../../components/header/header'
import BarrosImage from '../../assets/explore_barros.png'
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
            <Clientes/>
            <Footer/>
        </div>
    )
}

export default Home;