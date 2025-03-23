import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-24 text-center rounded-b-[3rem] shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <span className="text-sm font-semibold tracking-wider text-blue-300">FABRIZZIOSOFTSOLUTIONS PRESENTS</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-blue-400">FSoft</span>
            <span className="font-light mx-2">|</span>
            <span className="text-white">Solutions Suite</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Plataforma unificada para la gestión empresarial del siglo XXI
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white font-semibold py-4 px-12 rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105"
          >
            Iniciar Demo Técnica
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">
          <span className="text-blue-600">FSoft</span> Core Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {['Gestión de Operaciones', 'Inteligencia de Negocios', 'Automatización de Procesos', 'Seguridad Integral'].map(
            (feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-slate-100 hover:border-blue-100 group"
              >
                <div className="h-12 w-12 bg-blue-500/10 rounded-xl mb-6 flex items-center justify-center">
                  <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transform group-hover:rotate-12 transition-transform"></div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Solución modular escalable para requerimientos empresariales complejos
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Integration Showcase */}
      <section className="container mx-auto px-6 pb-24">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                <span className="text-blue-600">FSoft</span> Integration Hub
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Conectividad nativa con los principales sistemas empresariales:
              </p>
              <ul className="grid grid-cols-2 gap-4 text-slate-600">
                {['ERP Systems', 'CRM Platforms', 'BI Tools', 'Cloud Services', 'IoT Devices', 'Legacy Systems'].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <img
                src="https://via.placeholder.com/600x400.png?text=System+Integration+Dashboard"
                alt="Integración de sistemas"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-slate-200 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">FSoftSolutions Suite</h4>
              <p className="text-sm text-blue-200">Versión 4.2 Enterprise</p>
              <p className="text-sm text-blue-200 mt-2">Certificación ISO 27001</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Soluciones</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300 transition-colors">Gestión Operativa</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Analítica Avanzada</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Movilidad Corporativa</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300 transition-colors">Documentación API</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">White Papers</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Centro de Soporte</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Contacto Corporativo</h4>
              <p className="text-sm mb-2">contacto@fabrizziorsoft.solutions</p>
              <p className="text-sm">+52 55 1234 5678</p>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-12 pt-8 text-center">
            <p className="text-sm text-blue-300">
              © 2024 FabrizzioSoftSolutions · Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;