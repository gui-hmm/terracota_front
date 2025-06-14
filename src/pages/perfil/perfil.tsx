// import React, { useEffect, useState, useCallback } from "react";
// import {
//     ButtonEditar,
//     ButtonSalvar,
//     Container,
//     ContainerButton,
//     ContainerPerfil,
//     ContainerPerfilGeral,
//     ConteinerPerfilText,
//     IconVoltar,
//     ImagePerfil,
//     InputPerfil,
//     Text1,
//     TextPerfil,
//     TextInput,
//     SelectInput,
//     Spinner,
//     SpinnerWrapper,
//     ContainerImageContent,
//     UserProfilePhoto,
//     StyledFileInput,
//     FileInputLabel,
// } from "./perfilStyle";
// import Voltar from "../../assets/menorQue.png";
// import Header from "../../components/header/header";
// import Footer from "../../components/footer/footer";
// import Jarros from "../../assets/cadastro_barros.png";
// import DefaultUserProfileImage from "../../assets/user.jpg";
// import { To, useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../store/hooks";
// import { logout } from "../../store/reducers/auth";
// import { api } from "../../api/api";
// import { jwtDecode } from "jwt-decode";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface JwtPayload {
//     sub: string;
//     role: "CUSTOMER" | "CRAFTSMAN" | "COMPANY";
// }

// interface ProfileData {
//     id: string;
//     nome: string;
//     email: string;
//     cpf: string;
//     contato: string;
//     tipoUsuario: string;
//     photo?: string;
// }

// type EditableProfileFields = Pick<ProfileData, 'nome' | 'contato'>;

import React, { useEffect, useState, useCallback } from "react";
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
    ContainerImageContent,
    UserProfilePhoto,
    StyledFileInput,
    FileInputLabel,
} from "./perfilStyle";
import Voltar from "../../assets/menorQue.png";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Jarros from "../../assets/cadastro_barros.png";
import DefaultUserProfileImage from "../../assets/user.jpg";
import { To, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/reducers/auth";
import { api } from "../../api/api";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Interfaces ---

interface JwtPayload {
    sub: string;
    role: "CUSTOMER" | "CRAFTSMAN" | "COMPANY";
}

// AJUSTE: Interface de perfil unificada para todos os tipos de usuário
interface ProfileData {
    id: string;
    email: string;
    contato: string;
    tipoUsuario: "CUSTOMER" | "CRAFTSMAN" | "COMPANY" | "";
    photo?: string;
    // Campos de Pessoa Física
    nome?: string;
    cpf?: string;
    // Campos de Empresa
    legal_name?: string;
    trade_name?: string;
    owner_email?: string;
    cnpj?: string;
}

// AJUSTE: Campos editáveis agora incluem os da empresa
type EditableProfileFields = Pick<ProfileData, 'nome' | 'contato' | 'legal_name' | 'trade_name'>;

function Perfil() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(false);
    const [userRole, setUserRole] = useState<JwtPayload['role'] | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    
    // AJUSTE: Estado inicial do perfil agora inclui todos os campos possíveis
    const [perfil, setPerfil] = useState<ProfileData>({
        id: "", email: "", contato: "", tipoUsuario: "", photo: "",
        nome: "", cpf: "", legal_name: "", trade_name: "", cnpj: ""
    });
    const [initialPerfilData, setInitialPerfilData] = useState<Partial<EditableProfileFields> | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [userPhotoPreview, setUserPhotoPreview] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const token = sessionStorage.getItem("token");

    // Decodificação do token (lógica sem alterações)
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                setUserEmail(decoded.sub);
                setUserRole(decoded.role);
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                toast.error("Erro ao processar sessão. Tente fazer login novamente.");
                navigate("/login");
            }
        } else {
            toast.info("Sessão não encontrada. Por favor, faça login.");
            navigate("/login");
        }
    }, [token, navigate]);

    // AJUSTE: A busca de dados agora mapeia a resposta da API dinamicamente
    const fetchUserProfile = useCallback(async (email: string, role: JwtPayload['role']) => {
        if (!token) return;
        setLoading(true);
        try {
            const roleToEndpointMap: Record<string, string> = {
                CUSTOMER: "customers",
                CRAFTSMAN: "craftsmen",
                COMPANY: "companies",
            };
            const endpointRole = roleToEndpointMap[role];
            if (!endpointRole) throw new Error("Tipo de usuário inválido");

            const response = await api.get(`/${endpointRole}/email/${email}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data;
            console.log(data);

            // AJUSTE: Mapeamento condicional dos dados recebidos
            let fetchedProfile: ProfileData;

            if (role === 'COMPANY') {
                fetchedProfile = {
                    id: data.id || "",
                    email: data.owner_email || "",
                    contato: data.phone || "",
                    tipoUsuario: data.role || "COMPANY",
                    photo: data.photo || "",
                    // Campos específicos de empresa
                    trade_name: data.trade_name || "", 
                    legal_name: data.legal_name || "",
                    cnpj: data.cnpj || "",
                };
            } else { // Para CUSTOMER e CRAFTSMAN
                fetchedProfile = {
                    id: data.id || "",
                    nome: data.name || "",
                    email: data.email || "",
                    cpf: data.cpf || "",
                    contato: data.phone || "",
                    tipoUsuario: data.role || "",
                    photo: data.photo || "",
                };
            }

            setPerfil(fetchedProfile);
            // Salva o estado inicial para comparar depois
            setInitialPerfilData({ 
                nome: fetchedProfile.nome, 
                contato: fetchedProfile.contato,
                legal_name: fetchedProfile.legal_name,
                trade_name: fetchedProfile.trade_name
            });
            setUserPhotoPreview(data.photo || null);
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
            toast.error("Erro ao carregar informações do perfil.");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (userEmail && userRole) {
            fetchUserProfile(userEmail, userRole);
        }
    }, [userEmail, userRole, fetchUserProfile]);

    // ... (handleNavigate sem alterações) ...
    const handleNavigate = (path: To) => navigate(path);

    const handleEditar = () => {
        setEditando(true);
        setInitialPerfilData({ nome: perfil.nome, contato: perfil.contato });
        if (perfil.photo && !selectedFile) {
            setUserPhotoPreview(perfil.photo);
        }
    };

    const handleFileChangeForProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const MAX_SIZE_MB = 15;

            if (!file.type.startsWith("image/")) {
                toast.error("Por favor, selecione um arquivo de imagem.");
                return;
            }
            if (file.size > MAX_SIZE_MB * 1024 * 1024) { 
                toast.error(`A imagem é muito grande (máx ${MAX_SIZE_MB}MB).`);
                return;
            }
            setSelectedFile(file);
            setUserPhotoPreview(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setUserPhotoPreview(perfil.photo || null);
        }
    };
    
    // AJUSTE: Comparação de dados alterados agora inclui campos da empresa
    const profileDataChanged = (): boolean => {
        if (!initialPerfilData) return false;
        if (userRole === 'COMPANY') {
            return perfil.trade_name !== initialPerfilData.trade_name ||
                   perfil.legal_name !== initialPerfilData.legal_name ||
                   perfil.contato !== initialPerfilData.contato;
        } else {
            return perfil.nome !== initialPerfilData.nome || 
                   perfil.contato !== initialPerfilData.contato;
        }
    };

    const handleSalvar = async () => {
        // ... (verificações iniciais sem alterações) ...
        if (!perfil.id || !userRole) {
            toast.error("ID do usuário ou tipo de usuário não encontrado.");
            return;
        }

        const hasDataChanged = profileDataChanged();
        const hasNewImage = !!selectedFile;

        if (!hasDataChanged && !hasNewImage) {
            toast.info("Nenhuma alteração para salvar.");
            setEditando(false);
            return;
        }

        setIsSaving(true);
        let anyUpdateSucceeded = false;
        
        if (profileDataChanged()) {
            try {
                // AJUSTE: Payload de atualização e endpoint dinâmicos
                let profileUpdatePayload: any;
                const roleToUpdateEndpoint: Record<string, string> = {
                    CUSTOMER: "customers",
                    CRAFTSMAN: "craftsmen",
                    COMPANY: "companies", // NOVO: Endpoint de atualização para empresa
                };
                const updateEndpointRole = roleToUpdateEndpoint[userRole!];

                if (userRole === 'COMPANY') {
                    profileUpdatePayload = {
                        trade_name: perfil.trade_name,
                        legal_name: perfil.legal_name,
                        phone: perfil.contato,
                    };
                } else {
                    profileUpdatePayload = {
                        name: perfil.nome,
                        phone: perfil.contato,
                    };
                }
                
                await api.put(`/${updateEndpointRole}/${perfil.id}`, profileUpdatePayload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Dados do perfil atualizados!");
                // Recarregar os dados após o sucesso
                if(userEmail && userRole) await fetchUserProfile(userEmail, userRole);

            } catch (error: any) {
                 toast.error(error.response?.data?.message || "Erro ao atualizar os dados.");
            }
        }

        if (hasNewImage && selectedFile) { 
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
                anyUpdateSucceeded = true; 
                if(userEmail && userRole) await fetchUserProfile(userEmail, userRole);
            } catch (error: any) {
                console.error("Erro ao enviar imagem de perfil:", error);
                toast.error(error.response?.data?.message || "Erro ao atualizar a foto de perfil.");
            }
        }
        
        setIsSaving(false);
        if(anyUpdateSucceeded || !hasDataChanged){ 
            setEditando(false);
        }
        setSelectedFile(null);
        
        setIsSaving(false);
        setEditando(false);
        setSelectedFile(null);
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
            {loading ? ( <SpinnerWrapper><Spinner /></SpinnerWrapper> ) : (
                <>
                    <Container>
                        <ConteinerPerfilText>
                            <IconVoltar alt="Voltar" src={Voltar} onClick={() => handleNavigate("/")} />
                            <TextPerfil>Perfil</TextPerfil>
                        </ConteinerPerfilText>
                        <ContainerPerfilGeral>
                            <ImagePerfil alt="Decoração" src={Jarros} />
                            <ContainerPerfil>
                                <Text1>Informações do Perfil</Text1>
                                <ContainerImageContent>
                                    <UserProfilePhoto
                                        alt="Foto de Perfil"
                                        src={userPhotoPreview || DefaultUserProfileImage}
                                        onError={(e) => { e.currentTarget.src = DefaultUserProfileImage; }}
                                    />
                                    {editando && (
                                        <>
                                            <StyledFileInput
                                                type="file"
                                                id="fileInputUserProfile"
                                                onChange={handleFileChangeForProfile}
                                                accept="image/png, image/jpeg, image/webp"
                                            />
                                            <FileInputLabel htmlFor="fileInputUserProfile">
                                                {selectedFile ? selectedFile.name : "Alterar Foto"}
                                            </FileInputLabel>
                                        </>
                                    )}
                                </ContainerImageContent>

                                {/* AJUSTE: Renderização condicional dos campos do perfil */}
                                {userRole === 'COMPANY' ? (
                                    <>
                                        {/* CAMPOS PARA EMPRESA */}
                                        <TextInput>Nome Fantasia</TextInput>
                                        <InputPerfil name="trade_name" disabled={!editando} value={perfil.trade_name} onChange={handleChange} />
                                        
                                        <TextInput>Razão Social</TextInput>
                                        <InputPerfil name="legal_name" disabled={!editando} value={perfil.legal_name} onChange={handleChange} />

                                        <TextInput>CNPJ</TextInput>
                                        <InputPerfil name="cnpj" disabled value={perfil.cnpj} readOnly title="O CNPJ não pode ser alterado." />
                                    </>
                                ) : (
                                    <>
                                        {/* CAMPOS PARA PESSOA FÍSICA */}
                                        <TextInput>Nome</TextInput>
                                        <InputPerfil name="nome" disabled={!editando} value={perfil.nome} onChange={handleChange} />

                                        <TextInput>CPF</TextInput>
                                        <InputPerfil name="cpf" disabled value={perfil.cpf} readOnly title="O CPF não pode ser alterado." />
                                    </>
                                )}

                                {/* CAMPOS COMUNS A TODOS */}
                                <TextInput>Email</TextInput>
                                <InputPerfil name="email" disabled value={perfil.email} readOnly title="O e-mail não pode ser alterado." />
                                
                                <TextInput>Contato</TextInput>
                                <InputPerfil name="contato" disabled={!editando} value={perfil.contato} onChange={handleChange} />
                                
                                <TextInput>Tipo de Usuário</TextInput>
                                <SelectInput name="tipoUsuario" disabled value={perfil.tipoUsuario} title="Este campo não pode ser editado">
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