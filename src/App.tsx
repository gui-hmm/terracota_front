import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/home/home'
import QuemSomos from './pages/quemSomos/quemSomos';
import Produtos from './pages/produtos/produto';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import Perfil from './pages/perfil/perfil';
import Carrinho from './pages/carrinho/carrinho';
import Chatbot from './pages/chatbot/chatbot';
import MeusProdutos from './pages/artesaoMeusProdutos/meusProdutos';
import MinhasVendas from './pages/artesaoMinhasVendas/minhasVendas';
import ArtesaoPerfil from './pages/artesaPerfil/artesaoPerfil';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/quemsomos' element={<QuemSomos/>} />
          <Route path='/produtos' element={<Produtos/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/cadastro' element={<Cadastro/>} />
          <Route path='/perfil' element={<Perfil/>} />
          <Route path='/carrinho' element={<Carrinho/>} />
          <Route path='/chatbot' element={<Chatbot/>} />
          <Route path='/meusprodutos' element={<MeusProdutos/>} />
          <Route path='/minhasvendas' element={<MinhasVendas/>} />
          <Route path='/artesaoperfil' element={<ArtesaoPerfil/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
