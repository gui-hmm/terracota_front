import React, { useEffect, useState } from "react";
import {
  // ... seus outros imports de homeStyle
  StatusNotification, // Importar o novo styled component
  ProcessingText,     // Importar o novo styled component
  AvancarDestaques,
  BarrosExplore,
  ButtonExplore,
  CategoriaNaoSelecionada,
  CategoriaSelecionada,
  ContainerCategorias,
  ContainerImageAltaQualidade,
  ContainerMaisVendido,
  ContainerProdutosDestaque,
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
import P1 from "../../assets/p1.png";
// ... outros imports de imagem P2 a P12
import P2 from "../../assets/p2.png";
import P3 from "../../assets/p3.png";
import P4 from "../../assets/p4.png";
import P5 from "../../assets/p5.png";
import P6 from "../../assets/p6.png";
import P7 from "../../assets/p7.png";
import P8 from "../../assets/p8.png";
import P9 from "../../assets/p9.png";
import P10 from "../../assets/p10.png";
import P11 from "../../assets/p11.png";
import P12 from "../../assets/p12.png";
import AltaQualidade from "../../assets/alta_qualidade.png";
import BarrosImage from '../../assets/explore_barros.png';
import VoltarAsset from "../../assets/menorQue.png";
import AvancarAsset from "../../assets/maior_que.png";
import Header from '../../components/header/header';
import Footer from "../../components/footer/footer";
import Clientes from "../../components/clientes/cliente";
import { To, useNavigate, useLocation } from "react-router-dom";
import { ContainerProdutosGeral } from "../produtos/produtosStyle";
import ProdutoList from "../../components/produtosComponent/produtoList";
import ProdutoDetalhesModal from "../../components/produtosComponent/ProdutoDetalhesModal";
import { api } from "../../api/api";
import { jwtDecode } from "jwt-decode";

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

export interface ProdutoCarrinho {
  produto: Produto;
  quantidade: number;
}

const produtosMockadosHome: Produto[] = [
  { id: 1, nome: "Vasos de cerâmica", valor: 160.00, imagem: P1 },
  { id: 2, nome: "Panela de barro", valor: 145.00, imagem: P2 },
  { id: 3, nome: "Estatueta de terracota", valor: 350.00, imagem: P3 },
  { id: 4, nome: "Caldeirão de barro", valor: 160.00, imagem: P4 },
  { id: 5, nome: "Potes de barro", valor: 145.00, imagem: P5 },
  { id: 6, nome: "Tigelas de cerâmica", valor: 145.00, imagem: P6 },
  { id: 7, nome: "Leão de barro", valor: 300.00, imagem: P7 },
  { id: 8, nome: "Cervos de cerâmica", valor: 500.00, imagem: P8 },
  { id: 9, nome: "São Francisco", valor: 250.00, imagem: P9 },
  { id: 10, nome: "Jarra de cerâmica", valor: 150.00, imagem: P10 },
  { id: 11, nome: "Cisnes de cerâmica", valor: 200.00, imagem: P11 },
  { id: 12, nome: "Coelho de barro", valor: 130.00, imagem: P12 }
];

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

  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [carrinhoHomeState, setCarrinhoHomeState] = useState<ProdutoCarrinho[]>([]);
  
  const [isProcessingSale, setIsProcessingSale] = useState(false);
  const [saleStatusMessage, setSaleStatusMessage] = useState<string | null>(null);
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'info' | 'warning'>('info');


  const handleNavigate = (path: To) => {
    navigate(path);
  };

  // Função para definir o status e tipo da notificação
  const setNotification = (message: string | null, type: 'success' | 'error' | 'info' | 'warning') => {
    setSaleStatusMessage(message);
    setNotificationType(type);
  };

  useEffect(() => {
    const carrinhoStorage = localStorage.getItem("carrinho");
    if (carrinhoStorage) {
      try {
        const carrinhoParse = JSON.parse(carrinhoStorage) as ProdutoCarrinho[];
        if (Array.isArray(carrinhoParse) && carrinhoParse.every(item => item.produto && typeof item.produto.id !== 'undefined')) {
          setCarrinhoHomeState(carrinhoParse);
        } else {
          setCarrinhoHomeState([]);
        }
      } catch(e) {
        setCarrinhoHomeState([]);
      }
    } else {
      setCarrinhoHomeState([]);
    }
  }, []);

  useEffect(() => {
    const carrinhoStorage = localStorage.getItem("carrinho");
    const carrinhoStorageParsed = carrinhoStorage ? JSON.parse(carrinhoStorage) : [];

    if (carrinhoHomeState.length > 0) {
        localStorage.setItem("carrinho", JSON.stringify(carrinhoHomeState));
    } else if (carrinhoHomeState.length === 0 && Array.isArray(carrinhoStorageParsed) && carrinhoStorageParsed.length > 0) {
        localStorage.setItem("carrinho", JSON.stringify([]));
    }
  }, [carrinhoHomeState]);


  useEffect(() => {
    const processPaymentConfirmation = async () => {
      console.log("Verificando parâmetros de URL para confirmação de pagamento...");
      const params = new URLSearchParams(location.search);
      const paymentIdParam = params.get('payment_id');
      const statusParam = params.get('status');
      const preferenceIdParam = params.get('preference_id');
      const paymentTypeParam = params.get('payment_type');

      console.log("Parâmetros recebidos:", { paymentIdParam, statusParam, preferenceIdParam, paymentTypeParam });

      const processedPaymentKey = `processed_sale_${paymentIdParam}`;
      if (paymentIdParam && localStorage.getItem(processedPaymentKey)) {
        console.log(`Venda com payment_id ${paymentIdParam} já processada anteriormente.`);
        const successMessage = localStorage.getItem(`success_message_${paymentIdParam}`);
        if (successMessage) {
            setNotification(successMessage, 'success');
        } else {
            setNotification(null, 'info');
        }
        if(location.search) navigate('/', { replace: true });
        return;
      }

      setNotification(null, 'info'); // Limpa notificação anterior

      if (paymentIdParam && statusParam === 'approved' && preferenceIdParam) {
        setIsProcessingSale(true);
        setNotification('Processando confirmação da sua compra...', 'info');
        console.log(`Iniciando processamento para payment_id: ${paymentIdParam}`);

        const userInfo = getUserInfoFromToken();
        console.log("Informações do usuário obtidas do token:", userInfo);
        if (!userInfo || !userInfo.email || !userInfo.role) {
          const errorMsg = 'Erro: Não foi possível identificar o usuário. Faça login e tente novamente ou contate o suporte.';
          console.error(errorMsg, "(userInfo:", userInfo, ")");
          setNotification(errorMsg, 'error');
          setIsProcessingSale(false);
          return;
        }

        const { email: userEmail, role: userRole } = userInfo;

        const roleToEndpoint: Record<string, string> = {
          CUSTOMER: "customers",
          CRAFTSMAN: "craftsmen",
          COMPANY: "companies",
        };
        const endpointRole = roleToEndpoint[userRole.toUpperCase()] || "customers";
        
        if (userRole.toUpperCase() !== "CUSTOMER") {
            const errorMsg = `Erro: Tipo de usuário '${userRole}' não autorizado para realizar compras. Contate o suporte.`;
            console.error(errorMsg);
            setNotification(errorMsg, 'error');
            setIsProcessingSale(false);
            return;
        }

        let customerId: string | null = null;
        const token = sessionStorage.getItem("token");
        console.log(`Buscando dados do cliente para email: ${userEmail} no endpoint: /${endpointRole}/email/${userEmail}`);

        try {
          const customerResponse = await api.get(`/${endpointRole}/email/${userEmail}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          customerId = customerResponse.data.id;
          console.log("Dados do cliente recebidos:", customerResponse.data);
        } catch (error: any) {
          const errorMsg = `Erro ao buscar dados do cliente (${userEmail}): ${error.response?.data?.message || error.message}. Contate o suporte.`;
          console.error("Detalhes do erro ao buscar cliente:", error);
          setNotification(errorMsg, 'error');
          setIsProcessingSale(false);
          return;
        }
        
        if (!customerId) {
            const errorMsg = 'Erro: ID do cliente não encontrado após busca por e-mail.';
            console.error(errorMsg);
            setNotification(errorMsg, 'error');
            setIsProcessingSale(false);
            return;
        }
        console.log("Customer ID obtido:", customerId);

        const carrinhoStorage = localStorage.getItem('carrinho');
        if (!carrinhoStorage) {
          const errorMsg = 'Erro: Carrinho não encontrado para finalizar a venda. Contate o suporte.';
          console.error(errorMsg);
          setNotification(errorMsg, 'error');
          setIsProcessingSale(false);
          return;
        }
        console.log("Carrinho encontrado no localStorage:", carrinhoStorage);

        let cartItems: ProdutoCarrinho[] = [];
        try {
          const parsedCart = JSON.parse(carrinhoStorage);
          if (Array.isArray(parsedCart) && parsedCart.length > 0 && parsedCart.every(item => 
              item.produto && 
              typeof item.produto.id !== 'undefined' &&
              typeof item.produto.nome !== 'undefined' &&
              typeof item.produto.valor !== 'undefined' &&
              typeof item.quantidade === 'number' && item.quantidade > 0
            )) {
            cartItems = parsedCart as ProdutoCarrinho[];
            console.log("Itens do carrinho parseados com sucesso:", cartItems);
          } else {
            const errorMsg = 'Erro: Carrinho vazio ou com formato inválido. Contate o suporte.';
            console.error(errorMsg, "Conteúdo do carrinho parseado:", parsedCart);
            setNotification(errorMsg, 'error');
            setIsProcessingSale(false);
            return;
          }
        } catch (error) {
          const errorMsg = 'Erro ao processar dados do carrinho. Contate o suporte.';
          console.error("Detalhes do erro ao processar carrinho:", error);
          setNotification(errorMsg, 'error');
          setIsProcessingSale(false);
          return;
        }

        const products_ids = cartItems.map(item => item.produto.id.toString());
        const total = cartItems.reduce((acc, item) => acc + (item.produto.valor * item.quantidade), 0);
        console.log("Dados calculados do carrinho:", { products_ids, total });

        // --- ADICIONANDO O CRAFTSMAN_ID FIXO PARA TESTE ---
        const testCraftsmanId = "21338bba177949b4b52048158a533ec5";

        const saleData = {
          preference_id: preferenceIdParam,
          payment_id: parseInt(paymentIdParam, 10),
          craftsman_id: testCraftsmanId, // <--- ADICIONADO AQUI
          customer_id: customerId,
          products_ids: products_ids,
          total: parseFloat(total.toFixed(2)),
          payment_method: paymentTypeParam || 'unknown',
          status: statusParam,
        };

        console.log("Preparando para enviar dados para /sales:", saleData);

        try {
          const saleResponse = await api.post('/sales', saleData);
          const successMsg = `Compra ${saleResponse.data.orderId || paymentIdParam} registrada com sucesso! Obrigado!`;
          console.log('Venda registrada com sucesso! Resposta do backend:', saleResponse.data);
          setNotification(successMsg, 'success');
          localStorage.setItem(`success_message_${paymentIdParam}`, successMsg);


          localStorage.setItem(processedPaymentKey, 'true');
          localStorage.removeItem('carrinho');
          setCarrinhoHomeState([]);
          console.log("Carrinho limpo do localStorage e do estado da Home.");

          setTimeout(() => {
            if(location.search.includes(paymentIdParam!)) {
                navigate('/', { replace: true });
                console.log("URL limpa após sucesso e timeout.");
            }
          }, 5000);

        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message;
          const errorMsgAlert = `Erro ao registrar sua compra no sistema: ${errorMessage}. Por favor, contate o suporte com o ID de pagamento ${paymentIdParam}.`;
          console.error('Erro ao registrar venda no backend. Detalhes:', error, "Payload enviado:", saleData);
          setNotification(errorMsgAlert, 'error');
        } finally {
          setIsProcessingSale(false);
          console.log("Processamento de confirmação finalizado.");
        }
      } else if (paymentIdParam && statusParam && statusParam !== 'approved') {
        const msg = `Status do pagamento: ${statusParam}. Para o ID de pagamento ${paymentIdParam}. Se precisar de ajuda, contate o suporte.`;
        console.warn(msg);
        setNotification(msg, 'warning'); // Usando 'warning' para status não aprovados
        // setTimeout(() => { if(location.search) navigate('/', { replace: true }); }, 5000);
      } else if (location.search && (!paymentIdParam || !statusParam || !preferenceIdParam)) {
        console.log("Parâmetros de URL presentes, mas não correspondem a uma confirmação de pagamento aprovada válida.");
        // setTimeout(() => { if(location.search) navigate('/', { replace: true }); }, 1000);
      } else {
        if (!location.search) setNotification(null, 'info'); // Limpa se não há params
      }
    };

    if (location.search || saleStatusMessage) { // Processa se há params ou se uma msg precisa ser limpa (após timeout p.ex.)
        processPaymentConfirmation();
    } else {
        console.log("Home carregada sem parâmetros de query na URL e sem mensagem de status pendente.");
    }
  }, [location.search, navigate]); // Removido saleStatusMessage da dependência para evitar loop com o setNotification(null, 'info') no else


  const handleProdutoSelect = (produto: Produto) => {
    setProdutoSelecionado(produto);
  };

  const handleAdicionarAoCarrinhoHome = (produto: Produto, quantidade: number) => {
    setCarrinhoHomeState(prevCarrinho => {
        const produtoExistente = prevCarrinho.find(p => p.produto && p.produto.id === produto.id);
        let novoCarrinho;
        if (produtoExistente) {
            novoCarrinho = prevCarrinho.map(p =>
            p.produto && p.produto.id === produto.id
                ? { ...p, quantidade: p.quantidade + quantidade }
                : p
            );
        } else {
            novoCarrinho = [...prevCarrinho, { produto, quantidade }];
        }
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        return novoCarrinho;
    });
    setProdutoSelecionado(null);
  };

  return (
    <div>
      <Header />
      {saleStatusMessage && (
        <StatusNotification type={notificationType}>
          {isProcessingSale && notificationType === 'info' && saleStatusMessage === 'Processando confirmação da sua compra...' && 
            <ProcessingText>Processando...</ProcessingText>
          }
          {/* Evita mostrar "Processando..." e a msg final ao mesmo tempo se a msg final for a de processamento */}
          {!(isProcessingSale && notificationType === 'info' && saleStatusMessage === 'Processando confirmação da sua compra...') && saleStatusMessage}
        </StatusNotification>
      )}

      {/* Conteúdo existente da Home */}
      <ExploreContainer>
          <ExploreContainerColuns>
              <TextExploreContainer>
                  <TextUm>
                      Explore Nossa Coleção Artesanal De Produtos De Barro!
                  </TextUm>
                  <TextDois>
                      Descubra Agora Nossas Ofertas Exclusivas e Produtos Feitos à Mão com Todo Cuidado!
                  </TextDois>
                  <ButtonExplore onClick={() => handleNavigate('/produtos')} >
                      Nossos Produtos
                  </ButtonExplore>
              </TextExploreContainer>
              <BarrosExplore alt="Produtos de barro" src={BarrosImage} />
          </ExploreContainerColuns>
      </ExploreContainer>
      <LinhaUm/>
      <LinhaDois/>

      <ContainerMaisVendido>
          <ContainerTextMaisVendido>
              <ContainerText1>
                  <Text1>-</Text1>
                  <Text2>Coleções</Text2>
              </ContainerText1>
              <Text3>Mais Vendidos</Text3>
              <Text4>A produção diária na nossa fábrica. novas práticas de gestão de qualidade.</Text4>
              <Text5 onClick={() => handleNavigate('/produtos')} >Explore</Text5>
          </ContainerTextMaisVendido>
          <VoltarDestaques alt="Voltar Destaques" src={VoltarAsset} />
          {produtosMockadosHome.slice(0, 3).map(p => (
             <ContainerProdutosDestaque key={p.id} onClick={() => handleProdutoSelect(p)}>
                 <ImageProdutoDestaque alt={p.nome} src={p.imagem} />
                 <ProdutoNameDestaque>{p.nome}</ProdutoNameDestaque>
                 <ProdutoValorDestaque>R$ {p.valor.toFixed(2)}</ProdutoValorDestaque>
             </ContainerProdutosDestaque>
          ))}
          <AvancarDestaques alt="Avançar Destaques" src={AvancarAsset} />
      </ContainerMaisVendido>

      <ContainerImageAltaQualidade onClick={() => handleNavigate('/produtos')} >
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
          <ProdutoList produtos={produtosMockadosHome} onSelectProduto={handleProdutoSelect} />
        </ContainerProdutosGeral>
      </ContainerProdutosGeral1>

      {produtoSelecionado && (
        <ProdutoDetalhesModal
          produto={produtoSelecionado}
          onAdicionarAoCarrinho={handleAdicionarAoCarrinhoHome}
          onFecharModal={() => setProdutoSelecionado(null)}
        />
      )}

      <Clientes />
      <Footer />
    </div>
  );
}

export default Home;