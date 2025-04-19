import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './dashboardStyle';

const DashboardArtesao: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h2>Painel do Artesão</h2>
      <div className="cards">
        <button type="button" onClick={() => navigate('/artesao/meus-produtos')}>
          Meus Produtos
        </button>
        <button type="button" onClick={() => navigate('/artesao/minhas-vendas')}>
          Minhas Vendas
        </button>
        <button type="button" onClick={() => navigate('/artesao/perfil')}>
          Perfil
        </button>
      </div>
    </Container>
  );
};

export default DashboardArtesao;
