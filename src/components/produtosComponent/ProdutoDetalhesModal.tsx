import React, { useState } from "react";
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
  ModalDescricao, 
} from "./produtoDetalhesModalStyle";

interface ProdutoDetalhesModalProps {
  produto: Produto;
  onAdicionarAoCarrinho: (produto: Produto, novaQuantidade: number) => void;
  onFecharModal: () => void;
}

const ProdutoDetalhesModal: React.FC<ProdutoDetalhesModalProps> = ({
  produto,
  onAdicionarAoCarrinho,
  onFecharModal,
}) => {
  const [quantidade, setQuantidade] = useState(1);

  console.log(produto)

  const handleQuantidadeAlterada = (novaQuantidade: number) => {
    if (novaQuantidade >= 1) {
      setQuantidade(novaQuantidade);
    }
  };

  const handleAdicionarAoCarrinho = () => {
    onAdicionarAoCarrinho(produto, quantidade);
    onFecharModal(); 
  };

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
          <ModalDescricao>{`Descrição: ${produto.descricao}`}</ModalDescricao>
          <ModalPreco>{`Valor do produto: R$${produto.valor.toFixed(2)}`}</ModalPreco>
          <ControlesQuantidade>
            <button onClick={() => handleQuantidadeAlterada(quantidade - 1)} disabled={quantidade <= 1}>-</button>
            <span>{quantidade}</span>
            <button onClick={() => handleQuantidadeAlterada(quantidade + 1)}>+</button>
          </ControlesQuantidade>
          <ModalPreco>{`Valor total: R$${(produto.valor * quantidade).toFixed(2)}`}</ModalPreco>
        </ModalBody>
        <ModalFooter>
          <BotaoAdicionar onClick={handleAdicionarAoCarrinho} >
            Adicionar ao Carrinho
          </BotaoAdicionar>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProdutoDetalhesModal;
