import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

// Páginas públicas
import Home from './pages/home/home';
import QuemSomos from './pages/quemSomos/quemSomos';
import Produtos from './pages/produtos/produto';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import Chatbot from './pages/chatbot/chatbot';

// Páginas protegidas
import Perfil from './pages/perfil/perfil';
import Carrinho from './pages/carrinho/carrinho';
import MeusProdutos from './pages/artesaoMeusProdutos/meusProdutos';
import MinhasVendas from './pages/artesaoMinhasVendas/minhasVendas';
import DashboardArtesao from './pages/artesaoDashboard/daschboard';

import RoleProtectedRoute from './RoleProtectedRoute';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/quemsomos" element={<QuemSomos />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/chatbot" element={<Chatbot />} />

          {/* Protegidas para CUSTOMER */}
          <Route element={<RoleProtectedRoute allowedRoles={["CUSTOMER"]} />}>
            <Route path="/carrinho" element={<Carrinho />} />
          </Route>

          {/* Protegidas para CRAFTSMAN */}
          <Route element={<RoleProtectedRoute allowedRoles={["CRAFTSMAN"]} />}>
            <Route path="/meusprodutos" element={<MeusProdutos />} />
            <Route path="/minhasvendas" element={<MinhasVendas />} />
          </Route>

          {/* Protegidas para COMPANY */}
          <Route element={<RoleProtectedRoute allowedRoles={["COMPANY"]} />}>

          </Route>

          {/* Protegidas para CUSTOMER e CRAFTSMAN */}
          <Route element={<RoleProtectedRoute allowedRoles={["CUSTOMER", "CRAFTSMAN"]} />}>
            <Route path="/perfil" element={<Perfil />} />
          </Route>

          {/* Protegidas para CRAFTSMAN e COMPANY */}
          <Route element={<RoleProtectedRoute allowedRoles={["CRAFTSMAN", "COMPANY"]} />}>
            <Route path="/dashboard" element={<DashboardArtesao />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
