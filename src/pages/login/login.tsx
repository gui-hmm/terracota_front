import { 
    ButtonEntrar,
    ButtonEsqueceuSenha,
    Container, 
    ContainerButton, 
    ContainerLogin, 
    ContainerLoginGeral, 
    ContainerText3, 
    ConteinerLoginText, 
    IconVoltar, 
    ImageLogin, 
    InputLogin, 
    Text1, 
    Text2, 
    Text3, 
    Text4, 
    TextLogin } from "./loginStyle";
import Voltar from "../../assets/menorQue.png"
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Clientes from "../../components/clientes/cliente";
import Jarro from "../../assets/login_jarro.png"

function Login(){
    return(
        <div>
            <Header/>
            <Container>
                <ConteinerLoginText>
                    <IconVoltar alt="" src={Voltar} />
                    <TextLogin>
                        Login
                    </TextLogin>
                </ConteinerLoginText>
                <ContainerLoginGeral>
                    <ImageLogin alt="" src={Jarro} />
                    <ContainerLogin>
                        <Text1>Login</Text1>
                        <Text2>Digite seus detalhes abaixo</Text2>
                        <InputLogin placeholder="Email" />
                        <InputLogin placeholder="Senha" />
                        <ContainerText3>
                            <Text3>Ainda não fez cadastro?</Text3>
                            <Text4>Acesse aqui</Text4>
                        </ContainerText3>
                        <ContainerButton>
                            <ButtonEntrar>Entrar</ButtonEntrar>
                            <ButtonEsqueceuSenha>Esqueceu a senha?</ButtonEsqueceuSenha>
                        </ContainerButton>
                    </ContainerLogin>
                </ContainerLoginGeral>
            </Container>
            <Clientes/>
            <Footer/>
        </div>
    )
}
export default Login;