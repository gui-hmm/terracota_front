import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './dashboardStyle';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const DashboardArtesao: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header/>
      <Container>
        <h2>Painel do Artesão</h2>
        <div className="cards">
          <button type="button" onClick={() => navigate('/meusprodutos')}>
            Meus Produtos
          </button>
          <button type="button" onClick={() => navigate('/minhasvendas')}>
            Minhas Vendas
          </button>
          {/* <button type="button" onClick={() => navigate('/artesao/perfil')}>
            Perfil
          </button> */}
        </div>
      </Container>
      <Footer/>
    </>
  );
};

export default DashboardArtesao;
