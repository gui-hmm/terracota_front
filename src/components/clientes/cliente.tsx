import { 
    ClientesText, 
    ClientesText1, 
    Container, 
    ContainerImage,
    ContainerImages,
    ContainerText} from "./clienteStyle";
import ClientesComentarios from "../../assets/Clientes_comentarios.png"
import ClientesComentarios1 from "../../assets/Clientes_comentarios1.png"


function Clientes(){
    return(
        <Container>
            <ContainerText>
                <ClientesText1>-</ClientesText1>
                <ClientesText>NOSSOS CLIENTES</ClientesText>
                <ClientesText1>-</ClientesText1>
            </ContainerText>
            <ContainerImages>
                <ContainerImage alt="" src={ClientesComentarios} />
                <ContainerImage alt="" src={ClientesComentarios1} />
            </ContainerImages>
        </Container>
    )
}

export default Clientes;