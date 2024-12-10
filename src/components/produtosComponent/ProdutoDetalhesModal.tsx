import React from "react";
import { Produto } from "../../pages/produtos/produto";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  BotaoFechar, 
  BotaoAdicionar, 
  ModalFooter, 
  ModalImage, 
  ModalNome, 
  ModalPreco,
  ControlesQuantidade, 
} from "./produtoDetalhesModalStyle";

interface ProdutoDetalhesModalProps {
  produto: Produto;
  quantidade: number;
  onAlterarQuantidade: (novaQuantidade: number) => void;
  onAdicionarAoCarrinho: (produto: Produto) => void;
  onFecharModal: () => void;
}

const ProdutoDetalhesModal: React.FC<ProdutoDetalhesModalProps> = ({
  produto,
  quantidade,
  onAlterarQuantidade,
  onAdicionarAoCarrinho,
  onFecharModal,
}) => {
  return (
    <Modal onClick={(e) => e.target === e.currentTarget && onFecharModal()}>
      <ModalContent>
        <ModalHeader>
          <div></div>
          <ModalNome>{produto.nome}</ModalNome>
          <BotaoFechar onClick={onFecharModal}>x</BotaoFechar>
        </ModalHeader>
        <ModalBody>
          <ModalImage src={produto.imagem} alt={produto.nome} />
          <ModalPreco>{`Valor do produto R$ ${produto.valor.toFixed(2)}`}</ModalPreco>
          <ControlesQuantidade>
            <button onClick={() => onAlterarQuantidade(quantidade - 1)}>-</button>
            <span>{quantidade}</span>
            <button onClick={() => onAlterarQuantidade(quantidade + 1)}>+</button>
          </ControlesQuantidade>
          <ModalPreco>{`Valor total R$ ${(produto.valor * quantidade).toFixed(2)}`}</ModalPreco>
        </ModalBody>
        <ModalFooter>
            <BotaoAdicionar onClick={() => {
                onAdicionarAoCarrinho(produto); 
                onFecharModal();
            }}>
            Adicionar ao Carrinho
          </BotaoAdicionar>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProdutoDetalhesModal;
