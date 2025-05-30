import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Voltar from "../../assets/menorQue.png";
import Modelagem from "../../assets/modelagem.png"
import { 
    Container, 
    ContainerImage, 
    ImageModelagem, 
    QuemSomosContainer, 
    QuemSomosText, 
    Text, 
    ConteinerQuemSomosText,
    IconVoltar,
    TextQuemSomos
} from "./quemSomosStyle";
import { To, useNavigate } from "react-router-dom";

function QuemSomos() {
    const navigate = useNavigate();

    const handleNavigate = (path: To) => {
        navigate(path);
    };

    return (
        <div>
            <Header />
            <Container>
                <ConteinerQuemSomosText>
                    <IconVoltar alt="" src={Voltar} onClick={() => handleNavigate('/')} />
                    <TextQuemSomos>Quem somos</TextQuemSomos>
                </ConteinerQuemSomosText>

                <ContainerImage>
                    <ImageModelagem alt="Imagem de modelagem" src={Modelagem} />
                </ContainerImage>

                <QuemSomosContainer>
                    <QuemSomosText>Quem Somos</QuemSomosText>
                    
                    <Text>
                        Bem-vindo à <strong>Terracota</strong>, uma organização dedicada ao fortalecimento e valorização dos artesãos do interior de Tracunhaém. Nosso compromisso é promover o desenvolvimento sustentável dessas comunidades, oferecendo suporte, visibilidade e recursos essenciais para seu crescimento e autonomia.
                    </Text>

                    <QuemSomosText>Equipe de Desenvolvimento do Sistema</QuemSomosText>
                    
                    <Text>
                        Nosso sistema de gestão foi desenvolvido com dedicação e excelência por uma equipe talentosa da <strong>Faculdade UNICAP – Campus Recife</strong>, formada por:
                    </Text>
                    
                    <Text>
                        <ul>
                            <li>Andressa Rayane</li>
                            <li>Guilherme Henrique</li>
                            <li>Hylan Silva</li>
                            <li>Ketyllen Oliveira</li>
                            <li>Lucas Bernadino</li>
                            <li>Welliana Maria</li>
                        </ul>
                    </Text>

                    <QuemSomosText>Nossa Missão</QuemSomosText>

                    <Text>
                        Mais do que uma plataforma digital, a Terracota é um projeto de transformação social. Atuamos como uma <strong>vitrine digital</strong> para o artesanato do interior de Pernambuco, conectando diretamente artesãos locais a clientes em âmbito regional e nacional. Essa ponte fortalece a economia criativa e ajuda a preservar o patrimônio cultural das comunidades interioranas.
                    </Text>

                    <QuemSomosText>Compromisso com o Desenvolvimento Comunitário</QuemSomosText>

                    <Text>
                        Além de nossas atividades comerciais, estamos profundamente comprometidos com o <strong>desenvolvimento educacional, social e pessoal</strong> dos artesãos, suas famílias e toda a comunidade envolvida. Por meio de projetos, iniciativas e desafios, promovemos um ambiente de aprendizado contínuo, inclusão e valorização cultural.
                    </Text>

                    <Text>
                        Explore nosso site para conhecer mais sobre a Terracota, nossos produtos e o impacto positivo que estamos construindo juntos. <strong>Junte-se a nós nesta jornada de crescimento, cultura e sustentabilidade.</strong>
                    </Text>
                </QuemSomosContainer>
            </Container>
            <Footer />
        </div>
    );
}

export default QuemSomos;
