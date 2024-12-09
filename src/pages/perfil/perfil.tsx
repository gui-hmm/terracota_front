import React, { useState } from "react";
import { 
    ButtonEditar, 
    ButtonSalvar, 
    Container, 
    ContainerButton, 
    ContainerPerfil, 
    ContainerPerfilGeral,
    ConteinerPerfilText, 
    IconVoltar, 
    ImagePerfil, 
    InputPerfil, 
    Text1,
    TextPerfil, 
    TextInput,
    SelectInput
} from "./perfilStyle";
import Voltar from "../../assets/menorQue.png";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Jarros from "../../assets/cadastro_barros.png";

function Perfil() {
    const [editando, setEditando] = useState(false);
    const [perfil, setPerfil] = useState({
        nome: "João Silva",
        email: "joao.silva@email.com",
        cpf: "123.456.789-00",
        contato: "(11) 98765-4321",
        tipoUsuario: "cliente"  // Pode ser "cliente", "artesao", "empresa"
    });

    const handleEditar = () => {
        setEditando(true);
    };

    const handleSalvar = () => {
        setEditando(false);
        // Aqui você pode salvar os dados atualizados, se necessário
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setPerfil((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            <Header />
            <Container>
                <ConteinerPerfilText>
                    <IconVoltar alt="" src={Voltar} />
                    <TextPerfil>Perfil</TextPerfil>
                </ConteinerPerfilText>
                <ContainerPerfilGeral>
                    <ImagePerfil alt="" src={Jarros} />
                    <ContainerPerfil>
                        <Text1>Informações do Perfil</Text1>

                        <TextInput>Nome</TextInput>
                        <InputPerfil 
                            name="nome"
                            disabled={!editando} 
                            value={perfil.nome} 
                            onChange={handleChange} 
                        />

                        <TextInput>Email</TextInput>
                        <InputPerfil 
                            name="email"
                            disabled={!editando} 
                            value={perfil.email} 
                            onChange={handleChange} 
                        />

                        <TextInput>CPF</TextInput>
                        <InputPerfil 
                            name="cpf"
                            disabled={!editando} 
                            value={perfil.cpf} 
                            onChange={handleChange} 
                        />

                        <TextInput>Contato</TextInput>
                        <InputPerfil 
                            name="contato"
                            disabled={!editando} 
                            value={perfil.contato} 
                            onChange={handleChange} 
                        />

                        <TextInput>Tipo de Usuário</TextInput>
                        <SelectInput 
                            name="tipoUsuario"
                            disabled={!editando} 
                            value={perfil.tipoUsuario} 
                            onChange={handleChange}
                        >
                            <option value="cliente">Cliente</option>
                            <option value="artesao">Artesão</option>
                            <option value="empresa">Empresa</option>
                        </SelectInput>

                        <ContainerButton>
                            {editando ? (
                                <ButtonSalvar onClick={handleSalvar}>Salvar</ButtonSalvar>
                            ) : (
                                <ButtonEditar onClick={handleEditar}>Editar</ButtonEditar>
                            )}
                        </ContainerButton>
                    </ContainerPerfil>
                </ContainerPerfilGeral>
            </Container>
            <Footer />
        </div>
    );
}

export default Perfil;
