import React, { useEffect, useState } from 'react';
import CardVenda from '../../components/artesao/cardVenda/cardVenda';
import { listarVendas } from '../../services/vendasService';
import { Container } from './minhasVendasStyle';
import { Venda } from '../../types/types';

const MinhasVendas: React.FC = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);

  useEffect(() => {
    async function carregar() {
      const dados = await listarVendas();
      setVendas(dados);
    }
    carregar();
  }, []);

  return (
    <Container>
      <h2>Minhas Vendas</h2>
      <div className="cards">
        {vendas.map((v) => (
          <CardVenda key={v.id} venda={v} />
        ))}
      </div>
    </Container>
  );
};

export default MinhasVendas;
