import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/Navbar';
import { FiSettings, FiBriefcase, FiDollarSign, FiActivity, FiUser, FiBell } from 'react-icons/fi';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="pt-20"> {/* Margen superior igual a la altura del NavBar */}
        <div className="container mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="grid gap-8 mb-12 md:grid-cols-2">
            {/* Welcome Message */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de vuelta, Fabrizzio</h1>
              <p className="text-gray-500">Último acceso: Hoy a las 14:30</p>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
                <FiBriefcase className="text-blue-500" size={24} />
                <div>
                  <h3 className="text-sm text-gray-500">Proyectos Activos</h3>
                  <p className="text-xl font-bold text-gray-900">4</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
                <FiDollarSign className="text-green-500" size={24} />
                <div>
                  <h3 className="text-sm text-gray-500">Facturación Pendiente</h3>
                  <p className="text-xl font-bold text-gray-900">$12,450</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Action Cards */}
              <div 
                onClick={() => navigate('/trabajo')}
                className="bg-white p-6 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow"
              >
                <FiBriefcase className="text-blue-500 mx-auto" size={32} />
                <h3 className="text-lg font-semibold text-gray-900 mt-4">Trabajo</h3>
                <p className="text-sm text-gray-500 mt-2">Gestión de proyectos y tareas</p>
              </div>

              <div 
                onClick={() => navigate('/facturacion')}
                className="bg-white p-6 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow"
              >
                <FiDollarSign className="text-green-500 mx-auto" size={32} />
                <h3 className="text-lg font-semibold text-gray-900 mt-4">Facturación</h3>
                <p className="text-sm text-gray-500 mt-2">Gestor financiero integrado</p>
              </div>

              <div 
                onClick={() => navigate('/actividades')}
                className="bg-white p-6 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow"
              >
                <FiActivity className="text-purple-500 mx-auto" size={32} />
                <h3 className="text-lg font-semibold text-gray-900 mt-4">Actividades</h3>
                <p className="text-sm text-gray-500 mt-2">Registro y seguimiento</p>
              </div>

              <div 
                onClick={() => navigate('/configuracion')}
                className="bg-white p-6 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow"
              >
                <FiSettings className="text-yellow-500 mx-auto" size={32} />
                <h3 className="text-lg font-semibold text-gray-900 mt-4">Configuración</h3>
                <p className="text-sm text-gray-500 mt-2">Personaliza tu experiencia</p>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Actividad Reciente</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="space-y-4">
                {/* Activity Items */}
                <div className="flex items-center gap-4">
                  <FiUser className="text-gray-500" size={20} />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Nuevo cliente agregado</h4>
                    <p className="text-sm text-gray-500">Hace 2 horas - Cliente: TechSolutions Corp</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FiBell className="text-gray-500" size={20} />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Recordatorio de pago</h4>
                    <p className="text-sm text-gray-500">Factura #2456 vence en 3 días</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MainPage;