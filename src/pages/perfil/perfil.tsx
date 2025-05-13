import React, { useEffect, useState } from "react";
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
  SelectInput,
  Spinner,
  SpinnerWrapper,
} from "./perfilStyle";
import Voltar from "../../assets/menorQue.png";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Jarros from "../../assets/cadastro_barros.png";
import { To, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/reducers/auth";
import { api } from "../../api/api";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string; 
}

function Perfil() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [perfil, setPerfil] = useState({
    id: "",
    nome: "",
    email: "",
    cpf: "",
    contato: "",
    tipoUsuario: "cliente",
  });
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUserEmail(decoded.sub);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (userEmail) {
      const fetchPerfil = async () => {
        try {
          setLoading(true); 
          const response = await api.get(`/customers/email/${userEmail}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data;
      
          setPerfil({
            id: data.id || "",
            nome: data.name || "",
            email: data.email || "",
            cpf: data.cpf || "",
            contato: data.phone || "",
            tipoUsuario: data.role.toLowerCase() || "cliente",
          });
        } catch (error) {
          console.error("Erro ao carregar perfil:", error);
        } finally {
          setLoading(false);
        }
      };      

      fetchPerfil();
    }
  }, [userEmail, token]);

  const handleNavigate = (path: To) => {
    navigate(path);
  };

  const handleEditar = () => {
    setEditando(true);
  };

  const handleSalvar = () => {
    // Aqui você pode adicionar lógica para salvar dados no backend
    setEditando(false);
  };

  const handleSair = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header />
      {loading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          <Container>
            <ConteinerPerfilText>
              <IconVoltar alt="" src={Voltar} onClick={() => handleNavigate("/")} />
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
                  disabled
                  value={perfil.tipoUsuario}
                  title="Este campo não pode ser editado"
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
                  <ButtonEditar onClick={handleSair}>Sair</ButtonEditar>
                </ContainerButton>
              </ContainerPerfil>
            </ContainerPerfilGeral>
          </Container>
          <Footer />
        </>

      )}
    </div>
  );
}

export default Perfil;
