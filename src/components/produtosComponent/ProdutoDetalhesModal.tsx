import React, { useEffect, useState } from "react";
import { Produto } from "../../types/types";
import { 
  Modal, 
  ModalContent, 
  // ... (e todos os outros imports de style)
  ModalPreco,
  ControlesQuantidade,
  ModalDescricao,
  CarrosselContainer,
  CarrosselImagem,
  CarrosselItem,
  CarrosselLista,
  CarrosselMensagem,
  CarrosselNome,
  CarrosselPreco,
  CarrosselTitulo, 
  ModalFooter,
  ModalHeader,
  ModalBody,
  BotaoFechar,
  BotaoAdicionar,
  ModalImage,
  ModalNome
} from "./produtoDetalhesModalStyle";
import { recomendarProdutos } from "../../services/produtosService";

interface ProdutoDetalhesModalProps {
  produto: Produto | null; // Alterado para aceitar null
  onAdicionarAoCarrinho: (produto: Produto, novaQuantidade: number) => void;
  onFecharModal: () => void;
}

const ProdutoDetalhesModal: React.FC<ProdutoDetalhesModalProps> = ({
  produto,
  onAdicionarAoCarrinho,
  onFecharModal,
}) => {
  const [quantidade, setQuantidade] = useState(1);
  const [recomendados, setRecomendados] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  // ✅ GUARDA DE PROTEÇÃO: Se não houver produto, não renderiza nada.
  if (!produto) {
    return null; 
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Reseta a quantidade para 1 sempre que o produto do modal mudar
    setQuantidade(1);

    const carregarRecomendados = async () => {
      if (!produto) return;
      
      setCarregando(true);
      setErro('');
      
      try {
        const produtos = await recomendarProdutos(produto);
        setRecomendados(produtos);
      } catch (error) {
        console.error('Erro ao carregar recomendações:', error);
        setErro('Não foi possível carregar as recomendações');
      } finally {
        setCarregando(false);
      }
    };
    
    carregarRecomendados();
  }, [produto]);

  const handleQuantidadeAlterada = (novaQuantidade: number) => {
    if (novaQuantidade >= 1) {
      setQuantidade(novaQuantidade);
    }
  };

  const handleAdicionarAoCarrinho = () => {
    onAdicionarAoCarrinho(produto, quantidade);
    onFecharModal();
  };
  
  // Função para formatar o preço com segurança
  const formatarPreco = (preco: number | undefined) => {
    if (typeof preco === 'number') {
      return preco.toFixed(2);
    }
    return '0.00'; // Ou 'Indisponível'
  }

  return (
    <Modal onClick={(e) => e.target === e.currentTarget && onFecharModal()}>
      <ModalContent>
        <ModalHeader>
          <div></div>
          <ModalNome>{produto.nome}</ModalNome>
          <BotaoFechar onClick={onFecharModal}>x</BotaoFechar>
        </ModalHeader>
        <ModalBody>
          <ModalImage src={produto.imagemUrl} alt={produto.nome} />
          <ModalDescricao>{`Descrição: ${produto.descricao || 'Não há descrição disponível.'}`}</ModalDescricao>
          
          <CarrosselContainer>
          <CarrosselTitulo>
            Você também pode gostar ✨
          </CarrosselTitulo>
            {carregando ? (
              <CarrosselMensagem>Carregando recomendações...</CarrosselMensagem>
            ) : erro ? (
              <CarrosselMensagem>{erro}</CarrosselMensagem>
            ) : (
              <CarrosselLista>
                {recomendados.map((produtoRec) => (
                  <CarrosselItem key={produtoRec.id}>
                    <CarrosselImagem src={produtoRec.imagemUrl} alt={produtoRec.nome} />
                    <CarrosselNome>{produtoRec.nome}</CarrosselNome>
                    {/* ✅ CORREÇÃO 1: Preço dos recomendados */}
                    <CarrosselPreco>R$ {formatarPreco(produtoRec.preco)}</CarrosselPreco>
                  </CarrosselItem>
                ))}
              </CarrosselLista>
            )}
          </CarrosselContainer>

          {/* ✅ CORREÇÃO 2: Preço do produto principal */}
          <ModalPreco>{`Valor do produto: R$ ${formatarPreco(produto.preco)}`}</ModalPreco>
          
          <ControlesQuantidade>
            <button onClick={() => handleQuantidadeAlterada(quantidade - 1)} disabled={quantidade <= 1}>-</button>
            <span>{quantidade}</span>
            <button onClick={() => handleQuantidadeAlterada(quantidade + 1)}>+</button>
          </ControlesQuantidade>

          {/* ✅ CORREÇÃO 3: Preço total */}
          <ModalPreco>{`Valor total: R$ ${formatarPreco((produto.preco || 0) * quantidade)}`}</ModalPreco>

        </ModalBody>
        <ModalFooter>
          <BotaoAdicionar onClick={handleAdicionarAoCarrinho}>
            Adicionar ao Carrinho
          </BotaoAdicionar>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProdutoDetalhesModal;