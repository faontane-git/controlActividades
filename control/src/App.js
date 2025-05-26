import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/Home/HomePage';
import ActividadesPage from './pages/Actividades/ActividadesPage';
import OptionsPage from './pages/Opciones/OptionsPage';
import FacturacionPage from './pages/Facturacion';
import GenerarFactura from './pages/Facturacion/factura';
import VerHistorico from './pages/Facturacion/historico';
import CrearProductos from './pages/Facturacion/productos';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/Login/Login';
import MainPage from './pages/Main/main';
import PerfilPage from './pages/Cuenta/PerfilPage';
import ConfiguracionPage from './pages/Cuenta/ConfiguracionPage';
import CertificadosPage from './pages/Certificados/Certificados';
import MenuPage from './pages/Main/MenuPage';
import Proyectos from './pages/Proyectos';
import DetalleProyecto from './pages/Proyectos/DetalleProyecto';
import SoftwareBoard from './pages/Proyectos';
import NewProject from './pages/Proyectos/Crear Proyecto/NuevoProyecto';
import RegisterPage from './pages/Login/RegisterPage';
import Personal from './pages/Personal/Personal';
import BolsaDeValores from './pages/Bolsa';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/actividades" element={<HomePage />} />
        <Route path="/opciones" element={<OptionsPage />} />

        {/* Rutas de Personal */}
        <Route path="/personal" element={<Personal />} />
        <Route path="/bolsa" element={<BolsaDeValores />} />

        {/* Rutas de Proyectos */}
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/proyectos/nuevo" element={<NewProject />} />
        <Route path="/proyectos/:id" element={<DetalleProyecto />} />

        {/* Rutas de Facturación */}
        <Route path="/facturador" element={<FacturacionPage />} />
        <Route path="/factura" element={<GenerarFactura />} />
        <Route path="/productos" element={<CrearProductos />} />
        <Route path="/historico" element={<VerHistorico />} />

        {/* Otras rutas */}
        <Route path="/trabajo" element={<SoftwareBoard />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/configuracion" element={<ConfiguracionPage />} />
        <Route path="/certificados" element={<CertificadosPage />} />
      </Routes>
    </Router>
  );
}

export default App;