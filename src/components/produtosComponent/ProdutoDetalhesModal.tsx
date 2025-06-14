import React, { useEffect, useState } from "react";
import { Produto } from "../../types/types";
import { 
  Modal, 
  ModalContent, 
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
  ModalNome,
  CarrosselBotaoAdicionar
} from "./produtoDetalhesModalStyle";
import { recomendarProdutos } from "../../services/produtosService";

interface ProdutoDetalhesModalProps {
  produto: Produto | null;
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

  if (!produto) {
    return null; 
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
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

  const handleAdicionarRecomendado = (produtoRecomendado: Produto, event: React.MouseEvent) => {
    event.stopPropagation();
    onAdicionarAoCarrinho(produtoRecomendado, 1); 
  };

  const handleAdicionarAoCarrinho = () => {
    onAdicionarAoCarrinho(produto, quantidade);
    onFecharModal();
  };
  
  const formatarPreco = (preco: number | undefined) => {
    if (typeof preco === 'number') {
      return preco.toFixed(2);
    }
    return '0.00';
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
                    <CarrosselImagem src={produtoRec.imagemUrl || "https://img.freepik.com/vetores-premium/jarro-de-ceramica-marrom-vaso-de-barro-vaso-de-artesanato_81894-7502.jpg"} alt={produtoRec.nome} />
                    <CarrosselNome>{produtoRec.nome}</CarrosselNome>
                    <CarrosselPreco>R$ {formatarPreco(produtoRec.preco)}</CarrosselPreco>
                    <CarrosselBotaoAdicionar 
                      onClick={(e) => handleAdicionarRecomendado(produtoRec, e)}
                      title={`Adicionar ${produtoRec.nome} ao carrinho`}
                    >
                    +
                    </CarrosselBotaoAdicionar>
                  </CarrosselItem>
                ))}
              </CarrosselLista>
            )}
          </CarrosselContainer>

          <ModalPreco>{`Valor do produto: R$ ${formatarPreco(produto.preco)}`}</ModalPreco>
          
          <ControlesQuantidade>
            <button onClick={() => handleQuantidadeAlterada(quantidade - 1)} disabled={quantidade <= 1}>-</button>
            <span>{quantidade}</span>
            <button onClick={() => handleQuantidadeAlterada(quantidade + 1)}>+</button>
          </ControlesQuantidade>

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