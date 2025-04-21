import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/Navbar';

const DetalleProyecto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState(null);

  useEffect(() => {
    // Simula una llamada a API
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

    const encontrado = proyectos.find(p => p.id === parseInt(id));
    setProyecto(encontrado);
  }, [id]);

  if (!proyecto) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-24 px-4 md:px-12">
        {/* Botón Volver */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Volver
        </button>

        {/* Título y Descripción */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">{proyecto.nombre}</h1>
          <p className="text-gray-600 mt-2">{proyecto.descripcion}</p>
        </div>

        {/* Actividades */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Actividades</h2>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
              onClick={() => console.log('Agregar Actividad')}
            >
              + Agregar Actividad
            </button>
          </div>
          {proyecto.actividades && proyecto.actividades.length > 0 ? (
            <ul className="space-y-3">
              {proyecto.actividades.map((actividad, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Actividad {index + 1}</p>
                    <p className="text-gray-700">{actividad.nombre}</p>
                    <p className="text-sm text-gray-500">Fecha: {actividad.fecha}</p>
                    <p className="text-sm text-gray-500">Horas: {actividad.horas} h</p>
                  </div>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
                    onClick={() => console.log(`Ir a actividad ${index + 1}`)}
                  >
                    Ver Actividad
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay actividades registradas.</p>
          )}
        </div>

        {/* Novedades */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Novedades</h2>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm"
              onClick={() => console.log('Agregar Novedad')}
            >
              + Agregar Novedad
            </button>
          </div>
          {proyecto.novedades && proyecto.novedades.length > 0 ? (
            <ul className="space-y-3">
              {proyecto.novedades.map((novedad, index) => (
                <li key={index} className="bg-white border p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">{novedad.tipo}</p>
                  <p className="text-gray-600">{novedad.descripcion}</p>
                  <p className="text-xs text-gray-400">{novedad.fecha}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay novedades registradas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleProyecto;
