import React from 'react';
import './App.css';
import Home from './pages/home/home'
import QuemSomos from './pages/quemSomos/quemSomos';
import Produtos from './pages/produtos/produto';

function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      {/* <QuemSomos/> */}
      <Produtos/>
    </div>
  );
}

export default App;
