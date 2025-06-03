import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/Home/HomePage';
import ActividadesPage from './pages/Actividades/ActividadesPage';
import FacturacionPage from './pages/Facturacion';
import GenerarFactura from './pages/Facturacion/Facturas/factura';
import VerHistorico from './pages/Facturacion/historico';
import CrearProductos from './pages/Facturacion/Productos/productos';
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
import Clientes from './pages/Clientes/Clientes';
import Cotizar from './pages/Cotizar/Cotizar';
import CotizacionesList from './pages/Cotizar/CotizacionesList';
import CotizacionDetalle from './pages/Cotizar/CotizacionDetalle';
import CotizacionMenu from './pages/Cotizar/CotizacionMenu';
import PlantillasCotizacion from './pages/Cotizar/PlantillasCotizacion';
import FacturasGeneradas from './pages/Facturacion/Facturas/FacturasGeneradas';
import ProductosCreados from './pages/Facturacion/Productos/ProductosCreados';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/actividades" element={<HomePage />} />

        {/* Rutas de Personal */}
        <Route path="/personal" element={<Personal />} />

        {/* Rutas de Proyectos */}
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/proyectos/nuevo" element={<NewProject />} />
        <Route path="/proyectos/:id" element={<DetalleProyecto />} />

        {/* Rutas de Facturación */}
        <Route path="/facturador" element={<FacturacionPage />} />
        <Route path="/factura" element={<FacturasGeneradas />} />
        <Route path="/factura/nueva" element={<GenerarFactura />} />
        <Route path="/productos" element={<ProductosCreados />} />
        <Route path="/historico" element={<VerHistorico />} />
        {/* Rutas de Facturación */}
        <Route path="/clientes" element={<Clientes />} />
        {/* Rutas de Cotizar */}
        <Route path="/cotizar" element={<CotizacionMenu />} />
        <Route path="/cotizar/nueva" element={<Cotizar />} />
        <Route path="/cotizar/plantillas" element={<PlantillasCotizacion />} />
        <Route path="/cotizaciones" element={<CotizacionesList />} />
        <Route path="/cotizaciones/:id" element={<CotizacionDetalle />} />

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