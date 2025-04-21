import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/Navbar';

// Servicio mock (en un proyecto real estaría en un archivo aparte)
const fetchProyectoById = async (id) => {
  const proyectos = [
    {
      id: 1,
      nombre: 'Sitio Web Corporativo',
      descripcion: 'Desarrollo del sitio web principal',
      actividades: [
        {
          nombre: 'Diseño de interfaz',
          fecha: '2023-01-20',
          horas: 12
        },
        {
          nombre: 'Desarrollo del backend',
          fecha: '2023-02-05',
          horas: 20
        }
      ],
      novedades: [
        {
          tipo: 'Error',
          descripcion: 'Error en login',
          fecha: '2023-02-10'
        },
        {
          tipo: 'Fix',
          descripcion: 'Se corrigió el bug del login',
          fecha: '2023-02-11'
        }
      ]
    },
    {
      id: 2,
      nombre: 'App Móvil',
      descripcion: 'Desarrollo aplicación móvil iOS/Android',
      actividades: [],
      novedades: []
    }
  ];

  return proyectos.find(p => p.id === parseInt(id));
};

const DetalleProyecto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProyecto = async () => {
      try {
        setLoading(true);
        const proyectoData = await fetchProyectoById(id);
        if (!proyectoData) {
          navigate('/not-found', { replace: true });
          return;
        }
        setProyecto(proyectoData);
      } catch (err) {
        setError('Error al cargar el proyecto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarProyecto();
  }, [id, navigate]);

  const handleAgregarActividad = () => {
    console.log('Agregar Actividad');
  };

  const handleAgregarNovedad = () => {
    console.log('Agregar Novedad');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!proyecto) return <NotFound />;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-24 px-4 md:px-12 max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a proyectos
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{proyecto.nombre}</h1>
          <p className="text-gray-600">{proyecto.descripcion}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sección Actividades */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Actividades</h2>
              <button
                onClick={handleAgregarActividad}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar
              </button>
            </div>

            {proyecto.actividades.length > 0 ? (
              <ul className="space-y-3">
                {proyecto.actividades.map((actividad, index) => (
                  <ActividadItem 
                    key={`actividad-${index}`} 
                    actividad={actividad} 
                    index={index} 
                  />
                ))}
              </ul>
            ) : (
              <EmptyState message="No hay actividades registradas" />
            )}
          </div>

          {/* Sección Novedades */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Novedades</h2>
              <button
                onClick={handleAgregarNovedad}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm flex items-center transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar
              </button>
            </div>

            {proyecto.novedades.length > 0 ? (
              <ul className="space-y-3">
                {proyecto.novedades.map((novedad, index) => (
                  <NovedadItem 
                    key={`novedad-${index}`} 
                    novedad={novedad} 
                  />
                ))}
              </ul>
            ) : (
              <EmptyState message="No hay novedades registradas" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componentes auxiliares
const ActividadItem = ({ actividad, index }) => (
  <li className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-medium text-gray-800">Actividad {index + 1}</p>
        <p className="text-gray-700 mt-1">{actividad.nombre}</p>
        <div className="flex mt-2 space-x-4">
          <span className="text-sm text-gray-500">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {actividad.fecha}
          </span>
          <span className="text-sm text-gray-500">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {actividad.horas} h
          </span>
        </div>
      </div>
      <button className="text-blue-600 hover:text-blue-800 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
    </div>
  </li>
);

const NovedadItem = ({ novedad }) => {
  const tipoColor = novedad.tipo === 'Error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  
  return (
    <li className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-start">
        <span className={`text-xs px-2 py-1 rounded-full ${tipoColor} font-medium mr-3`}>
          {novedad.tipo}
        </span>
        <div>
          <p className="text-gray-600">{novedad.descripcion}</p>
          <p className="text-xs text-gray-400 mt-2">
            <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {novedad.fecha}
          </p>
        </div>
      </div>
    </li>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorAlert = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

const NotFound = () => (
  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8" role="alert">
    <strong className="font-bold">No encontrado: </strong>
    <span className="block sm:inline">El proyecto solicitado no existe.</span>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="text-center py-6 text-gray-500">
    <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p className="mt-2">{message}</p>
  </div>
);

export default DetalleProyecto;