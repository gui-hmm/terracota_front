import React, { useEffect, useState } from "react";
import { To, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Imports de Componentes
import Header from '../../components/header/header';
import Footer from "../../components/footer/footer";
import Clientes from "../../components/clientes/cliente";
import ProdutoList from "../../components/produtosComponent/produtoList";
import ProdutoDetalhesModal from "../../components/produtosComponent/ProdutoDetalhesModal";

// Imports de Estilos
import {
  StatusNotification,
  ProcessingText,
  AvancarDestaques,
  BarrosExplore,
  ButtonExplore,
  CategoriaNaoSelecionada,
  CategoriaSelecionada,
  ContainerCategorias,
  ContainerImageAltaQualidade,
  ContainerMaisVendido,
  ContainerProdutosDestaque,
  ContainerProdutosGeral,
  ContainerProdutosGeral1,
  ContainerText,
  ContainerText1,
  ContainerTextMaisVendido,
  ExploreContainer,
  ExploreContainerColuns,
  ImageAltaQualidade,
  ImageProdutoDestaque,
  LinhaDois,
  LinhaUm,
  ProdutoNameDestaque,
  ProdutosText,
  ProdutosText1,
  ProdutoValorDestaque,
  Text1,
  Text2,
  Text3,
  Text4,
  Text5,
  TextDois,
  TextExploreContainer,
  TextUm,
  VoltarDestaques,
} from "./homeStyle";

// Imports de Assets
import P1 from "../../assets/p1.png";
import P7 from "../../assets/p7.png";
import P10 from "../../assets/p10.png";
import AltaQualidade from "../../assets/alta_qualidade.png";
import BarrosImage from '../../assets/explore_barros.png';
import VoltarAsset from "../../assets/menorQue.png";
import AvancarAsset from "../../assets/maior_que.png";

// API
import { api } from "../../api/api";


// --- TIPAGENS PADRONIZADAS ---
interface JwtPayload {
  sub: string;
  role: "CUSTOMER" | "CRAFTSMAN" | "COMPANY";
}

export interface Produto {
  id: number;
  nome: string;
  valor: number;
  imagem: string;
}

export interface ProdutoCarrinhoLocalStorage {
  produto: Produto;
  quantidade: number;
}
// --- FIM DAS TIPAGENS ---

// Função auxiliar para obter informações do token
const getUserInfoFromToken = (): { email: string; role: JwtPayload['role'] } | null => {
  const token = sessionStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return { email: decoded.sub, role: decoded.role };
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  }
  return null;
};


function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estados para a funcionalidade de produtos
  const [produtosApi, setProdutosApi] = useState<Produto[]>([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  // Estados para a funcionalidade de confirmação de pagamento
  const [isProcessingSale, setIsProcessingSale] = useState(false);
  const [saleStatusMessage, setSaleStatusMessage] = useState<string | null>(null);
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  const handleNavigate = (path: To) => {
    navigate(path);
  };

  useEffect(() => {
    // Exibe toasts que chegam via state do Navigate (ex: de RoleProtectedRoute)
    if (location.state?.toastMessage) {
        const message = location.state.toastMessage;
        const type = location.state.type || 'info'; // 'info' como padrão

        if (type === 'error') {
            toast.error(message);
        } else {
            toast.info(message);
        }
        
        // Limpa o state para não mostrar o toast novamente se o usuário navegar internamente
        window.history.replaceState({}, document.title)
    }
  }, [location.state]);

  // --- LÓGICA DE PRODUTOS E CARRINHO ---

  useEffect(() => {
    const buscarProdutosParaHome = async () => {
      setLoadingProdutos(true);
      try {
        const response = await api.get("/products?perPage=12");
        const produtosFormatados: Produto[] = response.data.items.map((item: any) => ({
          id: item.id,
          nome: item.name,
          valor: item.price,
          imagem: item.photo || "https://img.freepik.com/vetores-premium/jarro-de-ceramica-marrom-vaso-de-barro-vaso-de-artesanato_81894-7502.jpg",
        }));
        setProdutosApi(produtosFormatados);
      } catch (error) {
        console.error("Erro ao buscar produtos para a home:", error);
        toast.error("Não foi possível carregar os produtos.");
      } finally {
        setLoadingProdutos(false);
      }
    };

    buscarProdutosParaHome();
  }, []);

  const handleProdutoSelect = (produto: Produto) => {
    setProdutoSelecionado(produto);
  };

  const handleAdicionarAoCarrinho = (produto: Produto, quantidade: number) => {
    const carrinhoStorage = localStorage.getItem("carrinho");
    let carrinhoAtual: ProdutoCarrinhoLocalStorage[] = [];

    if (carrinhoStorage) {
      try {
        const carrinhoParse = JSON.parse(carrinhoStorage);
        if (Array.isArray(carrinhoParse)) {
          carrinhoAtual = carrinhoParse.filter(
            item => item.produto && typeof item.produto.id !== 'undefined' && typeof item.quantidade === 'number'
          );
        }
      } catch (error) {
        console.error("Erro ao parsear carrinho do localStorage:", error);
        carrinhoAtual = [];
      }
    }

    const produtoExistenteIndex = carrinhoAtual.findIndex(p => p.produto.id === produto.id);
    let novoCarrinho: ProdutoCarrinhoLocalStorage[];

    if (produtoExistenteIndex > -1) {
      novoCarrinho = carrinhoAtual.map((p, index) =>
        index === produtoExistenteIndex
          ? { ...p, quantidade: p.quantidade + quantidade }
          : p
      );
    } else {
      novoCarrinho = [...carrinhoAtual, { produto, quantidade }];
    }

    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    toast.success(`${produto.nome} adicionado ao carrinho!`);
    setProdutoSelecionado(null);
  };

  // --- LÓGICA DE CONFIRMAÇÃO DE PAGAMENTO ---

  const setNotification = (message: string | null, type: 'success' | 'error' | 'info' | 'warning') => {
    setSaleStatusMessage(message);
    setNotificationType(type);
  };

  // REMOVIDO: useEffects que gerenciavam carrinhoHomeState. Eles não são mais necessários.

  useEffect(() => {
    const processPaymentConfirmation = async () => {
      const params = new URLSearchParams(location.search);
      const paymentIdParam = params.get('payment_id');
      if (!paymentIdParam) return; // Sai mais cedo se não há payment_id

      console.log("Verificando parâmetros de URL para confirmação de pagamento...");
      const statusParam = params.get('status');
      const preferenceIdParam = params.get('preference_id');
      const paymentTypeParam = params.get('payment_type');
      console.log("Parâmetros recebidos:", { paymentIdParam, statusParam, preferenceIdParam, paymentTypeParam });

      const processedPaymentKey = `processed_sale_${paymentIdParam}`;
      if (localStorage.getItem(processedPaymentKey)) {
        console.log(`Venda com payment_id ${paymentIdParam} já processada anteriormente.`);
        const successMessage = localStorage.getItem(`success_message_${paymentIdParam}`);
        if (successMessage) setNotification(successMessage, 'success');
        if (location.search) navigate('/', { replace: true });
        return;
      }

      setNotification(null, 'info');

      if (statusParam === 'approved' && preferenceIdParam) {
        setIsProcessingSale(true);
        setNotification('Processando confirmação da sua compra...', 'info');
        console.log(`Iniciando processamento para payment_id: ${paymentIdParam}`);

        const userInfo = getUserInfoFromToken();
        if (!userInfo) {
          const errorMsg = 'Erro: Não foi possível identificar o usuário. Faça login e tente novamente ou contate o suporte.';
          console.error(errorMsg);
          setNotification(errorMsg, 'error');
          setIsProcessingSale(false);
          return;
        }

        const { email: userEmail, role: userRole } = userInfo;
        const roleToEndpoint: Record<string, string> = { CUSTOMER: "customers", CRAFTSMAN: "craftsmen", COMPANY: "companies" };
        const endpointRole = roleToEndpoint[userRole.toUpperCase()] || "customers";
        
        if (userRole.toUpperCase() !== "CUSTOMER") {
          const errorMsg = `Erro: Tipo de usuário '${userRole}' não autorizado para realizar compras.`;
          console.error(errorMsg);
          setNotification(errorMsg, 'error');
          setIsProcessingSale(false);
          return;
        }

        let customerId: string | null = null;
        const token = sessionStorage.getItem("token");

        try {
          const customerResponse = await api.get(`/${endpointRole}/email/${userEmail}`, { headers: { Authorization: `Bearer ${token}` } });
          customerId = customerResponse.data.id;
        } catch (error: any) {
          const errorMsg = `Erro ao buscar dados do cliente: ${error.response?.data?.message || error.message}.`;
          console.error("Detalhes do erro ao buscar cliente:", error);
          setNotification(errorMsg, 'error');
          setIsProcessingSale(false);
          return;
        }
        
        if (!customerId) {
          setNotification('Erro: ID do cliente não encontrado.', 'error');
          setIsProcessingSale(false);
          return;
        }

        const carrinhoStorage = localStorage.getItem('carrinho');
        if (!carrinhoStorage) {
          setNotification('Erro: Carrinho não encontrado para finalizar a venda.', 'error');
          setIsProcessingSale(false);
          return;
        }

        let cartItems: ProdutoCarrinhoLocalStorage[] = [];
        try {
          cartItems = JSON.parse(carrinhoStorage);
        } catch (error) {
          setNotification('Erro ao processar dados do carrinho.', 'error');
          setIsProcessingSale(false);
          return;
        }

        const products_ids = cartItems.map(item => item.produto.id.toString());
        const total = cartItems.reduce((acc, item) => acc + (item.produto.valor * item.quantidade), 0);
        const testCraftsmanId = "21338bba177949b4b52048158a533ec5"; // ID de teste

        const saleData = {
          preference_id: preferenceIdParam,
          payment_id: parseInt(paymentIdParam, 10),
          craftsman_id: testCraftsmanId,
          customer_id: customerId,
          products_ids: products_ids,
          total: parseFloat(total.toFixed(2)),
          payment_method: paymentTypeParam || 'unknown',
          status: statusParam,
        };

        try {
          const saleResponse = await api.post('/sales', saleData);
          const successMsg = `Compra ${saleResponse.data.orderId || paymentIdParam} registrada com sucesso! Obrigado!`;
          setNotification(successMsg, 'success');
          localStorage.setItem(`success_message_${paymentIdParam}`, successMsg);
          localStorage.setItem(processedPaymentKey, 'true');
          localStorage.removeItem('carrinho');
          setTimeout(() => { if (location.search.includes(paymentIdParam)) navigate('/', { replace: true }); }, 5000);
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          setNotification(`Erro ao registrar sua compra: ${errorMessage}.`, 'error');
        } finally {
          setIsProcessingSale(false);
        }
      } else if (statusParam && statusParam !== 'approved') {
        const msg = `Status do pagamento: ${statusParam}.`;
        setNotification(msg, 'warning');
      }
    };

    if (location.search) {
      processPaymentConfirmation();
    }
  }, [location.search, navigate]);

  return (
    <>
      <Header />
      {saleStatusMessage && (
        <StatusNotification type={notificationType}>
          {isProcessingSale && <ProcessingText>Processando...</ProcessingText>}
          {saleStatusMessage}
        </StatusNotification>
      )}

      <ExploreContainer>
        <ExploreContainerColuns>
          <TextExploreContainer>
            <TextUm>Explore Nossa Coleção Artesanal De Produtos De Barro!</TextUm>
            <TextDois>Descubra Agora Nossas Ofertas Exclusivas e Produtos Feitos à Mão com Todo Cuidado!</TextDois>
            <ButtonExplore onClick={() => handleNavigate('/produtos')}>Nossos Produtos</ButtonExplore>
          </TextExploreContainer>
          <BarrosExplore alt="Produtos de barro" src={BarrosImage} />
        </ExploreContainerColuns>
      </ExploreContainer>
      <LinhaUm />
      <LinhaDois />

      <ContainerMaisVendido>
        <ContainerTextMaisVendido>
          <ContainerText1><Text1>-</Text1><Text2>Coleções</Text2></ContainerText1>
          <Text3>Mais Vendidos</Text3>
          <Text4>A produção diária na nossa fábrica. novas práticas de gestão de qualidade.</Text4>
          <Text5 onClick={() => handleNavigate('/produtos')}>Explore</Text5>
        </ContainerTextMaisVendido>
        <VoltarDestaques alt="Voltar Destaques" src={VoltarAsset} />
        <ContainerProdutosDestaque onClick={() => handleNavigate('/produtos')}><ImageProdutoDestaque alt="Vasos de cerâmica" src={P1} /><ProdutoNameDestaque>Vasos de cerâmica</ProdutoNameDestaque><ProdutoValorDestaque>R$ 160,00</ProdutoValorDestaque></ContainerProdutosDestaque>
        <ContainerProdutosDestaque onClick={() => handleNavigate('/produtos')}><ImageProdutoDestaque alt="Jarra de cerâmica" src={P10} /><ProdutoNameDestaque>Jarra de cerâmica</ProdutoNameDestaque><ProdutoValorDestaque>R$ 150,00</ProdutoValorDestaque></ContainerProdutosDestaque>
        <ContainerProdutosDestaque onClick={() => handleNavigate('/produtos')}><ImageProdutoDestaque alt="Leão de barro" src={P7} /><ProdutoNameDestaque>Leão de barro</ProdutoNameDestaque><ProdutoValorDestaque>R$ 300,00</ProdutoValorDestaque></ContainerProdutosDestaque>
        <AvancarDestaques alt="Avançar Destaques" src={AvancarAsset} />
      </ContainerMaisVendido>

      <ContainerImageAltaQualidade onClick={() => handleNavigate('/produtos')}>
        <ImageAltaQualidade alt="Produtos de alta qualidade" src={AltaQualidade} />
      </ContainerImageAltaQualidade>

      <ContainerText>
        <ProdutosText1>-</ProdutosText1>
        <ProdutosText>NOSSOS PRODUTOS</ProdutosText>
        <ProdutosText1>-</ProdutosText1>
      </ContainerText>
      <ContainerCategorias>
        <CategoriaSelecionada>Mais vendidos</CategoriaSelecionada>
        <CategoriaNaoSelecionada>Decoração</CategoriaNaoSelecionada>
        <CategoriaNaoSelecionada>Cozinha</CategoriaNaoSelecionada>
      </ContainerCategorias>

      <ContainerProdutosGeral1>
        <ContainerProdutosGeral>
          {loadingProdutos ? (
            <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>
              <span>Carregando produtos...</span>
            </div>
          ) : produtosApi.length > 0 ? (
            <ProdutoList produtos={produtosApi} onSelectProduto={handleProdutoSelect} />
          ) : (
            <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>
              <span>Nenhum produto encontrado.</span>
            </div>
          )}
        </ContainerProdutosGeral>
      </ContainerProdutosGeral1>

      {produtoSelecionado && (
        <ProdutoDetalhesModal
          produto={produtoSelecionado}
          onAdicionarAoCarrinho={handleAdicionarAoCarrinho}
          onFecharModal={() => setProdutoSelecionado(null)}
        />
      )}

      <Clientes />
      <Footer />
    </>
  );
}

export default Home;