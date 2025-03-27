import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/Navbar';
import {
  FiHome, FiBriefcase, FiUsers, FiDollarSign,
  FiActivity, FiFileText, FiCalendar, FiMail,
  FiArchive, FiSettings, FiHelpCircle, FiClock,
  FiPieChart, FiTrendingUp, FiLayers, FiDatabase
} from 'react-icons/fi';

const MenuPage = () => {
  const navigate = useNavigate();

  const menuCategories = [
    {
      title: "Principal",
      items: [
        { icon: <FiHome size={20} />, name: "Inicio", path: "/", desc: "Página principal del sistema" },
        { icon: <FiBriefcase size={20} />, name: "Proyectos", path: "/proyectos", desc: "Gestión de todos tus proyectos" },
        { icon: <FiUsers size={20} />, name: "Clientes", path: "/clientes", desc: "Administración de clientes" },
      ]
    },
    {
      title: "Finanzas",
      items: [
        { icon: <FiDollarSign size={20} />, name: "Facturación", path: "/facturacion", desc: "Emisión y gestión de facturas" },
        { icon: <FiTrendingUp size={20} />, name: "Presupuestos", path: "/presupuestos", desc: "Creación y seguimiento" },
        { icon: <FiPieChart size={20} />, name: "Reportes Financieros", path: "/reportes-financieros", desc: "Análisis detallados" },
      ]
    },
    {
      title: "Productividad",
      items: [
        { icon: <FiActivity size={20} />, name: "Actividades", path: "/actividades", desc: "Registro de tiempo y tareas" },
        { icon: <FiClock size={20} />, name: "Tiempos", path: "/tiempos", desc: "Control de horas trabajadas" },
        { icon: <FiCalendar size={20} />, name: "Calendario", path: "/calendario", desc: "Planificación semanal/mensual" },
      ]
    },
    {
      title: "Gestión",
      items: [
        { icon: <FiFileText size={20} />, name: "Documentos", path: "/documentos", desc: "Archivos y contratos" },
        { icon: <FiDatabase size={20} />, name: "Inventario", path: "/inventario", desc: "Gestión de recursos" },
        { icon: <FiLayers size={20} />, name: "Plantillas", path: "/plantillas", desc: "Modelos reutilizables" },
      ]
    },
    {
      title: "Configuración",
      items: [
        { icon: <FiSettings size={20} />, name: "Ajustes", path: "/ajustes", desc: "Configuración del sistema" },
        { icon: <FiArchive size={20} />, name: "Archivos", path: "/archivos", desc: "Gestión de documentos" },
        { icon: <FiHelpCircle size={20} />, name: "Ayuda", path: "/ayuda", desc: "Centro de soporte" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Menú Completo</h1>
            <p className="text-gray-600">Explora todas las funcionalidades disponibles</p>
          </div>

          {/* Menú por categorías */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {menuCategories.map((category, catIndex) => (
              <div key={catIndex} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold text-blue-800">{category.title}</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <button
                          onClick={() => navigate(item.path)}
                          className="flex items-start w-full p-4 rounded-lg hover:bg-gray-50 transition-colors text-left border border-gray-100"
                        >
                          <span className="text-blue-600 mt-1 mr-4">{item.icon}</span>
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Sección de acceso rápido */}
          <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Acceso Rápido</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {menuCategories.flatMap(cat => cat.items).slice(0, 6).map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-blue-600 mb-2">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;