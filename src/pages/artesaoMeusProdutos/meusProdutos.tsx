import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { jwtDecode } from "jwt-decode";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  ProductList,
  ProductItem,
  ProductImage,
  Input,
  Button,
  Form,
  Actions,
  Select,
  Spinner,
  IconVoltar,
  TextMeusProdutos,
  ConteinerMeusProdutosText,
  Titles,
  ContainerCriarProdutos,
  ContainerInputs,
  TextInput,
  InputProdutos,
  SpinnerButton,
  ButtonCriarProduto,
  FileInputLabel,
  StyledFileInput,
  PreviewImage,
  ContainerImageContent,
} from "./meusProdutosStyle";
import Voltar from "../../assets/menorQue.png";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  type: string;
  photo: string;
  craftsman_id: string;
}

interface JwtPayload {
  sub: string;
  role: string;
}

const MeusProdutos = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [creating, setCreating] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);
  const [craftsmanId, setCraftsmanId] = useState<string | null>(null);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});
  const [buttonLoadingMap, setButtonLoadingMap] = useState<Record<string, string | null>>({});
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    type: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [editingPreviewUrl, setEditingPreviewUrl] = useState<string | null>(null);

  const setLoadingFor = (id: string, isLoading: boolean) => {
    setLoadingIds((prev) =>
      isLoading ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const isLoading = (id: string) => loadingIds.includes(id);

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
          const res = await api.get(`/craftsmen/email/${email}`,{
            headers: { Authorization: `Bearer ${token}` },
          });
          setCraftsmanId(res.data.id);
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
 
  const fetchProducts = async () => {
    if (!craftsmanId) return;
    setIsFetchingProducts(true);
    try {
      const response = await api.get(`/products/craftsmen/${craftsmanId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.items || []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      toast.error("Erro ao carregar produtos.");
    } finally {
      setIsFetchingProducts(false);
    }
  };

  useEffect(() => {
    if (craftsmanId) {
      fetchProducts();
    }
  }, [craftsmanId]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };
  
  const handleEditingFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditingFile(file);
      setEditingPreviewUrl(URL.createObjectURL(file));
    } else {
      setEditingFile(null);
      setEditingPreviewUrl(null);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, price, quantity, type } = newProduct;

    if (!name || !description || !price || !quantity || !type) {
      toast.error("Preencha todos os campos de texto obrigatórios.");
      return;
    }

    if (!craftsmanId) {
      toast.error("ID do artesão não encontrado. Não é possível criar o produto.");
      return;
    }

    setCreating(true);
    let newProductId: string | null = null;

    try {
      const productDataPayload = {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        type,
        craftsman_id: craftsmanId,
      };

      console.log("Enviando dados do produto:", productDataPayload);
      const productResponse = await api.post("/products", productDataPayload, {
         headers: { Authorization: `Bearer ${token}` },
      });

      newProductId = productResponse.data.productId;
      console.log("Produto criado com ID:", newProductId, productResponse.data);

      if (!newProductId) {
        toast.error("Produto criado, mas ID não retornado. Não é possível enviar a imagem.");
        throw new Error("ID do produto não retornado após criação.");
      }
      toast.info("Dados do produto salvos. Enviando imagem, se selecionada...");

      if (selectedFile) {
        console.log(selectedFile.type)
        const imageFormData = new FormData();
        imageFormData.append("file", selectedFile);
        imageFormData.append("id", newProductId); 

        console.log("Enviando imagem para o produto ID:", newProductId);
        console.log("Dados carregados para enviar", imageFormData);
        await api.patch("/images", imageFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': undefined, 
          },
        });
        toast.success("Imagem enviada com sucesso!");
      } else {
        toast.info("Nenhuma imagem selecionada para este produto.");
      }

      toast.success("Produto configurado com sucesso!");
      fetchProducts();
      setNewProduct({ name: "", description: "", price: "", quantity: "", type: "" });
      setSelectedFile(null);
      setPreviewUrl(null);

    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 
                       (newProductId ? "Erro ao enviar a imagem do produto." : "Erro ao criar os dados do produto.");
      toast.error(errorMsg);
    } finally {
      setCreating(false);
    }
  }; 

  const handleDeleteProduct = async (productId: string) => {
    setLoadingFor(productId, true);
    setButtonLoading(productId, "delete");
    try {
      await api.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchProducts();
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      toast.error("Erro ao excluir produto.");
    } finally {
      setLoadingFor(productId, false);
      setButtonLoading(productId, null);
    }
  };  

  const startEditing = (product: Product) => {
    setEditProductId(product.id);
    setEditedProduct({ 
        ...product, 
        price: Number(product.price), 
        quantity: Number(product.quantity) 
    });
    setEditingPreviewUrl(product.photo || null); 
    setEditingFile(null);
  };

  const cancelEditing = () => {
    setEditProductId(null);
    setEditedProduct({});
    setEditingFile(null);
    setEditingPreviewUrl(null);
  };

  const handleEditProduct = async () => {
    if (!craftsmanId || 
        !editProductId || 
        !editedProduct.name || 
        !editedProduct.description || 
        typeof editedProduct.price === 'undefined' || 
        typeof editedProduct.quantity === 'undefined' || 
        !editedProduct.type 
      ) {
        toast.error("Dados incompletos para edição. Verifique nome, descrição, preço, quantidade e tipo.");
        return;
    }
  
    setLoadingFor(editProductId, true);
    setButtonLoading(editProductId, "save");
  
    let productUpdateError = false;

    try {
      const productDataToUpdate = {
        name: editedProduct.name,
        description: editedProduct.description,
        price: Number(editedProduct.price),
        quantity: Number(editedProduct.quantity), 
        type: editedProduct.type,            
      };
      console.log("Atualizando dados do produto ID:", editProductId, productDataToUpdate);
      await api.put(`/products/${editProductId}/craftsmen/${craftsmanId}`, productDataToUpdate, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info("Dados do produto atualizados.");

      if (editingFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", editingFile);
        imageFormData.append("id", editProductId);

        console.log("Enviando nova imagem para o produto ID:", editProductId);
        await api.patch("/images", imageFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': undefined, 
          },
        });
        toast.success("Nova imagem enviada com sucesso!");
      }
      
      toast.success("Produto atualizado completamente!");

    } catch (error: any) {
      productUpdateError = true;
      console.error("Erro ao editar produto:", error);
      const errorMsg = error.response?.data?.message || "Erro durante a atualização do produto.";
      toast.error(errorMsg);
    } finally {
      setLoadingFor(editProductId, false);
      setButtonLoading(editProductId, null);
      if (!productUpdateError) {
        fetchProducts();
        cancelEditing();
      }
    }
  };  

  const updateQuantity = async (id: string, delta: number) => {
    if (!craftsmanId) return;
    const productToUpdate = products.find(p => p.id === id);
    if (!productToUpdate) return;
    if (productToUpdate.quantity + delta < 0) {
        toast.warn("A quantidade não pode ser negativa.");
        return;
    }

    setLoadingFor(id, true);
    setButtonLoading(id, delta > 0 ? "increase" : "decrease");
    try {
      const action = delta > 0 ? "add" : "remove";
      await api.patch(`/products/${id}/craftsmen/${craftsmanId}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchProducts();
      toast.success(`Quantidade atualizada: ${delta > 0 ? "+" : ""}${delta}`);
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
      toast.error("Erro ao atualizar quantidade.");
    } finally {
      setLoadingFor(id, false);
      setButtonLoading(id, null);
    }
  };   

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: (name === "price" || name === "quantity") 
                ? (value === "" ? "" : parseFloat(value)) 
                : value,
    }));
  };

  return (
    <>
      <Header />
      <Container>
        <ConteinerMeusProdutosText onClick={() => navigate("/")}>
          <IconVoltar alt="Voltar" src={Voltar} />
          <TextMeusProdutos>Meus Produtos</TextMeusProdutos>
        </ConteinerMeusProdutosText>

        <Titles>Adicionar novo produto</Titles>
        <Form onSubmit={handleCreateProduct}>
          <ContainerCriarProdutos>
            <ContainerInputs>
              <TextInput>Nome</TextInput>
              <Input name="name" placeholder="Nome do produto" value={newProduct.name} onChange={handleInputChange} required />
            </ContainerInputs>
            <ContainerInputs>
              <TextInput>Descrição</TextInput>
              <Input name="description" placeholder="Descrição detalhada" value={newProduct.description} onChange={handleInputChange} required />
            </ContainerInputs>
            <ContainerInputs>
              <TextInput>Preço (R$)</TextInput>
              <Input name="price" placeholder="Ex: 25.99" type="number" step="0.01" min="0.01" value={newProduct.price} onChange={handleInputChange} required />
            </ContainerInputs>
            <ContainerInputs>
              <TextInput>Quantidade</TextInput>
              <Input name="quantity" placeholder="Estoque inicial" type="number" min="0" step="1" value={newProduct.quantity} onChange={handleInputChange} required />
            </ContainerInputs>
            <ContainerInputs>
              <TextInput>Tipo</TextInput>
              <Select name="type" value={newProduct.type} onChange={handleInputChange} required>
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
            </ContainerInputs>
            <ContainerInputs>
              <TextInput>Foto do Produto</TextInput>
              <StyledFileInput type="file" id="fileInputCreate" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
              {previewUrl ? 
              <ContainerImageContent>
                {previewUrl && <PreviewImage src={previewUrl} alt="Preview do produto" />}
                <FileInputLabel htmlFor="fileInputCreate">
                  {selectedFile ? selectedFile.name : "Escolher arquivo"}
                </FileInputLabel>
              </ContainerImageContent> 
              :
                <FileInputLabel htmlFor="fileInputCreate">
                  {selectedFile ? selectedFile.name : "Escolher arquivo"}
                </FileInputLabel>
              }
            </ContainerInputs>
          </ContainerCriarProdutos>
          <ButtonCriarProduto type="submit" disabled={creating}>
            {creating ? <SpinnerButton /> : "Criar produto"}
          </ButtonCriarProduto>
        </Form>

        <Titles>Produtos cadastrados</Titles>
        {isFetchingProducts ? (
          <Spinner><div className="loader" /></Spinner>
        ) : products.length === 0 ? (
            <p style={{textAlign: 'center', margin: '20px'}}>Você ainda não cadastrou nenhum produto.</p>
        ) : (
          <ProductList>
            {products.map((product) => {
              const isItemLoading = isLoading(product.id);
              return (
                <ProductItem key={product.id}>
                  {product.photo && <ProductImage src={product.photo} alt={product.name} onError={(e) => (e.currentTarget.style.display = 'none')} />}
                  
                  {editProductId === product.id ? (
                    <>
                      <TextInput>Nome</TextInput>
                      <InputProdutos name="name" value={editedProduct.name || ""} onChange={handleEditChange} disabled={isItemLoading} />
                      <TextInput>Descrição</TextInput>
                      <InputProdutos name="description" value={editedProduct.description || ""} onChange={handleEditChange} disabled={isItemLoading} />
                      <TextInput>Preço</TextInput>
                      <InputProdutos name="price" type="number" step="0.01" min="0.01" value={editedProduct.price?.toString() || ""} onChange={handleEditChange} disabled={isItemLoading} />
                      <TextInput>Quantidade</TextInput>
                      <InputProdutos name="quantity" type="number" min="0" step="1" value={editedProduct.quantity?.toString() || ""} onChange={handleEditChange} disabled={isItemLoading} />
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
                      
                      <ContainerInputs style={{marginTop: '10px'}}>
                        <TextInput>Nova Foto (opcional)</TextInput>
                        <StyledFileInput type="file" id={`editFileInput-${product.id}`} onChange={handleEditingFileChange} accept="image/png, image/jpeg, image/webp" />
                        <FileInputLabel htmlFor={`editFileInput-${product.id}`}>
                            {editingFile ? editingFile.name : "Escolher nova foto"}
                        </FileInputLabel>
                        {editingPreviewUrl && editingPreviewUrl !== product.photo && <PreviewImage src={editingPreviewUrl} alt="Preview da nova foto" />}
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
                      <p style={{whiteSpace: "pre-wrap", wordBreak: "break-word"}}>{product.description}</p>
                      <p>Preço: R$ {Number(product.price).toFixed(2)} | Quantidade: {product.quantity}</p>
                      <p>Tipo: {product.type}</p>
                      <Actions>
                        <Button onClick={() => startEditing(product)} disabled={isItemLoading}>Editar</Button>
                        <Button onClick={() => handleDeleteProduct(product.id)} disabled={isItemLoading}>
                          {isButtonLoading(product.id, "delete") ? <SpinnerButton /> : "Excluir"}
                        </Button>
                        <Button onClick={() => updateQuantity(product.id, 1)} disabled={isItemLoading}>
                          {isButtonLoading(product.id, "increase") ? <SpinnerButton /> : "+1 Unidade"}
                        </Button>
                        <Button onClick={() => updateQuantity(product.id, -1)} disabled={isItemLoading || product.quantity <= 0}>
                          {isButtonLoading(product.id, "decrease") ? <SpinnerButton /> : "-1 Unidade"}
                        </Button>
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

export default MeusProdutos;