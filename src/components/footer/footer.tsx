import { 
    BemvindoContainerText, 
    BemvindoText, 
    ContainerFooter, 
    EmailContainer, 
    EmailInput, 
    IconsImage, 
    IconsSocialMidia, 
    IconsSocialMidiaContainer, 
    InformationContainer, 
    InscrevaseContainer, 
    InscrevaseText, 
    Page, 
    PagesContainer, 
    SobreText } from "./footerStyle";
import Linkedin from '../../assets/linkedin.png'
import Instagram from '../../assets/instagram.png';
import { To, useNavigate } from "react-router-dom";


function Footer(){

    const navigate = useNavigate();
    const handleNavigate = (path: To) => {
        navigate(path);
    };

    return (
        <div>
            <ContainerFooter>
                <InformationContainer>
                    <BemvindoContainerText>
                        <BemvindoText>
                            Bem-Vindo À TERRACOTA!
                        </BemvindoText>
                        <SobreText>
                            Somos uma empresa comprometida em oferecer uma experiência de compra excepcional, com foco na qualidade, variedade e um atendimento ao cliente de excelência.
                        </SobreText>
                        <IconsSocialMidiaContainer>
                            <IconsSocialMidia>
                                <IconsImage alt="" src={Linkedin} />
                            </IconsSocialMidia>
                            <IconsSocialMidia>
                                <IconsImage alt="" src={Instagram} />
                            </IconsSocialMidia>
                        </IconsSocialMidiaContainer>
                    </BemvindoContainerText>
                    <InscrevaseContainer>
                        <InscrevaseText>
                            Inscreva-se em nossa newsletter
                        </InscrevaseText>
                        <EmailInput placeholder="Email...">

                        </EmailInput>
                    </InscrevaseContainer>
                    <PagesContainer>
                        <Page onClick={() => handleNavigate('/')}>Home</Page>
                        <Page onClick={() => handleNavigate('/quemsomos')}>Quem Somos</Page>
                        <Page onClick={() => handleNavigate('/produtos')}>Produto</Page>
                        <Page onClick={() => handleNavigate('/login')}>login</Page>
                    </PagesContainer>
                </InformationContainer>
                <EmailContainer>
                    terracota@gmail.com
                </EmailContainer>
            </ContainerFooter>
        </div>
    )

}

export default Footer;