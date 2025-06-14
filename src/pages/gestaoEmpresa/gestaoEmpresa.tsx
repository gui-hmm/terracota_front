import React, { useEffect, useState, useMemo } from "react";
import { api } from "../../api/api";
import { jwtDecode } from "jwt-decode";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Voltar from "../../assets/menorQue.png";
import DefaultProductImage from "../../assets/p1.png";
import DefaultUserProfileImage from "../../assets/user.jpg";
import {
  Container,
  ProductList,
  ProductItem,
  ProductImage,
  Button,
  Select,
  Spinner,
  IconVoltar,
  Titles,
  ContainerInputs,
  TextInput,
  InputProdutos,
  SpinnerButton,
  FileInputLabel,
  StyledFileInput,
  PreviewImage,
  Actions,
  ArtesaoList,
  ConteinerGestaoEmpresasText,
  TextGestaoEmpresas,
  ContainerArtesao,
  ContainerSelecionarArtesao,
  CardArtesaoSelecionado,
  ContainerProdutos
} from "./gestaoEmpresaStyle";

interface Craftsman {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  type: string;
  photo: string;
  craftsman: Craftsman;
}

interface JwtPayload {
  sub: string;
  role: string;
  companyId: string;
}

const GestaoEmpresa = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [companyId, setCompanyId] = useState<string | null>(null);
  const [produtosGerenciados, setProdutosGerenciados] = useState<Product[]>([]);
  const [artesaosDisponiveis, setArtesaosDisponiveis] = useState<Craftsman[]>([]);
  const [managedCraftsmen, setManagedCraftsmen] = useState<Craftsman[]>([]);
  
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isAssociating, setIsAssociating] = useState(false);
  const [artesaoSelecionadoParaAssociar, setArtesaoSelecionadoParaAssociar] = useState<string>("");
  const [filtroArtesao, setFiltroArtesao] = useState<string>("todos");

  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [editingPreviewUrl, setEditingPreviewUrl] = useState<string | null>(null);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [buttonLoadingMap, setButtonLoadingMap] = useState<Record<string, string | null>>({});

  const setLoadingFor = (id: string, isLoading: boolean) => {
    setLoadingIds((prev) =>
      isLoading ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };
  const setButtonLoading = (productId: string, buttonType: string | null) => {
    setButtonLoadingMap((prev) => ({ ...prev, [productId]: buttonType }));
  };
  const isButtonLoading = (productId: string, buttonType: string) =>
    buttonLoadingMap[productId] === buttonType;

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            const email = decoded.sub;
            const fetchCraftsman = async () => {
                try {
                    const res = await api.get(`/companies/email/${email}`,{
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setCompanyId(res.data.id);
                } catch (error) {
                    console.error("Erro ao buscar artesão:", error);
                    toast.error("Falha ao identificar artesão.");
                }
            };
            
            fetchCraftsman();
        
        } else {
            toast.error("Sessão inválida. Por favor, faça login novamente.");
            navigate("/login");
        }
    }, [token, navigate]);
  
  useEffect(() => {
    if (!companyId) return;

    const fetchData = async () => {
      setIsFetchingData(true);
      try {
        const managedCraftsmenSummary = await api.get(`/companies/${companyId}/craftsmen`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const summaries: { id: string }[] = managedCraftsmenSummary.data.items || [];

        const detailPromises = summaries.map(summary =>
            api.get(`/craftsmen/${summary.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        );
        const detailResponses = await Promise.all(detailPromises);
        const managedCraftsmenList: Craftsman[] = detailResponses.map(res => res.data);

        setManagedCraftsmen(managedCraftsmenList);

        if (managedCraftsmenList.length > 0) {
            const productPromises = managedCraftsmenList.map(craftsman =>
                api.get(`/products/craftsmen/${craftsman.id}`, { headers: { Authorization: `Bearer ${token}` } })
            );
            const productResponses = await Promise.all(productPromises);
            const allProducts = productResponses.flatMap((response, i) => {
                const craftsman = managedCraftsmenList[i];
                return (response.data.items || []).map((product: any) => ({
                    ...product,
                    craftsman
                }));
            });
            setProdutosGerenciados(allProducts);
        } else {
            setProdutosGerenciados([]);
        }

        const allCraftsmenSummaryResponse = await api.get('/craftsmen?perPage=200', { 
            headers: { Authorization: `Bearer ${token}` } 
        });
        const allCraftsmenSummaryList: {id: string}[] = allCraftsmenSummaryResponse.data.items || [];
        
        const managedCraftsmanIds = new Set(managedCraftsmenList.map(c => c.id));
        const availableCraftsmenSummaries = allCraftsmenSummaryList.filter(c => !managedCraftsmanIds.has(c.id));
        
        if (availableCraftsmenSummaries.length > 0) {
            const detailPromises = availableCraftsmenSummaries.map(summary =>
                api.get(`/craftsmen/${summary.id}`, { headers: { Authorization: `Bearer ${token}` } })
            );
            const detailResponses = await Promise.all(detailPromises);
            const availableCraftsmenWithDetails = detailResponses.map(res => res.data);
            setArtesaosDisponiveis(availableCraftsmenWithDetails);
        } else {
            setArtesaosDisponiveis([]);
        }

      } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error);
        toast.error("Falha ao carregar dados de gestão.");
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchData();
  }, [companyId, token]);

  const handleAssociateArtisan = async () => {
    if (!artesaoSelecionadoParaAssociar || !companyId) return;
    setIsAssociating(true);
    try {
        await api.post(`/companies/${companyId}/craftsmen/${artesaoSelecionadoParaAssociar}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Artesão associado com sucesso! Atualizando dados...");
        const event = new Event('forceReload');
        window.dispatchEvent(event);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Erro ao associar artesão.");
    } finally {
        setIsAssociating(false);
    }
  };

  const handleRemoveCraftsman = async (craftsmanId: string) => {
    if (!window.confirm("Tem certeza que deseja remover este artesão da empresa?")) return;
    try {
        await api.delete(`/companies/craftsmen/${craftsmanId}`, {
        headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Artesão removido com sucesso.");
        const event = new Event("forceReload");
        window.dispatchEvent(event);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Erro ao remover artesão.");
    }
    };

  const startEditing = (product: Product) => {
    setEditProductId(product.id);
    setEditedProduct({ ...product });
    setEditingPreviewUrl(product.photo || null);
    setEditingFile(null);
  };
  const cancelEditing = () => { setEditProductId(null); };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };
  const handleEditingFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setEditingFile(e.target.files[0]);
        setEditingPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleEditProduct = async () => {
    if (!editProductId || !editedProduct?.craftsman?.id) {
        toast.error("Erro: ID do produto ou do artesão não encontrado.");
        return;
    }
    setLoadingFor(editProductId, true);
    setButtonLoading(editProductId, "save");
    try {
        const { craftsman, photo, ...productDataToUpdate } = editedProduct;
        await api.put(`/products/${editProductId}/craftsmen/${craftsman.id}`, productDataToUpdate, {
            headers: { Authorization: `Bearer ${token}` },
        });
        toast.info("Dados do produto atualizados.");
        if (editingFile)
        toast.success("Produto atualizado completamente!");
        cancelEditing();
        const event = new Event('forceReload');
        window.dispatchEvent(event);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Erro na atualização.");
    } finally {
        setLoadingFor(editProductId, false);
        setButtonLoading(editProductId, null);
    }
  };

  const produtosFiltrados = useMemo(() => {
    if (filtroArtesao === 'todos') return produtosGerenciados;
    return produtosGerenciados.filter(p => p.craftsman?.id === filtroArtesao);
  }, [produtosGerenciados, filtroArtesao]);

  const artesaoSelecionadoInfo = artesaosDisponiveis.find(a => a.id === artesaoSelecionadoParaAssociar);

  return (
    <>
      <Header />
      <Container>
        <ConteinerGestaoEmpresasText onClick={() => navigate("/")}>
            <IconVoltar alt="Voltar" src={Voltar} />
            <TextGestaoEmpresas>Painel da Empresa</TextGestaoEmpresas>
        </ConteinerGestaoEmpresasText>

        <Titles>Associar Novo Artesão</Titles>
        <ContainerArtesao>
            <ContainerSelecionarArtesao>
                <TextInput>Selecione um artesão disponível para gerenciar</TextInput>
                <Select value={artesaoSelecionadoParaAssociar} onChange={(e) => setArtesaoSelecionadoParaAssociar(e.target.value)} disabled={isAssociating}>
                    <option value="">Selecione...</option>
                    {artesaosDisponiveis.map(artesao => (<option key={artesao.id} value={artesao.id}>{artesao.name}</option>))}
                </Select>
                {artesaoSelecionadoInfo && (
                    <CardArtesaoSelecionado>
                        <p><strong>Nome:</strong> {artesaoSelecionadoInfo.name}</p>
                        <p><strong>Email:</strong> {artesaoSelecionadoInfo.email}</p>
                        <p><strong>Telefone:</strong> {artesaoSelecionadoInfo.phone}</p>
                    </CardArtesaoSelecionado>
                )}
                <Button onClick={handleAssociateArtisan} disabled={isAssociating || !artesaoSelecionadoParaAssociar}>
                    {isAssociating ? <SpinnerButton /> : 'Associar Artesão à Empresa'}
                </Button>
            </ContainerSelecionarArtesao>

            <Titles>Artesãos Associados</Titles>
            {managedCraftsmen.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>Nenhum artesão associado ainda.</p>
            ) : (
            <ArtesaoList>
                {managedCraftsmen.map((artesao) => (
                <ProductItem key={artesao.id}>
                    <ProductImage
                    src={artesao.photo || DefaultUserProfileImage}
                    alt={artesao.name}
                    onError={(e) => {
                        e.currentTarget.src = DefaultUserProfileImage;
                    }}
                    />
                    <p><strong>{artesao.name}</strong></p>
                    <p>Email: {artesao.email}</p>
                    <p>Telefone: {artesao.phone}</p>
                    <Actions>
                    <Button onClick={() => handleRemoveCraftsman(artesao.id)}>
                        Remover
                    </Button>
                    </Actions>
                </ProductItem>
                ))}
            </ArtesaoList>
            )}
        </ContainerArtesao>

        <Titles>Curadoria de Produtos</Titles>
        <ContainerProdutos>
            <TextInput>Filtrar produtos por artesão</TextInput>
            <Select value={filtroArtesao} onChange={(e) => setFiltroArtesao(e.target.value)}>
                <option value="todos">Todos os Artesãos</option>
                {managedCraftsmen.map(artesao => (<option key={artesao.id} value={artesao.id}>{artesao.name}</option>))}
            </Select>
        </ContainerProdutos>

        {isFetchingData ? (<Spinner><div className="loader" /></Spinner>) : 
        produtosFiltrados.length === 0 ? (<p style={{textAlign: "center", width: '100%'}}>Nenhum produto encontrado.</p>) : 
        (
            <ProductList>
                {produtosFiltrados.map((product) => {
                    const isItemLoading = loadingIds.includes(product.id);
                    return (
                        <ProductItem key={product.id}>
                            <ProductImage 
                                src={product.photo || DefaultProductImage} 
                                alt={product.name} 
                                onError={(e) => { e.currentTarget.src = DefaultProductImage; }}
                            />
                            
                            {editProductId === product.id ? (
                                <>
                                    {/* Formulário de Edição */}
                                    <TextInput>Nome</TextInput>
                                    <InputProdutos name="name" value={editedProduct.name || ""} onChange={handleEditChange} disabled={isItemLoading} />
                                    <TextInput>Descrição</TextInput>
                                    <InputProdutos name="description" value={editedProduct.description || ""} onChange={handleEditChange} disabled={isItemLoading} />
                                    <TextInput>Preço</TextInput>
                                    <InputProdutos name="price" type="number" step="0.01" min="0.01" value={editedProduct.price || ""} onChange={handleEditChange} disabled={isItemLoading} />
                                    <TextInput>Quantidade</TextInput>
                                    <InputProdutos name="quantity" type="number" min="0" step="1" value={editedProduct.quantity || ""} onChange={handleEditChange} disabled={isItemLoading} />
                                    <TextInput>Tipo</TextInput>
                                    <Select name="type" value={editedProduct.type || ""} onChange={handleEditChange} disabled={isItemLoading}>
                                        <option value="">Selecione o tipo</option>
                                        <option value="joias_artesanais">Joias artesanais</option>
                                        <option value="cerâmica">Cerâmica</option>
                                        <option value="arte_têxtil">Arte têxtil</option>
                                        <option value="trabalhos_em_madeira">Trabalhos em madeira</option>
                                        <option value="artesanato_em_couro">Artesanato em couro</option>
                                        <option value="arte_em_vidro">Arte em vidro</option>
                                        <option value="esculturas">Esculturas</option>
                                        <option value="pintura">Pintura</option>
                                        <option value="artesanato_em_papel">Artesanato em papel</option>
                                        <option value="crocê_e_tricô">Crochê e tricô</option>
                                        <option value="arte_em_metal">Arte em metal</option>
                                        <option value="arte_em_resina">Arte em resina</option>
                                        <option value="produtos_sustentáveis">Produtos sustentáveis</option>
                                        <option value="brinquedos_artesanais">Brinquedos artesanais</option>
                                    </Select>
                                    <ContainerInputs>
                                        <TextInput>Nova Foto (opcional)</TextInput>
                                        <StyledFileInput type="file" id={`editFileInput-${product.id}`} onChange={handleEditingFileChange} accept="image/*" />
                                        <FileInputLabel htmlFor={`editFileInput-${product.id}`}>
                                            {editingFile ? editingFile.name : "Escolher nova foto"}
                                        </FileInputLabel>
                                        {editingPreviewUrl && editingPreviewUrl !== product.photo && <PreviewImage src={editingPreviewUrl} alt="Preview" />}
                                    </ContainerInputs>
                                    <Actions>
                                        <Button onClick={handleEditProduct} disabled={isItemLoading}>
                                            {isButtonLoading(product.id, "save") ? <SpinnerButton /> : "Salvar"}
                                        </Button>
                                        <Button onClick={cancelEditing} disabled={isItemLoading}>Cancelar</Button>
                                    </Actions>
                                </>
                            ) : (
                                <>
                                    <p><strong>{product.name}</strong></p>
                                    <p style={{fontStyle: 'italic', color: '#555', fontSize: '0.9em', marginBottom: '10px'}}>
                                        Artesão: {product.craftsman?.name || 'Não identificado'}
                                    </p>
                                    <p style={{whiteSpace: "pre-wrap", wordBreak: "break-word"}}>{product.description}</p>
                                    <p>Preço: R$ {Number(product.price).toFixed(2)} | Quantidade: {product.quantity}</p>
                                    <p>Tipo: {product.type}</p>
                                    <Actions>
                                        <Button onClick={() => startEditing(product)} disabled={isItemLoading}>Editar</Button>
                                    </Actions>
                                </>
                            )}
                        </ProductItem>
                    );
                })}
            </ProductList>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default GestaoEmpresa;