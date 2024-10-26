// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/Home/HomePage';
import ActividadesPage from './pages/Actividades/ActividadesPage';
import OptionsPage from './pages/Opciones/OptionsPage';
import FacturacionPage from './pages/Facturacion';
import GenerarFactura from './pages/Facturacion/factura';
import VerHistorico from './pages/Facturacion/historico';
import CrearProductos from './pages/Facturacion/productos';
import TrabajoPage from './pages/Trabajo';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/actividades/:month" element={<ActividadesPage />} />
        <Route path='/opciones' element={<OptionsPage />} />
        <Route path='/facturacion' element={<FacturacionPage/>}/>
        <Route path='/factura' element={<GenerarFactura/>}/>
        <Route path='/productos' element={<CrearProductos/>}/>
        <Route path='/historico' element={<VerHistorico/>}/>
        <Route path='/trabajo' element={<TrabajoPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

