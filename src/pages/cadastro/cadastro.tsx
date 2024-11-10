import { 
    ButtonEntrar,
    Checkbox,
    Container, 
    ContainerButton, 
    ContainerCadastro, 
    ContainerCadastroGeral, 
    ContainerText2, 
    ConteinerCadastroText, 
    IconVoltar, 
    ImageCadastro, 
    InputCadastro, 
    Text1, 
    Text2, 
    TextCadastro, 
    TextInput} from "./cadastroStyle";
import Voltar from "../../assets/menorQue.png"
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Clientes from "../../components/clientes/cliente";
import Jarros from "../../assets/cadastro_barros.png"

function Cadastro(){
    return(
        <div>
            <Header/>
            <Container>
                <ConteinerCadastroText>
                    <IconVoltar alt="" src={Voltar} />
                    <TextCadastro>
                        Cadastro
                    </TextCadastro>
                </ConteinerCadastroText>
                <ContainerCadastroGeral>
                    <ImageCadastro alt="" src={Jarros} />
                    <ContainerCadastro>
                        <Text1>Cadastro</Text1>
                        <TextInput>Nome</TextInput>
                        <InputCadastro/>
                        <TextInput>Sobrenome</TextInput>
                        <InputCadastro/>
                        <TextInput>Endereço</TextInput>
                        <InputCadastro/>
                        <TextInput>Cidade</TextInput>
                        <InputCadastro/>
                        <TextInput>Número</TextInput>
                        <InputCadastro/>
                        <TextInput>Complemento</TextInput>
                        <InputCadastro/>
                        <TextInput>Email</TextInput>
                        <InputCadastro/>                   
                        <ContainerText2>
                            <Checkbox type="checkbox" required />
                            <Text2>Aceitar os termos e condições</Text2>
                        </ContainerText2>
                        <ContainerButton>
                            <ButtonEntrar>Entrar</ButtonEntrar>
                        </ContainerButton>
                    </ContainerCadastro>
                </ContainerCadastroGeral>
            </Container>
            <Clientes/>
            <Footer/>
        </div>
    )
}
export default Cadastro;