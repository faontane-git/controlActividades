import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/Navbar';
import { 
  FiSettings, FiBriefcase, FiDollarSign, FiActivity, 
  FiUser, FiBell, FiChevronDown, FiTrendingUp,
  FiPieChart, FiCalendar, FiClock, FiUsers
} from 'react-icons/fi';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJS.register(...registerables);

const MainPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Datos para las gráficas
  const incomeData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ingresos ($)',
        data: [5000, 8000, 4500, 6000, 9000, 12000],
        backgroundColor: 'rgba(74, 222, 128, 0.6)',
        borderColor: 'rgba(74, 222, 128, 1)',
        borderWidth: 2,
      },
    ],
  };

  const projectStatusData = {
    labels: ['Completados', 'En progreso', 'Pendientes'],
    datasets: [
      {
        data: [12, 8, 5],
        backgroundColor: [
          'rgba(74, 222, 128, 0.7)',
          'rgba(96, 165, 250, 0.7)',
          'rgba(248, 113, 113, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const productivityData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    datasets: [
      {
        label: 'Horas productivas',
        data: [6, 7, 5, 8, 6, 4],
        fill: false,
        backgroundColor: 'rgba(139, 92, 246, 0.6)',
        borderColor: 'rgba(139, 92, 246, 1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="relative pt-20">
        {/* Menú de cuenta */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <FiUser className="text-gray-700" size={20} />
            <span className="text-gray-700">Cuenta</span>
            <FiChevronDown className="text-gray-500" size={16} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              <button onClick={() => navigate('/perfil')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Perfil</button>
              <button onClick={() => navigate('/configuracion')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Configuración</button>
              <button onClick={() => navigate('/login')} className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left">Cerrar sesión</button>
            </div>
          )}
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="grid gap-8 mb-12 md:grid-cols-2">
            {/* Welcome Message */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de vuelta, Fabrizzio</h1>
              <p className="text-gray-500">Último acceso: Hoy a las 14:30</p>
              <div className="mt-4 flex gap-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Admin</span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Premium</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FiBriefcase className="text-blue-500" size={20} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Proyectos Activos</h3>
                  <p className="text-xl font-bold text-gray-900">8</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FiDollarSign className="text-green-500" size={20} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Facturación</h3>
                  <p className="text-xl font-bold text-gray-900">$12,450</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FiUsers className="text-purple-500" size={20} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Clientes</h3>
                  <p className="text-xl font-bold text-gray-900">24</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <FiClock className="text-yellow-500" size={20} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Horas esta semana</h3>
                  <p className="text-xl font-bold text-gray-900">36</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gráficas y estadísticas */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Estadísticas y Gráficas</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Gráfica de ingresos */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FiTrendingUp className="text-green-500" /> Ingresos Mensuales
                  </h3>
                  <select className="bg-gray-100 text-gray-700 text-sm rounded-lg px-3 py-1">
                    <option>Últimos 6 meses</option>
                    <option>Este año</option>
                    <option>2023</option>
                  </select>
                </div>
                <div className="h-64">
                  <Bar 
                    data={incomeData} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }} 
                  />
                </div>
              </div>

              {/* Estado de proyectos */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiPieChart className="text-blue-500" /> Estado de Proyectos
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <Pie 
                    data={projectStatusData} 
                    options={{ 
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right'
                        }
                      }
                    }} 
                  />
                </div>
              </div>

              {/* Productividad semanal */}
              <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FiActivity className="text-purple-500" /> Productividad Semanal
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiCalendar size={16} /> Semana 26
                  </div>
                </div>
                <div className="h-80">
                  <Line 
                    data={productivityData} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 10
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Actividad Reciente</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">Ver todo</button>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actividad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { activity: "Nuevo proyecto creado", details: "Sitio Web Corp", time: "10:45 AM", status: "Completado" },
                    { activity: "Pago recibido", details: "Factura #2456 - $2,500", time: "Ayer", status: "Completado" },
                    { activity: "Reunión con cliente", details: "TechSolutions - 30min", time: "Ayer", status: "Pendiente" },
                    { activity: "Recordatorio", details: "Enviar propuesta antes del viernes", time: "Lun 15 Jun", status: "Pendiente" },
                  ].map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.activity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.details}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.status === "Completado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MainPage;