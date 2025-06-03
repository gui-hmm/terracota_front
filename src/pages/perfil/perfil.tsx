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

type EditableProfileFields = Pick<ProfileData, 'nome' | 'contato'>;

function Perfil() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(false);
    const [userRole, setUserRole] = useState<JwtPayload['role'] | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    
    const [perfil, setPerfil] = useState<ProfileData>({
        id: "", nome: "", email: "", cpf: "", contato: "", tipoUsuario: "", photo: "",
    });
    const [initialPerfilData, setInitialPerfilData] = useState<EditableProfileFields | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
                navigate("/login");
            }
        } else {
            toast.info("Sessão não encontrada. Por favor, faça login.");
            navigate("/login");
        }
    }, [token, navigate]);

    const fetchUserProfile = useCallback(async (email: string, role: JwtPayload['role']) => {
        if (!token) return;
        setLoading(true);
        try {
            const roleToEndpointMap: Record<string, string> = {
                CUSTOMER: "customers",
                CRAFTSMAN: "craftsmen",
                COMPANY: "companies",
            };
            const endpointRole = roleToEndpointMap[role] || "customers";

            const response = await api.get(`/${endpointRole}/email/${email}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data;

            const fetchedProfile: ProfileData = {
                id: data.id || "",
                nome: data.name || "",
                email: data.email || "",
                cpf: data.cpf || "",
                contato: data.phone || "",
                tipoUsuario: data.role || "",
                photo: data.photo || "",
            };
            setPerfil(fetchedProfile);
            setInitialPerfilData({ nome: fetchedProfile.nome, contato: fetchedProfile.contato });
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

    const handleNavigate = (path: To) => {
        navigate(path);
    };

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
            if (!file.type.startsWith("image/")) {
                toast.error("Por favor, selecione um arquivo de imagem.");
                return;
            }
            if (file.size > 5 * 1024 * 1024) { 
                toast.error("A imagem é muito grande (máx 5MB).");
                return;
            }
            setSelectedFile(file);
            setUserPhotoPreview(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setUserPhotoPreview(perfil.photo || null);
        }
    };
    
    const profileDataChanged = (): boolean => {
        if (!initialPerfilData) return false;
        return perfil.nome !== initialPerfilData.nome || perfil.contato !== initialPerfilData.contato;
    };

    const handleSalvar = async () => {
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

        if (hasDataChanged) {
            try {
                const profileUpdatePayload = {
                    name: perfil.nome,
                    phone: perfil.contato,
                };

                const roleToUpdateEndpoint: Record<string, string> = {
                    CUSTOMER: "customers",
                    CRAFTSMAN: "craftsmen",
                    // COMPANY: "companies", // Adicionar se houver endpoint de PUT para company
                };
                const updateEndpointRole = roleToUpdateEndpoint[userRole];

                if (!updateEndpointRole) {
                    toast.error(`Tipo de usuário '${userRole}' não suporta atualização de dados.`);
                    throw new Error("Endpoint de atualização não encontrado para o role.");
                }
                
                console.log("Atualizando dados do perfil:", profileUpdatePayload);
                await api.put(`/${updateEndpointRole}/${perfil.id}`, profileUpdatePayload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Dados do perfil atualizados!");
                setInitialPerfilData({ nome: perfil.nome, contato: perfil.contato });
                anyUpdateSucceeded = true;
            } catch (error: any) {
                console.error("Erro ao atualizar dados do perfil:", error);
                toast.error(error.response?.data?.message || "Erro ao atualizar os dados do perfil.");
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
                <SpinnerWrapper><Spinner /></SpinnerWrapper>
            ) : (
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

                                <TextInput>Nome</TextInput>
                                <InputPerfil name="nome" disabled={!editando} value={perfil.nome} onChange={handleChange} />
                                <TextInput>Email</TextInput>
                                <InputPerfil name="email" disabled value={perfil.email} readOnly title="O e-mail não pode ser alterado." />
                                <TextInput>CPF</TextInput>
                                <InputPerfil name="cpf" disabled value={perfil.cpf} readOnly title="O CPF não pode ser alterado." />
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