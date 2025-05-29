import React, { useEffect, useState } from "react";
import {
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
import { jwtDecode } from "jwt-decode"; // Importar jwt-decode

// Interface para o payload do JWT (igual à da tela de Perfil)
interface JwtPayload {
  sub: string; // e-mail
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

// Função para obter e-mail e role do token (baseada na lógica do Perfil)
const getUserInfoFromToken = (): { email: string; role: JwtPayload['role'] } | null => {
  const token = sessionStorage.getItem('token'); // Usando sessionStorage como no Perfil
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

  const handleNavigate = (path: To) => {
    navigate(path);
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
      } catch {
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
      const params = new URLSearchParams(location.search);
      const paymentIdParam = params.get('payment_id');
      const statusParam = params.get('status');
      const preferenceIdParam = params.get('preference_id');
      const paymentTypeParam = params.get('payment_type');

      const processedPaymentKey = `processed_sale_${paymentIdParam}`;
      if (paymentIdParam && localStorage.getItem(processedPaymentKey)) {
        if(location.search) navigate('/', { replace: true });
        return;
      }

      if (paymentIdParam && statusParam === 'approved' && preferenceIdParam) {
        setIsProcessingSale(true);
        setSaleStatusMessage('Processando confirmação da sua compra...');

        const userInfo = getUserInfoFromToken();
        if (!userInfo || !userInfo.email || !userInfo.role) {
          setSaleStatusMessage('Erro: Não foi possível identificar o usuário. Faça login e tente novamente ou contate o suporte.');
          setIsProcessingSale(false);
          return;
        }

        const { email: userEmail, role: userRole } = userInfo;

        // Determinar o endpoint com base no role (igual à tela de Perfil)
        // Para uma venda, esperamos que o role seja CUSTOMER.
        const roleToEndpoint: Record<string, string> = {
          CUSTOMER: "customers",
          CRAFTSMAN: "craftsmen", // Mantido para consistência com a lógica do Perfil
          COMPANY: "companies",   // Mantido para consistência
        };
        // Se o role do token não for um dos esperados, ou se for um artesão/empresa tentando comprar (o que pode ser um caso de borda)
        // você pode querer um tratamento específico. Para buscar o ID de um comprador, "customers" é o mais provável.
        const endpointRole = roleToEndpoint[userRole.toUpperCase()] || "customers"; // Default para customers
        
        // Se a compra só pode ser feita por CUSTOMER, você pode adicionar uma verificação:
        if (userRole.toUpperCase() !== "CUSTOMER") {
            setSaleStatusMessage(`Erro: Tipo de usuário '${userRole}' não autorizado para realizar compras. Contate o suporte.`);
            setIsProcessingSale(false);
            return;
        }


        let customerId: string | null = null;
        const token = sessionStorage.getItem("token"); // Pega o token para o header

        try {
          const customerResponse = await api.get(`/${endpointRole}/email/${userEmail}`, {
            headers: { // Adicionando header de autorização
              Authorization: `Bearer ${token}`,
            },
          });
          customerId = customerResponse.data.id;
        } catch (error: any) {
          console.error("Erro ao buscar dados do cliente:", error);
          setSaleStatusMessage(`Erro ao buscar dados do cliente (${userEmail}): ${error.response?.data?.message || error.message}. Contate o suporte.`);
          setIsProcessingSale(false);
          return;
        }
        
        if (!customerId) {
            setSaleStatusMessage('Erro: ID do cliente não encontrado após busca por e-mail.');
            setIsProcessingSale(false);
            return;
        }

        const carrinhoStorage = localStorage.getItem('carrinho');
        if (!carrinhoStorage) {
          setSaleStatusMessage('Erro: Carrinho não encontrado para finalizar a venda. Contate o suporte.');
          setIsProcessingSale(false);
          return;
        }

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
          } else {
            setSaleStatusMessage('Erro: Carrinho vazio ou com formato inválido. Contate o suporte.');
            setIsProcessingSale(false);
            return;
          }
        } catch (error) {
          setSaleStatusMessage('Erro ao processar dados do carrinho. Contate o suporte.');
          setIsProcessingSale(false);
          return;
        }

        const products_ids = cartItems.map(item => item.produto.id.toString());
        const total = cartItems.reduce((acc, item) => acc + (item.produto.valor * item.quantidade), 0);

        const saleData = {
          preference_id: preferenceIdParam,
          payment_id: parseInt(paymentIdParam, 10),
          customer_id: customerId,
          products_ids: products_ids,
          total: parseFloat(total.toFixed(2)),
          payment_method: paymentTypeParam || 'unknown',
          status: statusParam,
        };

        try {
          console.log("Enviando dados para /sales:", saleData);
          // A chamada POST /sales também precisa do token se o endpoint for protegido?
          // Se sim, adicione o header:
          // const saleResponse = await api.post('/sales', saleData, {
          //   headers: { Authorization: `Bearer ${token}` }
          // });
          const saleResponse = await api.post('/sales', saleData); // Ajuste se precisar de token
          console.log('Venda registrada com sucesso:', saleResponse.data);
          setSaleStatusMessage(`Compra ${saleResponse.data.orderId || paymentIdParam} registrada com sucesso! Obrigado!`);

          localStorage.setItem(processedPaymentKey, 'true');
          localStorage.removeItem('carrinho');
          setCarrinhoHomeState([]);

          navigate('/', { replace: true });
        } catch (error: any) {
          console.error('Erro ao registrar venda no backend:', error);
          setSaleStatusMessage(`Erro ao registrar sua compra no sistema: ${error.response?.data?.message || error.message}. Por favor, contate o suporte com o ID de pagamento ${paymentIdParam}.`);
        } finally {
          setIsProcessingSale(false);
        }
      } else if (paymentIdParam && statusParam && statusParam !== 'approved') {
        setSaleStatusMessage(`Status do pagamento: ${statusParam}. Se precisar de ajuda, contate o suporte com o ID ${paymentIdParam}.`);
      }
    };

    if (location.search) {
        processPaymentConfirmation();
    }
  }, [location.search, navigate]);


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
        <div style={{
          padding: '15px',
          margin: '20px auto',
          width: '80%',
          maxWidth: '600px',
          textAlign: 'center',
          backgroundColor: saleStatusMessage.includes('Erro') || saleStatusMessage.toLowerCase().includes('rejeitado') || saleStatusMessage.toLowerCase().includes('pendente') ? '#f8d7da' : '#d4edda',
          color: saleStatusMessage.includes('Erro') || saleStatusMessage.toLowerCase().includes('rejeitado') || saleStatusMessage.toLowerCase().includes('pendente') ? '#721c24' : '#155724',
          border: `1px solid ${saleStatusMessage.includes('Erro') || saleStatusMessage.toLowerCase().includes('rejeitado') || saleStatusMessage.toLowerCase().includes('pendente') ? '#f5c6cb' : '#c3e6cb'}`,
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {isProcessingSale && <div style={{ marginBottom: '10px' }}>Carregando...</div>}
          {saleStatusMessage}
        </div>
      )}

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