import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Modelagem from "../../assets/modelagem.png"
import { 
    ContainerImage, 
    Container, 
    ImageModelagem, 
    QuemSomosContainer, 
    QuemSomosText, 
    Text } from "./quemSomosStyle";

function QuemSomos(){
    return(
        <div>
            <Header/>
            <Container>
                <ContainerImage>
                    <ImageModelagem alt="" src={Modelagem} />
                </ContainerImage>
                <QuemSomosContainer>
                    <QuemSomosText>
                        Quem Somos
                    </QuemSomosText>
                    <Text>
                        Bem-vindo à Terracota, uma organização dedicada ao apoio dos artesãos do interior de Tracunhaém. Nosso compromisso é promover o desenvolvimento sustentável dessas comunidades, fornecendo suporte e recursos essenciais para o seu crescimento.
                        <br/>Equipe de Desenvolvimento do Sistema:
                    </Text>
                    <Text>
                        Nosso sistema de gestão foi cuidadosamente desenvolvido por uma equipe talentosa da Escola UNICAP - ICAM Tech, composta por:
                    </Text>
                    <ul>
                        <Text>
                            <li>Andressa Rayane</li>
                            <li>Guilherme Henrique</li>
                            <li>Hylan Silva</li>
                            <li>Ketyllen Oliveira</li>
                            <li>Lucas Bernadino</li>
                            <li>Welliana Maria</li>
                        </Text>
                    </ul>
                    <Text>
                        Nosso Compromisso com o Desenvolvimento Comunitário<br/>
                        Além de nossas operações comerciais, estamos empenhados em promover o desenvolvimento educacional e pessoal de nossos colaboradores e suas famílias. Através de iniciativas, projetos e desafios, buscamos criar um ambiente propício para o aprendizado e o progresso contínuo de nossa comunidade. Explore nosso site para saber mais sobre a Terracota e como estamos fazendo a diferença nas vidas das pessoas e no meio ambiente. Junte-se a nós nesta jornada de crescimento e sustentabilidade!
                    </Text>
                </QuemSomosContainer>
            </Container>
            <Footer/>
        </div>
    )
}

export default QuemSomos;