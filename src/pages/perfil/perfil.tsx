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
    ImagePerfil, // Esta é a imagem decorativa grande
    InputPerfil,
    Text1,
    TextPerfil,
    TextInput,
    SelectInput,
    Spinner,
    SpinnerWrapper,
    // Novos/Reutilizados para a foto do usuário
    ContainerImageContent, // Para agrupar a foto do usuário e o botão de upload
    UserProfilePhoto,      // O styled component para a foto do usuário (antes PreviewImage)
    StyledFileInput,
    FileInputLabel,
} from "./perfilStyle";
import Voltar from "../../assets/menorQue.png";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Jarros from "../../assets/cadastro_barros.png"; // Imagem decorativa
import DefaultUserProfileImage from "../../assets/user.jpg"; // CRIE UMA IMAGEM PADRÃO
import { To, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/reducers/auth";
import { api } from "../../api/api";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface JwtPayload {
    sub: string;
    role: "CUSTOMER" | "CRAFTSMAN" | "COMPANY";
}

interface ProfileData {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    contato: string;
    tipoUsuario: string;
    photo?: string;
}

function Perfil() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(false);
    const [userRole, setUserRole] = useState<JwtPayload['role'] | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [perfil, setPerfil] = useState<ProfileData>({
        id: "",
        nome: "",
        email: "",
        cpf: "",
        contato: "",
        tipoUsuario: "",
        photo: "",
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // O previewUrl agora será usado para a foto de perfil do usuário
    const [userPhotoPreview, setUserPhotoPreview] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                setUserEmail(decoded.sub);
                setUserRole(decoded.role);
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                toast.error("Erro ao processar sessão. Tente fazer login novamente.");
                // navigate("/login"); // Considere redirecionar se o token for inválido
            }
        } else {
            toast.info("Sessão não encontrada. Por favor, faça login.");
            navigate("/login");
        }
    }, [token, navigate]);

    const fetchUserProfile = async (email: string, role: JwtPayload['role']) => {
        if (!token) return;
        setLoading(true);
        try {
            const roleToEndpoint: Record<string, string> = {
                CUSTOMER: "customers",
                CRAFTSMAN: "craftsmen",
                COMPANY: "companies",
            };
            const endpointRole = roleToEndpoint[role] || "customers";

            const response = await api.get(`/${endpointRole}/email/${email}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data;

            setPerfil({
                id: data.id || "",
                nome: data.name || "",
                email: data.email || "",
                cpf: data.cpf || "",
                contato: data.phone || "",
                tipoUsuario: data.role || "",
                photo: data.photo || "",
            });
            // Define o preview inicial com a foto existente do perfil ou null
            setUserPhotoPreview(data.photo || null);

        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
            toast.error("Erro ao carregar informações do perfil.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userEmail && userRole) {
            fetchUserProfile(userEmail, userRole);
        }
    }, [userEmail, userRole, token]); // Adicionado token como dependência

    const handleNavigate = (path: To) => {
        navigate(path);
    };

    const handleEditar = () => {
        setEditando(true);
        // Ao entrar no modo de edição, se nenhum novo arquivo foi selecionado,
        // o userPhotoPreview já deve estar com a foto atual (do fetchUserProfile) ou null.
        // Não precisamos resetar o selectedFile aqui, pois ele só é definido se o usuário escolher um novo.
    };

    const handleFileChangeForProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!file.type.startsWith("image/")) {
                toast.error("Por favor, selecione um arquivo de imagem.");
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB Limite
                toast.error("A imagem é muito grande (máx 5MB).");
                return;
            }
            setSelectedFile(file);
            setUserPhotoPreview(URL.createObjectURL(file)); // Atualiza o preview com a nova imagem
        } else {
            setSelectedFile(null);
            // Se o usuário cancelar, volta a mostrar a foto original do perfil (se houver)
            setUserPhotoPreview(perfil.photo || null);
        }
    };

    const handleSalvar = async () => {
        if (!perfil.id) {
            toast.error("ID do usuário não encontrado.");
            return;
        }
        setIsSaving(true);

        let profileDataUpdated = false;

        // Passo 1: Salvar outros dados do perfil (se houver lógica para isso)
        // Exemplo:
        // if (dadosDoFormularioForamAlterados) {
        // try {
        //   const profileUpdatePayload = { nome: perfil.nome, contato: perfil.contato };
        //   const endpointRole = roleToEndpoint[perfil.tipoUsuario.toUpperCase()] || "customers";
        //   await api.put(`/${endpointRole}/${perfil.id}`, profileUpdatePayload, { headers: { Authorization: `Bearer ${token}` } });
        //   toast.success("Dados do perfil atualizados!");
        //   profileDataUpdated = true;
        // } catch (error) {
        //   toast.error("Erro ao atualizar dados do perfil.");
        //   console.error("Erro dados perfil:", error);
        // }
        // }

        // Passo 2: Salvar a nova imagem de perfil, se selecionada
        if (selectedFile) {
            try {
                const imageFormData = new FormData();
                imageFormData.append("file", selectedFile);
                imageFormData.append("id", perfil.id);

                await api.patch("/images", imageFormData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': undefined,
                    },
                });
                toast.success("Foto de perfil atualizada!");
                // Após o upload, o fetchUserProfile buscará a nova URL da foto
                if(userEmail && userRole) await fetchUserProfile(userEmail, userRole); // Re-fetch para pegar a nova URL da foto
                profileDataUpdated = true; // Marca que algo foi atualizado
            } catch (error) {
                console.error("Erro ao enviar imagem de perfil:", error);
                toast.error("Erro ao atualizar a foto de perfil.");
            }
        }
        
        // Se nenhuma alteração foi feita (nem dados, nem foto)
        if (!profileDataUpdated && !selectedFile && !outrosDadosForamAlterados()) { // precisa da função outrosDadosForamAlterados()
             toast.info("Nenhuma alteração para salvar.");
        }


        setIsSaving(false);
        setEditando(false);
        setSelectedFile(null); // Limpa o arquivo selecionado independentemente do resultado
        // setUserPhotoPreview não precisa ser limpo aqui, pois o fetchUserProfile o atualizará
    };
    
    // Função auxiliar para verificar se outros dados foram alterados (exemplo)
    const outrosDadosForamAlterados = (): boolean => {
        // Compare `perfil` com o estado inicial do perfil (você precisaria armazenar o estado inicial ao carregar)
        // Por simplicidade, vamos assumir que se estiver editando, sempre há potencial para salvar
        return editando; // Simplificação, melhore isso se tiver edição de outros campos
    };


    const handleSair = () => {
        dispatch(logout());
        sessionStorage.removeItem("token");
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
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            {loading ? (
                <SpinnerWrapper>
                    <Spinner />
                </SpinnerWrapper>
            ) : (
                <>
                    <Container>
                        <ConteinerPerfilText>
                            <IconVoltar alt="Voltar" src={Voltar} onClick={() => handleNavigate("/")} />
                            <TextPerfil>Perfil</TextPerfil>
                        </ConteinerPerfilText>
                        <ContainerPerfilGeral>
                            {/* Imagem decorativa à esquerda (como estava) */}
                            <ImagePerfil alt="Decoração" src={Jarros} />

                            {/* Container do formulário à direita */}
                            <ContainerPerfil>
                                <Text1>Informações do Perfil</Text1>

                                {/* Bloco para a foto de perfil do usuário */}
                                <ContainerImageContent>
                                    <UserProfilePhoto
                                        alt="Foto de Perfil"
                                        src={userPhotoPreview || DefaultUserProfileImage} // Usa o preview, depois foto do perfil, depois um default
                                        onError={(e) => { e.currentTarget.src = DefaultUserProfileImage; }} // Fallback para imagem padrão
                                    />
                                    {editando && (
                                        <>
                                            <StyledFileInput
                                                type="file"
                                                id="fileInputUserProfile" // ID único
                                                onChange={handleFileChangeForProfile}
                                                accept="image/png, image/jpeg, image/webp"
                                            />
                                            <FileInputLabel htmlFor="fileInputUserProfile">
                                                {selectedFile ? selectedFile.name : "Alterar Foto"}
                                            </FileInputLabel>
                                        </>
                                    )}
                                </ContainerImageContent>

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
                                    disabled // Email geralmente não é editável
                                    value={perfil.email}
                                    readOnly // Adicionado para clareza
                                    title="O e-mail não pode ser alterado."
                                />

                                <TextInput>CPF</TextInput>
                                <InputPerfil
                                    name="cpf"
                                    disabled // CPF geralmente não é editável
                                    value={perfil.cpf}
                                    readOnly // Adicionado para clareza
                                    title="O CPF não pode ser alterado."
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
                                    <option value="CUSTOMER">Cliente</option>
                                    <option value="CRAFTSMAN">Artesão</option>
                                    <option value="COMPANY">Empresa</option>
                                </SelectInput>

                                <ContainerButton>
                                    {editando ? (
                                        <ButtonSalvar onClick={handleSalvar} disabled={isSaving}>
                                            {isSaving ? <Spinner style={{width: '20px', height: '20px', borderWidth: '2px'}} /> :"Salvar Alterações"}
                                        </ButtonSalvar>
                                    ) : (
                                        <ButtonEditar onClick={handleEditar}>Editar Perfil</ButtonEditar>
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