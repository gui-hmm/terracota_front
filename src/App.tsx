import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/home/home'
import QuemSomos from './pages/quemSomos/quemSomos';
import Produtos from './pages/produtos/produto';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import Perfil from './pages/perfil/perfil';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
