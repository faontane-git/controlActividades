import React, { useState, useEffect } from 'react';
import {
  FiArrowUp,
  FiArrowDown,
  FiStar,
  FiSearch,
  FiRefreshCw,
  FiPieChart,
  FiAlertCircle
} from 'react-icons/fi';
import NavBar from '../NavBar/Navbar';

// Configuración API (usa tu propia API key)
const API_KEY = 'XR91GBE7TW55A1HE.'; // Regístrate en www.alphavantage.co para obtener una
const SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'PYPL'];

const BolsaDeValores = () => {
  const [acciones, setAcciones] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intervalo, setIntervalo] = useState('diario');

  // Simulación de datos para cuando la API falle
  const datosSimulados = [
    { simbolo: 'AAPL', nombre: 'Apple Inc.', precio: 189.37, cambio: 2.15, porcentaje: 1.15 },
    { simbolo: 'MSFT', nombre: 'Microsoft', precio: 325.12, cambio: -1.23, porcentaje: -0.38 },
    { simbolo: 'GOOGL', nombre: 'Alphabet', precio: 142.56, cambio: 0.89, porcentaje: 0.63 },
    { simbolo: 'AMZN', nombre: 'Amazon', precio: 175.89, cambio: 3.42, porcentaje: 1.98 },
    { simbolo: 'META', nombre: 'Meta Platforms', precio: 485.96, cambio: 7.89, porcentaje: 1.65 }
  ];


  // Obtener datos de la API
  const fetchAcciones = async () => {
    try {
      setCargando(true);
      setError(null);

      // Intenta obtener datos de la API
      const response = await fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo'); // Usando key demo
      const data = await response.json();

      if (data.top_gainers) {
        const accionesFormateadas = data.top_gainers.slice(0, 5).map(accion => ({
          simbolo: accion.ticker,
          nombre: accion.ticker, // En una implementación real, buscarías el nombre completo
          precio: parseFloat(accion.price),
          cambio: parseFloat(accion.change_amount),
          porcentaje: parseFloat(accion.change_percentage.replace('%', ''))
        }));
        setAcciones(accionesFormateadas);
      } else {
        // Si falla la API, usa datos simulados
        console.warn('Usando datos simulados por fallo en API');
        setAcciones(datosSimulados);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar datos. Mostrando información simulada.');
      setAcciones(datosSimulados);
    } finally {
      setCargando(false);
    }
  };

  // Nombres de compañías (simplificado)
  const getCompanyName = (symbol) => {
    const names = {
      'AAPL': 'Apple Inc.',
      'MSFT': 'Microsoft Corporation',
      'GOOGL': 'Alphabet Inc.',
      'AMZN': 'Amazon.com Inc.',
      'META': 'Meta Platforms Inc.',
      'TSLA': 'Tesla Inc.',
      'NVDA': 'NVIDIA Corporation',
      'PYPL': 'PayPal Holdings Inc.'
    };
    return names[symbol] || symbol;
  };

  useEffect(() => {
    fetchAcciones();

    // Actualizar cada 5 minutos (la API free tiene límites)
    const interval = setInterval(fetchAcciones, 300000);
    return () => clearInterval(interval);
  }, []);

  // Filtrar acciones
  const filteredAcciones = acciones.filter(accion =>
    accion.simbolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    accion.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar favoritos
  const toggleFavorito = (simbolo) => {
    setFavoritos(prev =>
      prev.includes(simbolo)
        ? prev.filter(s => s !== simbolo)
        : [...prev, simbolo]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header y Controles */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Bolsa de Valores</h1>
              <p className="text-sm text-gray-500">
                Datos en tiempo real - {new Date().toLocaleString()}
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar acciones..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                onClick={fetchAcciones}
                disabled={cargando}
                className={`p-2 rounded-lg ${cargando ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'} border transition`}
                title="Actualizar datos"
              >
                <FiRefreshCw className={`text-gray-700 ${cargando ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
              <FiAlertCircle className="mr-2" />
              {error}
            </div>
          )}

          {/* Tabla de Acciones */}
          {cargando ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-gray-500">Cargando datos de mercado...</div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio (USD)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cambio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Cambio</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAcciones.map((accion) => (
                    <tr key={accion.simbolo} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleFavorito(accion.simbolo)}
                            className="mr-2 text-gray-400 hover:text-yellow-400 transition"
                          >
                            <FiStar className={favoritos.includes(accion.simbolo) ? "fill-yellow-400 text-yellow-400" : ""} />
                          </button>
                          <div>
                            <div className="font-medium text-gray-900">{accion.simbolo}</div>
                            <div className="text-sm text-gray-500">{accion.nombre}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        ${accion.precio.toFixed(2)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${accion.cambio >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <div className="flex items-center">
                          {accion.cambio >= 0 ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
                          {Math.abs(accion.cambio).toFixed(2)}
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${accion.porcentaje >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {accion.porcentaje >= 0 ? '+' : ''}{accion.porcentaje.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => console.log('Ver detalles:', accion.simbolo)}
                          className="text-indigo-600 hover:text-indigo-900 p-1.5 hover:bg-indigo-50 rounded transition-colors"
                          title="Ver detalles"
                        >
                          <FiPieChart size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Nota sobre la API */}
          <div className="mt-4 text-xs text-gray-500">
            <p>Datos proporcionados por Alpha Vantage. Límite de 5 solicitudes por minuto y 500 por día con plan gratuito.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BolsaDeValores;