import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/Navbar';
import {
  FiSettings, FiBriefcase, FiDollarSign, FiActivity,
  FiUser, FiBell, FiChevronDown, FiTrendingUp,
  FiPieChart, FiCalendar, FiClock, FiUsers, FiFileText
} from 'react-icons/fi';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useAuth } from '../../AuthContext'; // Ajusta la ruta si es diferente

ChartJS.register(...registerables);

// Simula el rol desde localStorage u otro lugar
const getUserRole = () => {
  return localStorage.getItem('rol') || 'user'; // por defecto no es admin
};

const TaxCountdown = () => {
  const [daysLeft, setDaysLeft] = useState(0);
  const [nextDate, setNextDate] = useState('');

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      const taxDateCurrentMonth = new Date(currentYear, currentMonth, 20);
      const taxDateNextMonth = new Date(currentYear, currentMonth + 1, 20);
      const nextTaxDate = today <= taxDateCurrentMonth ? taxDateCurrentMonth : taxDateNextMonth;
      const diffTime = nextTaxDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const options = { day: 'numeric', month: 'long' };
      const formattedDate = nextTaxDate.toLocaleDateString('es-ES', options);
      setDaysLeft(diffDays);
      setNextDate(formattedDate);
    };
    calculateDaysLeft();
  }, []);

  const getCountdownStyle = () => {
    if (daysLeft <= 3) return 'bg-red-100 text-red-800';
    if (daysLeft <= 7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
      <div className="p-3 bg-red-100 rounded-lg">
        <FiFileText className="text-red-500" size={20} />
      </div>
      <div>
        <h3 className="text-sm text-gray-500">Próxima declaración</h3>
        <p className="text-xl font-bold text-gray-900">
          <span className={`text-xs font-normal mr-2 px-2 py-0.5 rounded-full ${getCountdownStyle()}`}>
            {daysLeft} {daysLeft === 1 ? 'día' : 'días'}
          </span>
          {nextDate}
        </p>
      </div>
    </div>
  );
};

const MainPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
 
  if (!user.admin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">Acceso denegado</h1>
        <p className="text-gray-700">No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

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
          <div className="grid gap-8 mb-12 md:grid-cols-2">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de vuelta, Fabrizzio</h1>
              <p className="text-gray-500">Último acceso: Hoy a las 14:30</p>
              <div className="mt-4 flex gap-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Admin</span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Premium</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TaxCountdown />
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
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Estadísticas y Gráficas</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                        y: { beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </div>

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
                        legend: { position: 'right' }
                      }
                    }}
                  />
                </div>
              </div>

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
        </div>
      </div>
    </div>
  );
};

export default MainPage;
