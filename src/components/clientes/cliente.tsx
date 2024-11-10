import { 
    ClientesText, 
    ClientesText1, 
    Container, 
    ContainerImage,
    ContainerText} from "./clienteStyle";
import ClientesComentarios from "../../assets/Clientes_comentarios.png"


function Clientes(){
    return(
        <Container>
            <ContainerText>
                <ClientesText1>-</ClientesText1>
                <ClientesText>NOSSOS CLIENTES</ClientesText>
                <ClientesText1>-</ClientesText1>
            </ContainerText>
            <ContainerImage alt="" src={ClientesComentarios} />
        </Container>
    )
}

export default Clientes;