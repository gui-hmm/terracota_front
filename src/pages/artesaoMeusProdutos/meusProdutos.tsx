import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { jwtDecode } from "jwt-decode";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector } from "../../store/hooks";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  ProductList,
  ProductItem,
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
} from "./meusProdutosStyle";
import Voltar from "../../assets/menorQue.png";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  type: string;
  craftsman_id: string;
}

interface JwtPayload {
  sub: string;
  role: string;
}

const MeusProdutos = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { loading } = useAppSelector((state) => state.auth);

  const [craftsmanId, setCraftsmanId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    type: "",
  });

  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const setLoadingFor = (id: string, isLoading: boolean) => {
    setLoadingIds((prev) =>
      isLoading ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const isLoading = (id: string) => loadingIds.includes(id);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const email = decoded.sub;

      const fetchCraftsman = async () => {
        try {
          const res = await api.get(`/craftsmen/email/${email}`);
          setCraftsmanId(res.data.id);
        } catch (error) {
          console.error("Erro ao buscar artesão:", error);
        }
      };

      fetchCraftsman();
    }
  }, [token]);

  useEffect(() => {
    if (craftsmanId) {
      fetchProducts();
    }
  }, [craftsmanId]);

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/products/craftsmen/${craftsmanId}`);
      setProducts(response.data.items);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, description, price, quantity, type } = newProduct;

    if (!name || !description || !price || !quantity || !type) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!craftsmanId) {
      toast.error("ID do artesão não encontrado.");
      return;
    }

    const payload = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      type,
      craftsman_id: craftsmanId,
    };

    try {
      await api.post("/products", payload);
      fetchProducts();
      setNewProduct({ name: "", description: "", price: "", quantity: "", type: "" });
      toast.success("Produto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Erro ao criar produto.");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setLoadingFor(productId, true);
    try {
      await api.delete(`/products/${productId}`);
      await fetchProducts();
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      toast.error("Erro ao excluir produto.");
    } finally {
      setLoadingFor(productId, false);
    }
  };

  const startEditing = (product: Product) => {
    setEditProductId(product.id);
    setEditedProduct({ ...product });
  };

  const cancelEditing = () => {
    setEditProductId(null);
    setEditedProduct({});
  };

  const handleEditProduct = async () => {
    if (!craftsmanId || !editProductId) return;

    setLoadingFor(editProductId, true);
    try {
      await api.put(`/products/${editProductId}/craftsmen/${craftsmanId}`, {
        name: editedProduct.name || "",
        description: editedProduct.description || "",
        price: Number(editedProduct.price),
      });
      await fetchProducts();
      cancelEditing();
      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar produto:", error);
      toast.error("Erro ao editar produto.");
    } finally {
      setLoadingFor(editProductId, false);
    }
  };

  const updateQuantity = async (id: string, delta: number) => {
    if (!craftsmanId) return;

    setLoadingFor(id, true);
    try {
      const action = delta > 0 ? "add" : "remove";
      await api.patch(`/products/${id}/craftsmen/${craftsmanId}/${action}`);
      await fetchProducts();
      toast.success(`Quantidade atualizada: ${delta > 0 ? "+1" : "-1"}`);
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
      toast.error("Erro ao atualizar quantidade.");
    } finally {
      setLoadingFor(id, false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
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
              <Input
                name="name"
                placeholder="Nome"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </ContainerInputs>

            <ContainerInputs>
              <TextInput>Descrição</TextInput>
              <Input
                name="description"
                placeholder="Descrição"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </ContainerInputs>

            <ContainerInputs>
              <TextInput>Preço</TextInput>
              <Input
                name="price"
                placeholder="Preço"
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </ContainerInputs>

            <ContainerInputs>
              <TextInput>Quantidade</TextInput>
              <Input
                name="quantity"
                placeholder="Quantidade"
                type="number"
                value={newProduct.quantity}
                onChange={handleInputChange}
              />
            </ContainerInputs>

            <ContainerInputs>
              <TextInput>Tipo</TextInput>
              <Select name="type" value={newProduct.type} onChange={handleInputChange}>
                <option value="">Selecione o tipo de produto</option>
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
          </ContainerCriarProdutos>

          <ButtonCriarProduto type="submit" disabled={loading} onClick={handleCreateProduct}>
            {loading ? <SpinnerButton /> : "Criar produto"}
          </ButtonCriarProduto>
        </Form>

        <Titles>Produtos cadastrados</Titles>
        <ProductList>
          {products.map((product) => {
            const isItemLoading = isLoading(product.id);

            return (
              <ProductItem key={product.id}>
                {editProductId === product.id ? (
                  <>
                    <InputProdutos
                      name="name"
                      value={editedProduct.name || ""}
                      onChange={handleEditChange}
                      disabled={isItemLoading}
                    />
                    <InputProdutos
                      name="description"
                      value={editedProduct.description || ""}
                      onChange={handleEditChange}
                      disabled={isItemLoading}
                    />
                    <InputProdutos
                      name="price"
                      type="number"
                      value={editedProduct.price?.toString() || ""}
                      onChange={handleEditChange}
                      disabled={isItemLoading}
                    />
                    <Actions>
                      <Button onClick={handleEditProduct} disabled={isItemLoading}>
                        {isItemLoading ? <Spinner><div className="loader" /></Spinner> : "Salvar"}
                      </Button>
                      <Button onClick={cancelEditing} disabled={isItemLoading}>Cancelar</Button>
                    </Actions>
                  </>
                ) : (
                  <>
                    <p><strong>{product.name}</strong><br />{product.description}</p>
                    <p>Preço: R$ {product.price.toFixed(2)} | Quantidade: {product.quantity}</p>
                    <Actions>
                      <Button onClick={() => startEditing(product)}>Editar</Button>
                      <Button onClick={() => handleDeleteProduct(product.id)} disabled={isItemLoading}>
                        {isItemLoading ? <Spinner /> : "Excluir"}
                      </Button>
                      <Button onClick={() => updateQuantity(product.id, 1)} disabled={isItemLoading}>+1 Unidade</Button>
                      <Button onClick={() => updateQuantity(product.id, -1)} disabled={isItemLoading}>-1 Unidade</Button>
                    </Actions>
                  </>
                )}
              </ProductItem>
            );
          })}
        </ProductList>
      </Container>
      <Footer />
    </>
  );
};

export default MeusProdutos;
